const auth = {
  GENERATE_OTP: "/accounts/generate-otp",
  VERIFY_OTP: "/accounts/verify-otp",
}

const dashboard = {
  GET_DASHBOARD_BLOCKS: "/dashboard/get-homepage-block",
  GET_CATEGORY_DATA: "/dashboard/fetch-categories",
};

const product = {
  SEARCH_PRODUCT: "/product/search-product",
  GET_PRODUCT_BY_SUB_CATEGORY: "/product/sub-category",
  GET_PRODUCT_BY_CATEGORY: "/product/get-product-by-category",
  GET_PRODUCT_BY_SUBCATEGORY: "/product/get-product-by-subcategory",
  GET_PRODUCT_BY_ID: "/product/get-product-by-id",
}

export { auth, dashboard, product };