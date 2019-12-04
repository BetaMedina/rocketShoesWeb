export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function addQuantity(id) {
  return {
    type: '@cart/ADD_QUANTITY',
    id,
  };
}

export function removeQuantity(id) {
  return {
    type: '@cart/REMOVE_QUANTITY',
    id,
  };
}
