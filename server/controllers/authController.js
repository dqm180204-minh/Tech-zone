import { getDb } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'techzone_secret_jwt_key_2026';

// Dang nhap
export const login = async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Loi login:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Dang ky
export const register = async (req, res) => {
  try {
    const db = getDb();
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email này đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(`
      INSERT INTO users (name, email, password, role, phone, address, avatar)
      VALUES (?, ?, ?, 'customer', ?, ?, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')
    `, [name, email, hashedPassword, phone || '', address || '']);

    const token = jwt.sign(
      { id: result.insertId, email, role: 'customer' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        phone: phone || '',
        address: address || ''
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Danh sach nguoi dung (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const [users] = await db.query(`
      SELECT id, name, email, role, phone, address, avatar, created_at
      FROM users
      ORDER BY created_at DESC;
    `);
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
