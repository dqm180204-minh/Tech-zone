import { getDb } from '../config/db.js';

// Lay danh sach san pham co loc va tim kiem
export const getProducts = async (req, res) => {
  try {
    const db = getDb();
    const { search, brand, category, minPrice, maxPrice, sort } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR brand LIKE ? OR category LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (brand && brand !== 'all') {
      query += ' AND LOWER(brand) = LOWER(?)';
      params.push(brand);
    }

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    // Sort
    if (sort === 'price-asc') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-desc') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else if (sort === 'newest') {
      query += ' ORDER BY is_new DESC, created_at DESC';
    } else {
      query += ' ORDER BY sold_count DESC';
    }

    const [rows] = await db.query(query, params);

    // Format JSON fields
    const products = rows.map((p) => ({
      ...p,
      isHot: Boolean(p.is_hot),
      isNew: Boolean(p.is_new),
      isFlashSale: Boolean(p.is_flash_sale),
      originalPrice: Number(p.original_price),
      flashSalePrice: p.flash_sale_price ? Number(p.flash_sale_price) : null,
      price: Number(p.price),
      stock: Number(p.stock),
      reviewCount: p.review_count,
      soldCount: p.sold_count,
      soldPercent: p.sold_percent,
      images: typeof p.images === 'string' ? JSON.parse(p.images || '[]') : p.images || [],
      colors: typeof p.colors === 'string' ? JSON.parse(p.colors || '[]') : p.colors || [],
      storageOptions: typeof p.storage_options === 'string' ? JSON.parse(p.storage_options || '[]') : p.storage_options || [],
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs || '{}') : p.specs || {}
    }));

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('Loi getProducts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Chi tiet 1 san pham
export const getProductById = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Khong tim thay san pham' });
    }

    const p = rows[0];
    const product = {
      ...p,
      isHot: Boolean(p.is_hot),
      isNew: Boolean(p.is_new),
      isFlashSale: Boolean(p.is_flash_sale),
      originalPrice: Number(p.original_price),
      flashSalePrice: p.flash_sale_price ? Number(p.flash_sale_price) : null,
      price: Number(p.price),
      stock: Number(p.stock),
      images: typeof p.images === 'string' ? JSON.parse(p.images || '[]') : p.images || [],
      colors: typeof p.colors === 'string' ? JSON.parse(p.colors || '[]') : p.colors || [],
      storageOptions: typeof p.storage_options === 'string' ? JSON.parse(p.storage_options || '[]') : p.storage_options || [],
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs || '{}') : p.specs || {}
    };

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Them san pham moi (Admin)
export const createProduct = async (req, res) => {
  try {
    const db = getDb();
    const {
      name, brand, category, price, originalPrice, stock,
      thumbnail, badge, isFlashSale, flashSalePrice, description,
      colors, storageOptions, specs
    } = req.body;

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const id = slug || 'prod-' + Date.now();

    await db.query(`
      INSERT INTO products (
        id, name, brand, category, price, original_price, stock,
        thumbnail, badge, is_flash_sale, flash_sale_price, description,
        colors, storage_options, specs, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id, name, brand || 'Khác', category || 'flagship', Number(price), Number(originalPrice || price), Number(stock || 10),
      thumbnail || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
      badge || '', isFlashSale ? 1 : 0, flashSalePrice ? Number(flashSalePrice) : null, description || '',
      JSON.stringify(colors || [{ name: 'Mặc định', hex: '#333333' }]),
      JSON.stringify(storageOptions || [{ size: '256GB', priceOffset: 0 }]),
      JSON.stringify(specs || {}),
      JSON.stringify([thumbnail])
    ]);

    res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', id });
  } catch (error) {
    console.error('Loi createProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cap nhat san pham (Admin)
export const updateProduct = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const {
      name, brand, category, price, originalPrice, stock,
      thumbnail, badge, isFlashSale, flashSalePrice, description
    } = req.body;

    await db.query(`
      UPDATE products SET
        name = COALESCE(?, name),
        brand = COALESCE(?, brand),
        category = COALESCE(?, category),
        price = COALESCE(?, price),
        original_price = COALESCE(?, original_price),
        stock = COALESCE(?, stock),
        thumbnail = COALESCE(?, thumbnail),
        badge = COALESCE(?, badge),
        is_flash_sale = COALESCE(?, is_flash_sale),
        flash_sale_price = COALESCE(?, flash_sale_price),
        description = COALESCE(?, description)
      WHERE id = ?
    `, [
      name, brand, category, price !== undefined ? Number(price) : null,
      originalPrice !== undefined ? Number(originalPrice) : null,
      stock !== undefined ? Number(stock) : null,
      thumbnail, badge, isFlashSale !== undefined ? (isFlashSale ? 1 : 0) : null,
      flashSalePrice !== undefined ? Number(flashSalePrice) : null,
      description, id
    ]);

    res.json({ success: true, message: 'Cập nhật sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xoa san pham (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Đã xóa sản phẩm khỏi Database' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
