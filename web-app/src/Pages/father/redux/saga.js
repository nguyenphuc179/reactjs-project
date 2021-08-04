import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getMethod, postMethod } from '../../../api-base';




const asyncGetProduct = (pram1, pram2) => {
    return getMethod({ url: '/products', authToken: localStorage.getItem("your-token") });
};

const asyncGetProductByID = (pram1, pram2) => {
    return getMethod({ url: `/products/${pram1}`, authToken: localStorage.getItem("your-token") });
};

const asyncCreateOrderList = (pram1, pram2) => {
    return postMethod({ url: `/orders/products`, formBody : pram1, authToken: localStorage.getItem("your-token") });
};

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchProduct(action, param2) {
    try {
        const user = yield call(asyncGetProduct);
        yield put({ type: "PRODUCT_FETCH_SUCCEEDED", model: user.data.products, filterValue: action.value });
    } catch (e) {
        yield put({ type: "PRODUCT_FETCH_FAILED", message: e.message });
    }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchProductByID(action, param2) {
    try {
        const data = yield call(asyncGetProductByID, action.value);
        yield put({ type: "PRODUCT_BY_ID_FETCH_SUCCEEDED", model: data.data.product });
    } catch (e) {
        yield put({ type: "PRODUCT_FETCH_FAILED", message: e.message });
    }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* createProductDetails(action, param2) {
    try {
        const model = yield call(asyncCreateOrderList, action.value);
        yield put({ type: "PRODUCT_DETAILS_CREATE_SUCCEEDED", model: model.status });
    } catch (e) {
        yield put({ type: "PRODUCT_DETAILS_CREATE_FAILED", message: e.message });
    }
}

export function* mySaga() {
    yield takeEvery("PRODUCT_FETCH_REQUESTED", fetchProduct);
    yield takeEvery("PRODUCT_GET_BY_ID_FETCH_REQUESTED", fetchProductByID);
    yield takeEvery("PRODUCT_DETAILS_CREATE_REQUESTED", createProductDetails);
}


