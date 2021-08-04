import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'

function WarningCommon(props) {
    let { showData, keyword, test, productName } = props;
    let [data, setData] = useState({ isShow: false });

    useEffect(() => {
        setData({ isShow: showData });
    }, [test]);

    const handleDelete = () => {
        props.onRemove(keyword);
        setData({ isShow: false })
    };

    const handleClose = () => {
        setData({ isShow: false })
    };

    return (
        <Modal show={data.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this <b>{productName}</b>?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WarningCommon;
