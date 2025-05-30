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
}

const shipping = {
  GET_LOCATION_ADDRESS: "/shipping/location-info",
  GET_LOCATION_SUGGESTIONS: "/shipping/location_autosuggest",
  GET_LOCATION_COORDINATED: "/shipping/location_coordinates",
  GET_DELIVERY_CHARGES: "/shipping/delivery-charge", // not using this api,using updateDefaultAdress api
  UPDATE_DEFAULT_ADDRESS: "/shipping/update-default-address",
}

const checkout = {
  CHECKOUT_ORDER: "/checkout/checkout-order",
  CHECKOUT_SESSION: "/checkout/create-session/", // post method
  CREATE_PAYMENT_INTENT: "/checkout/create-payment-intent/",// post method
  PAYMENT_WEB_HOOK: "/checkout/payment-webhook/", // post method
  // GET_CHECKOUT_ADDRESS: "/checkout/get-checkout-address",
  // GET_CHECKOUT_PAYMENT: "/checkout/get-checkout-payment",
}

const order = {
  GET_ORDER_LIST: "/order/get-order-list/",
}

const profile = {
  // GET_PROFILE: "/profile/get-profile",
  // UPDATE_PROFILE: "/profile/update-profile",
  GET_ADDRESS_LIST: "/profile/get-address-list",
  ADDRESS: "/accounts/address/",
}
export { auth, dashboard, product, cart, shipping, profile, checkout, order };