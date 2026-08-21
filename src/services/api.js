const API_BASE_URL = 'http://localhost:5000/api';

// Helper tao query string sach se (loai bo undefined, null, "", "all", "undefined")
const createCleanQuery = (params = {}) => {
  const clean = {};
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null && val !== '' && val !== 'all' && val !== 'undefined') {
      clean[key] = val;
    }
  }
  const query = new URLSearchParams(clean).toString();
  return query ? `?${query}` : '';
};

// Helper fetch wrapper
const request = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`[API] Khong the ket noi den ${endpoint}, su dung fallback:`, error.message);
    return { success: false, fallback: true, error: error.message };
  }
};

export const api = {
  // Products
  getProducts: async (params = {}) => {
    return request(`/products${createCleanQuery(params)}`);
  },
  getProductById: async (id) => {
    return request(`/products/${id}`);
  },
  createProduct: async (productData) => {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },
  updateProduct: async (id, productData) => {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },
  deleteProduct: async (id) => {
    return request(`/products/${id}`, {
      method: 'DELETE'
    });
  },

  // Orders
  getOrders: async (params = {}) => {
    return request(`/orders${createCleanQuery(params)}`);
  },
  createOrder: async (orderData) => {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },
  updateOrderStatus: async (id, statusData) => {
    return request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  },

  // Analytics
  getAnalytics: async () => {
    return request('/analytics');
  },

  // Coupons
  getCoupons: async () => {
    return request('/coupons');
  },
  createCoupon: async (couponData) => {
    return request('/coupons', {
      method: 'POST',
      body: JSON.stringify(couponData)
    });
  },
  toggleCoupon: async (id) => {
    return request(`/coupons/${id}/toggle`, {
      method: 'PUT'
    });
  },

  // Auth & Users
  login: async (email, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  getUsers: async () => {
    return request('/auth/users');
  }
};
