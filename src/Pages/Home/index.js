import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList } from './styles';
import { formatPrice } from '../../Util/format';
import api from '../../Services/api';
import * as cartAction from '../../Store/modules/cart/action';

export default function Home() {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const itensInCart = useSelector(state =>
    state.cart.reduce((amount, res) => {
      amount[res.id] = res.amount;
      return amount;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      const request = await api.get('http://localhost:3333/products');
      const data = request.data.map(res => ({
        ...res,
        priceFormated: formatPrice(res.price),
      }));

      setProduct(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(cartAction.addToCartRequest(id));
  }

  return (
    <ProductList>
      {product.map(res => (
        <li key={res.id}>
          <img src={res.image} alt="itens" />
          <strong>{res.title}</strong>
          <span className="priceItem">{res.priceFormated}</span>
          <button type="button" onClick={() => handleAddProduct(res.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {itensInCart[res.id] || 0}
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
