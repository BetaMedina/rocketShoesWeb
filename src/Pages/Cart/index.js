/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { formatPrice } from '../../Util/format';
import { Container, ProductTable, Total } from './styles';
import * as cartAction from '../../Store/modules/cart/action';

export default function Index() {
  const dispatch = useDispatch();

  const cart = useSelector(state =>
    state.cart.map(res => ({
      ...res,
      subtotal: formatPrice(res.price * res.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalItem, res) => {
        return totalItem + res.price * res.amount;
      }, 0)
    )
  );

  const handleRemoveFromCart = id => {
    dispatch(cartAction.removeFromCart(id));
  };
  const handleAddQuantity = id => {
    dispatch(cartAction.addQuantity(id));
  };
  const handleRemoveQuantity = id => {
    dispatch(cartAction.removeQuantity(id));
  };

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(res => (
            <tr key={res.id}>
              <td>
                <img src={res.image} alt={res.title} />
              </td>
              <td>
                <strong>{res.title}</strong>
                <span>{res.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveQuantity(res.id);
                    }}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={res.amount} />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddQuantity(res.id);
                    }}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{res.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveFromCart(res.id);
                  }}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
