import { getDb } from '../config/db.js';

// Tao don hang moi
export const createOrder = async (req, res) => {
  const db = getDb();
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const {
      customerName, customerPhone, customerEmail, customerCity, customerDistrict,
      customerAddress, customerNote, subtotal, discountAmount, shippingFee,
      totalAmount, couponCode, paymentMethod, items
    } = req.body;

    const orderCode = 'TZ-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const [orderResult] = await connection.query(`
      INSERT INTO orders (
        order_code, customer_name, customer_phone, customer_email, customer_city,
        customer_district, customer_address, customer_note, subtotal, discount_amount,
        shipping_fee, total_amount, coupon_code, payment_method, payment_status, order_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', 'pending')
    `, [
      orderCode, customerName, customerPhone, customerEmail || '', customerCity || '',
      customerDistrict || '', customerAddress, customerNote || '', Number(subtotal),
      Number(discountAmount || 0), Number(shippingFee || 0), Number(totalAmount),
      couponCode || null, paymentMethod || 'cod'
    ]);

    const orderId = orderResult.insertId;

    // Insert order items
    if (items && items.length > 0) {
      for (const item of items) {
        await connection.query(`
          INSERT INTO order_items (
            order_id, product_id, product_name, product_thumbnail,
            color_name, storage_size, price, quantity, total_price
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          orderId, item.productId || item.id, item.name, item.thumbnail,
          item.color?.name || item.color || '', item.storage || '',
          Number(item.price), Number(item.quantity), Number(item.price * item.quantity)
        ]);

        // Giam stock san pham
        await connection.query(`
          UPDATE products SET 
            stock = GREATEST(0, stock - ?),
            sold_count = sold_count + ?
          WHERE id = ?
        `, [Number(item.quantity), Number(item.quantity), item.productId || item.id]);
      }
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      orderId,
      orderCode
    });
  } catch (error) {
    await connection.rollback();
    console.error('Loi createOrder:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

// Lay tat ca don hang (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const db = getDb();
    const { status, search } = req.query;

    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      query += ' AND order_status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (order_code LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY created_at DESC';

    const [orders] = await db.query(query, params);

    // Fetch items for each order
    const orderList = await Promise.all(
      orders.map(async (ord) => {
        const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [ord.id]);
        return {
          id: ord.id,
          orderCode: ord.order_code,
          customer: {
            name: ord.customer_name,
            phone: ord.customer_phone,
            email: ord.customer_email,
            address: ord.customer_address,
            note: ord.customer_note
          },
          subtotal: Number(ord.subtotal),
          discountAmount: Number(ord.discount_amount),
          shippingFee: Number(ord.shipping_fee),
          total: Number(ord.total_amount),
          paymentMethod: ord.payment_method,
          paymentStatus: ord.payment_status,
          orderStatus: ord.order_status,
          createdAt: ord.created_at,
          items: items.map((i) => ({
            id: i.id,
            productId: i.product_id,
            name: i.product_name,
            thumbnail: i.product_thumbnail,
            color: i.color_name,
            storage: i.storage_size,
            price: Number(i.price),
            quantity: Number(i.quantity),
            totalPrice: Number(i.total_price)
          }))
        };
      })
    );

    res.json({ success: true, count: orderList.length, data: orderList });
  } catch (error) {
    console.error('Loi getAllOrders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cap nhat trang thai don hang (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    await db.query(`
      UPDATE orders SET
        order_status = COALESCE(?, order_status),
        payment_status = COALESCE(?, payment_status)
      WHERE id = ?
    `, [orderStatus, paymentStatus, id]);

    res.json({ success: true, message: 'Cập nhật trạng thái đơn hàng thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
