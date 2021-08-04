import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import "../../App.css";
import { ContactsOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ModalCommon from '../../Common/ModalCommon';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';



class PRODUCTLIST extends Component {
    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.state = {
            isShow: false,
            keyword: '',
            count: 0
        }
    }

    showModalDelete(productItem) {

        return (
            <ModalCommon keyword={this.state.keyword} showData={this.state.isShow} itemData={productItem}></ModalCommon>
        )
    }

    setValuePopup(id) {
        this.setState({ isShow: true, keyword: uuidv4() });
        this.props.actionGetByIDProduct("PRODUCT_GET_BY_ID_FETCH_REQUESTED", id);
    }

    addToCart(item) {
        this.props.onAddToCart(item);
    }


    renderList(item) {
        return (
            <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.model_year}</td>
                <td>{item.list_price}</td>
                <td>
                    <div><ContactsOutlined onClick={() => { this.setValuePopup(item.product_id) }} />
                        <PlusCircleOutlined onClick={() => { this.addToCart(item) }} /></div>
                </td>
            </tr>
        )
    }

    render() {
        const { productItem } = this.props;
        let data = this.props.itemsState;
        let listItems = data.map((res, index) => { return this.renderList(res) });

        return (<>
            <div className="row">
                <div className="col-md-8">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="withcolumn">Id</th>
                                <th>Products Name</th>
                                <th>Year</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems}
                        </tbody>
                    </Table>
                </div>
            </div>

            {this.showModalDelete(productItem)}
        </>);
    }
}


// Store to UI
function mapStoreToProps(props) {
    let result = { productItem: props.fatherList.productItem };
    return result;
}

// UI to Action
function mapDispatchToProps(dispatch) {
    return {
        actionGetByIDProduct: (type1, value1) => dispatch({ type: type1, value: value1 }), // cach viet cho redux saga
    }
}

// Config UI and Action
export default connect(mapStoreToProps, mapDispatchToProps)(PRODUCTLIST)