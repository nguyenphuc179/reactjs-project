import React, { Component } from "react";
import "../../App.css";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { CloseOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { Button, Row, Col } from 'react-bootstrap';
import WarningCommon from '../../Common/WarningCommon';
import { notification } from 'antd';

class CARTDETAILS extends Component {
    constructor(props) {
        super(props);

        this.renderList = this.renderList.bind(this);
        this.setQualityAndRequireDayForItem = this.setQualityAndRequireDayForItem.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setValuePopup = this.setValuePopup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openNotification = this.openNotification.bind(this);


        this.state = {
            listItems: [],
            isShow: false,
            keyword: '',
            count: 0,
            productName: ''
        }
    }
    componentDidMount() {
        const { listCartItem } = this.props;
        listCartItem.map(res => {
            res.quality = 1;
            res.requireDay = Date.now();
            return res;
        });


        this.setState({ listItems: listCartItem });
    }

    componentWillReceiveProps() {
        const { turnOnNotification } = this.props;
        debugger;
        if (turnOnNotification) {
            this.openNotification('success');
        }

    }

    render() {
        let listItems = this.state.listItems.map((res, index) => { return this.renderList(res) });

        return (<>
            <Row>
                <Col sm={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="withcolumn">Id</th>
                                <th>Products Name</th>
                                <th>Quality</th>
                                <th>Price</th>
                                <th>Total Price</th>
                                <th>Require Day</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <br /> <br />
            <Row>
                <Col sm={12} style={{ textAlign: "right" }}>
                    <Button variant="secondary" onClick={() => this.props.history.push('/father')}>Back</Button>
                    <Button variant="success" onClick={() => this.onSubmit()}>Submit</Button>
                </Col>
            </Row>
            {this.showModalDelete()}
        </>);
    }

    onSubmit() {
        this.props.actionToCallStore('PRODUCT_DETAILS_CREATE_REQUESTED', this.state.listItems,);
    }

    setValuePopup(item) {
        this.setState({ isShow: true, keyword: item.product_id, productName: item.product_name });
        this.setState({ count: this.state.count + 1 });
    }

    deleteItem(key) {
        let filterItems = this.state.listItems.filter(f => f.product_id !== key);
        this.setState({ listItems: filterItems });
    }

    showModalDelete() {
        return (
            <WarningCommon test={this.state.count} showData={this.state.isShow} productName={this.state.productName} keyword={this.state.keyword} onRemove={this.deleteItem} ></WarningCommon>
        )
    }

    openNotification = (type) => {
        const args = {
            message: 'Notification',
            description:
                type === 'success' ? 'Save successful' : 'Save not successful',
            duration: 2,
        };
        notification.open(args);
    };

    setQualityAndRequireDayForItem(key, id, value) {
        let oldData = this.state.listItems;
        for (let index = 0; index < oldData.length; index++) {
            if (oldData[index].product_id === id) {
                if (key === 'quality') {
                    oldData[index].quality = value;
                }
                else {
                    oldData[index].requireDay = value ? value.format('DD/MM/yyyy') : null;
                }
                this.setState({ items: oldData });
                break;
            }
        }
    }

    renderList(item) {
        const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
        return (
            <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td><InputNumber min={1} max={10} defaultValue={item.quality} onChange={(value) => { this.setQualityAndRequireDayForItem('quality', item.product_id, value) }} /></td>
                <td>{item.list_price}</td>
                <td>{item.list_price * 2}</td>
                <td>
                    <Space direction="vertical" size={12}>
                        <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} onChange={(value) => { this.setQualityAndRequireDayForItem('requireDay', item.product_id, value) }} />
                    </Space>
                </td>
                <td>
                    <div> <CloseOutlined onClick={() => { this.setValuePopup(item) }} /> </div>
                </td>
            </tr>
        )
    }
}


// Store to UI
function mapStoreToProps(props) {
    let result = {
        listCartItem: props.fatherList.listAddToCart,
        turnOnNotification: props.fatherList.status
    };
    return result;
}

// UI to Action
function mapDispatchToProps(dispatch) {
    return {
        actionToCallStore: (type1, value1) => dispatch({ type: type1, value: value1 }), // cach viet cho redux saga
    }
}

// Config UI and Action
export const CartDetailsWithHOC = connect(mapStoreToProps, mapDispatchToProps)(CARTDETAILS)