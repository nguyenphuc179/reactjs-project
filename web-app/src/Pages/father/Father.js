import React from 'react'
import PRODUCTLIST from './ProductList';
import { Button, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, withRouter, } from "react-router-dom";
import { connect } from 'react-redux';
import { notification } from 'antd';
// class component
class FATHER extends React.Component {

    constructor(props) {
        super(props);
        this.renderProductView = this.renderProductView.bind(this);
        this.renderLoggedInView = this.renderLoggedInView.bind(this);
        this.doLogOut = this.doLogOut.bind(this);
        this.onSearchValue = this.onSearchValue.bind(this);
        this.actionAddToCart = this.actionAddToCart.bind(this);
        this.openNotification = this.openNotification.bind(this);
        this.redirectToCartItemPage = this.redirectToCartItemPage.bind(this);
    }


    doLogOut() {
        localStorage.removeItem('info');
        localStorage.removeItem('your-token');
        this.props.history.push('/login');
    }

    render() {
        const { listProduct, listCartItem } = this.props;
        return (
            <div>
                <div>
                    {this.renderLoggedInView()}
                </div>
                <br></br>
                <br></br>
                <Row>
                    <Col><input type="text" onChange={(e) => this.onSearchValue(e.target.value)} className="form-control" placeholder="Search ..." /></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col> <button type="button" className="btn btn-primary" onClick={() => this.redirectToCartItemPage()}>
                        Cart <span className="badge badge-light">{listCartItem.length}</span>
                    </button></Col>
                </Row>
                <hr></hr>
                {listProduct.length ? this.renderProductView(listProduct) : "No data found !!!"}
            </div>
        )
    }

    redirectToCartItemPage() {
        this.props.history.push('/cartdetails');
    }

    componentDidMount() {
        this.props.actionGetAllProduct("PRODUCT_FETCH_REQUESTED");
    }

    openNotification = (type) => {
        const args = {
            message: 'Notification',
            description:
                type === 'success' ? 'Add to cart successful' : 'This item cannot add to cart',
            duration: 2,
        };
        notification.open(args);
    };

    actionAddToCart(item) {
        let isExist = this.props.listCartItem.find(f => f.product_id == item.product_id);
        if (!isExist) {
            this.props.actionAddToCartProduct('addToCart', item);
            this.openNotification('success');
        } else {
            this.openNotification('failure');
        }
    }



    renderProductView(fatherList) {
        return (
            <div>
                <PRODUCTLIST itemsState={fatherList} onAddToCart={this.actionAddToCart}></PRODUCTLIST>
            </div>
        )
    }

    onSearchValue(e) {
        setTimeout(() => {
            this.props.actionGetAllProduct("PRODUCT_FETCH_REQUESTED", e);
        }, 2000);
    }

    renderLoggedInView() {
        const name = JSON.parse(localStorage.getItem("info")).first_name;
        return (
            <div className="rightProfile">
                <Row>
                    <Col sm={12}>
                        <h4>Welcome: {name}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button variant="danger" onClick={() => this.doLogOut()}>Logout</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}


// Store to UI
function mapStoreToProps(props) {
    let result = {
        listProduct: props.fatherList.listProduct,
        listCartItem: props.fatherList.listAddToCart
    };
    return result;
}

// UI to Action
function mapDispatchToProps(dispatch) {
    return {
        actionAddToCartProduct: (type1, value1) => dispatch({ type: type1, value: value1 }),
        actionGetAllProduct: (type1, value1) => dispatch({ type: type1, value: value1 }), // cach viet cho redux saga
    }
}



// Config UI and Action
export const FatherWithHOC = connect(mapStoreToProps, mapDispatchToProps)(withRouter(FATHER));
