import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../Services/api';
import { addToCartSuccess, addQuantity } from './action';
import { formatPrice } from '../../../Util/format';
import history from '../../../Services/history';

function* addToCart({ id }) {
  const productExist = yield select(state => state.cart.find(p => p.id === id));
  const stock = yield call(api.get, `/stock/${id}`);
  const currentStock = productExist ? productExist.amount : 0;

  if (currentStock + 1 > stock.data.amount) {
    toast.error('Quantidade solicitada ultrapassa o estoque total');
    return;
  }

  if (productExist) {
    yield put(addQuantity(id));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
