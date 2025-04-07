const auth = {
  GENERATE_OTP: "/accounts/generate-otp",
  VERIFY_OTP: "/accounts/verify-otp",
  REFRESH_TOKEN: "/accounts/refresh-token",
}

const dashboard = {
  GET_DASHBOARD_BLOCKS: "/dashboard/get-homepage-block",
  GET_CATEGORY_DATA: "/dashboard/fetch-categories",
};

const product = {
  SEARCH_PRODUCT: "/product/search-product",
  GET_PRODUCT_BY_SUB_CATEGORY: "/product/sub-category",
  GET_PRODUCT_BY_DEAL_ID: "/product/deal",
  GET_PRODUCT_BY_ID: "/product/get-product-by-id",
}

const cart = {
  ADD_TO_CART: "/cart/add-to-cart",
  REMOVE_FROM_CART: "/cart/remove-from-cart",
  FETCH_CART: "/cart/fetch-cart",

  // DELETE_CART: "/cart/delete-cart",

  // UPDATE_CART: "/cart/update-cart",
  // CHECKOUT: "/cart/checkout",
  // APPLY_COUPON: "/cart/apply-coupon",
  // REMOVE_COUPON: "/cart/remove-coupon",
  // GET_CART_TOTAL: "/cart/get-cart-total",
  // GET_CART_TOTAL_AFTER_COUPON: "/cart/get-cart-total-after-coupon",
  // GET_CART_TOTAL_AFTER_SHIPPING: "/cart/get-cart-total-after-shipping",
  // GET_CART_TOTAL_AFTER_TAX: "/cart/get-cart-total-after-tax",
  // GET_CART_TOTAL_AFTER_DISCOUNT: "/cart/get-cart-total-after-discount"
}

export { auth, dashboard, product, cart };