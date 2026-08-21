import { getDb } from '../config/db.js';

// Danh sach ma giam gia
export const getCoupons = async (req, res) => {
  try {
    const db = getDb();
    const [coupons] = await db.query('SELECT * FROM coupons ORDER BY created_at DESC');
    res.json({
      success: true,
      data: coupons.map((c) => ({
        id: c.id,
        code: c.code,
        discountType: c.discount_type,
        discountValue: Number(c.discount_value),
        minOrderValue: Number(c.min_order_value),
        maxDiscount: c.max_discount ? Number(c.max_discount) : null,
        description: c.description,
        isActive: Boolean(c.is_active)
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tao ma giam gia moi (Admin)
export const createCoupon = async (req, res) => {
  try {
    const db = getDb();
    const { code, discountType, discountValue, minOrderValue, maxDiscount, description } = req.body;

    await db.query(`
      INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_discount, description, is_active)
      VALUES (?, ?, ?, ?, ?, ?, TRUE)
    `, [
      code.toUpperCase(), discountType, Number(discountValue),
      Number(minOrderValue || 0), maxDiscount ? Number(maxDiscount) : null, description || ''
    ]);

    res.status(201).json({ success: true, message: 'Tạo mã giảm giá thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bat/Tat trang thai ma giam gia (Admin)
export const toggleCoupon = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    await db.query('UPDATE coupons SET is_active = NOT is_active WHERE id = ?', [id]);
    res.json({ success: true, message: 'Đổi trạng thái mã thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
