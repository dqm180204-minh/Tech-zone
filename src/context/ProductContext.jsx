import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { PRODUCTS as initialMockProducts } from '../data/mockProducts';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialMockProducts);
  const [loading, setLoading] = useState(false);

  // Ham tai toan bo san pham tu MySQL API
  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getProducts();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setProducts(res.data);
      }
    } catch (err) {
      console.warn('Khong the lay san pham tu MySQL, giu lai du lieu hien tai:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tu dong tai san pham khi load ung dung
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Tim san pham theo ID
  const getProductById = useCallback((id) => {
    return products.find((p) => p.id === id || String(p.id) === String(id)) || null;
  }, [products]);

  // Them san pham moi (Admin)
  const addProduct = async (productData) => {
    const res = await api.createProduct(productData);
    if (res && res.success) {
      await refreshProducts();
    }
    return res;
  };

  // Cap nhat san pham (Admin)
  const editProduct = async (id, productData) => {
    const res = await api.updateProduct(id, productData);
    if (res && res.success) {
      await refreshProducts();
    }
    return res;
  };

  // Xoa san pham (Admin)
  const removeProduct = async (id) => {
    const res = await api.deleteProduct(id);
    if (res && res.success) {
      await refreshProducts();
    }
    return res;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        refreshProducts,
        getProductById,
        addProduct,
        editProduct,
        removeProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
