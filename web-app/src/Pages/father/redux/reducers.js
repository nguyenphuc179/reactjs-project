import { fromJS } from "immutable";

export const initState = {
  listProduct: [],
  productItem: {},
  listAddToCart: [],
  status: false
}

function fatherReducer(state = initState, action) {
  const immuableState = fromJS(state);
  const newState = immuableState.toJS();

  if (action.type === 'PRODUCT_FETCH_SUCCEEDED') {
    newState.listProduct = action.model;
  }
  if (action.type === 'PRODUCT_BY_ID_FETCH_SUCCEEDED') {
    newState.productItem = action.model;
  }

  if (action.type === 'PRODUCT_FETCH_SUCCEEDED' && action.filterValue && action.model.length) {
    let filterData = action.model.filter(f => (f.product_name.toLowerCase().indexOf(action.filterValue.toLowerCase()) > -1));

    newState.listProduct = filterData;
  }

  if (action.type === 'PRODUCT_RESET_FETCH_REQUESTED') {
    newState.productItem = {};
  }
  if (action.type === 'PRODUCT_DETAILS_CREATE_SUCCEEDED' && action.model == 200) {
    newState.status = true;
  }

  if (action.type === 'addToCart') {
    newState.listAddToCart.push(action.value);
  }

  

  return newState;
}

export default fatherReducer;
