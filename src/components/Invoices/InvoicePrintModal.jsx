import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import InvoicePrint from './InvoicePrint';

/**
 * Модальне вікно для друку рахунків
 */
const InvoicePrintModal = ({ show, onHide, invoice }) => {
    return (
        <Modal 
            show={show}
            onHide={onHide}
            size="xl"
            backdrop="static"
            keyboard={false}
            dialogClassName="invoice-print-modal"
            fullscreen="lg-down"
        >
            <Modal.Header closeButton>
                <Modal.Title>Друк рахунка-фактури</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                {invoice && (
                    <InvoicePrint 
                        invoice={invoice} 
                        onClose={onHide} 
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

InvoicePrintModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    invoice: PropTypes.object
};

export default InvoicePrintModal;
