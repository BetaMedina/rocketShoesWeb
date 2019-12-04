import produce from 'immer';

// export default function cart(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return [
//         ...state,
//         {
//           ...action.product,
//           amount: 1,
//         },
//       ];
//     default:
//       return state;
//   }
// }

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        // const productIndex = draft.findIndex(p => p.id === action.product.id);
        // if (productIndex >= 0) {
        //   draft[productIndex].amount += 1;
        // } else {
        // draft.push({ ...action.product, amount: 1 });
        draft.push(product);
        // }
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/ADD_QUANTITY':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        }
      });
    case '@cart/REMOVE_QUANTITY':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (draft[productIndex].amount > 0) {
          draft[productIndex].amount -= 1;
        }
      });
    default:
      return state;
  }
}
