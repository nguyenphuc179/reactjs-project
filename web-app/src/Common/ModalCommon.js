import { useEffect, useState } from 'react';
import { Modal, Button, Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

function ModalCommon(props) {
  let { showData, keyword, itemData } = props;
  let [abc, setAbc] = useState({ isShow: false });

  useEffect(() => {
    console.log(props.showData, 'aaaaa');
    setAbc({ isShow: showData });
  }, [keyword]);

  const handleClose = () => {
    props.actionResetModal("PRODUCT_RESET_FETCH_REQUESTED");
    setAbc({ isShow: false });
  };


  return (
    <Modal centered show={abc.isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Product List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Product ID
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={itemData.product_id} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Product Name
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={itemData.product_name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Brand
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={itemData.brand ? itemData.brand.brand_name : ""} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Model Year
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={itemData.model_year} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={itemData.list_price} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Category
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={itemData.category_id} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// UI to Action
function mapDispatchToProps(dispatch) {
  return {
    actionResetModal: (type1, value1) => dispatch({ type: type1, value: value1 }), // cach viet cho redux saga
  }
}


export default connect(null, mapDispatchToProps)(ModalCommon);