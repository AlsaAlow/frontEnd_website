import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // ======================
  // Items (from API)
  // ======================
  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [itemsError, setItemsError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingItems(true);
        setItemsError(null);

        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data = await res.json();
        setItems(data); // data harus array products dari db.json
      } catch (err) {
        console.error('Error fetching products:', err);
        setItemsError(err.message || 'Failed to load products');
      } finally {
        setIsLoadingItems(false);
      }
    };

    fetchProducts();
  }, []);

  // ======================
  // Open/Close Detail
  // ======================
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // ======================
  // Open/Close Checkout Side Menu
  // ======================
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // ======================
  // Product detail (localStorage)
  // ======================
  const [showProductDetail, setShowProductDetail] = useState(() => {
    const detailItem = localStorage.getItem('productDetail');
    return detailItem ? JSON.parse(detailItem) : {};
  });

  useEffect(() => {
    localStorage.setItem('productDetail', JSON.stringify(showProductDetail));
  }, [showProductDetail]);

  // ======================
  // Cart products (localStorage: 'comprarShopi')
  // ======================
  const [cartProducts, setCartProducts] = useState(() => {
    const item = localStorage.getItem('comprarShopi');
    return item ? JSON.parse(item) : [];
  });

  useEffect(() => {
    localStorage.setItem('comprarShopi', JSON.stringify(cartProducts));
  }, [cartProducts]);

  // ======================
  // Orders (localStorage: 'checkout')
  // ======================
  const [order, setOrder] = useState(() => {
    const itemsOrder = localStorage.getItem('checkout');
    return itemsOrder ? JSON.parse(itemsOrder) : [];
  });

  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(order));
  }, [order]);

  // ======================
  // Search & Filter
  // ======================
  const [filteredItems, setFilteredItems] = useState(null);

  // Search by title
  const [searchByTitle, setSearchByTitle] = useState(null);
  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  // Search by category
  const [searchByCategory, setSearchByCategory] = useState(null);
  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item =>
      item.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle);
      }

      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory);
      }

      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item =>
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );
      }

      if (!searchType) {
        return items;
      }
    };

    if (searchByTitle && searchByCategory)
      setFilteredItems(
        filteredBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory)
      );

    if (searchByTitle && !searchByCategory)
      setFilteredItems(
        filteredBy('BY_TITLE', items, searchByTitle, searchByCategory)
      );

    if (!searchByTitle && searchByCategory)
      setFilteredItems(
        filteredBy('BY_CATEGORY', items, searchByTitle, searchByCategory)
      );

    if (!searchByTitle && !searchByCategory)
      setFilteredItems(filteredBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  return (
    <Context.Provider
      value={{
        // Products
        items,
        setItems,
        isLoadingItems,
        itemsError,

        // Product detail
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        showProductDetail,
        setShowProductDetail,

        // Cart
        cartProducts,
        setCartProducts,
        productsCount: cartProducts.length,

        // Checkout side menu
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,

        // Orders
        order,
        setOrder,

        // Filters/Search
        filteredItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory
      }}
    >
      {children}
    </Context.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node
};