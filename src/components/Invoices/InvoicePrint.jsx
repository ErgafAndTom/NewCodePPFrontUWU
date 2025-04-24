import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Table } from 'react-bootstrap';
import { amountToWords } from '../../utils/numberToWords';
import './InvoicePrint.css';

/**
 * Компонент для друку рахунку-фактури
 */
const InvoicePrint = ({ invoice, onClose }) => {
    const handlePrint = () => {
        window.print();
    };

    if (!invoice) return null;

    // Розрахунок підсумкових сум
    const totalSum = invoice?.items?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0;
    const totalVat = totalSum * 0.2; // ПДВ 20%
    const totalWithVat = totalSum + totalVat;

    // Сума прописом для відображення
    const totalInWords = amountToWords(totalWithVat);

    return (
        <div className="invoice-print-wrapper">
            <div className="print-controls d-flex justify-content-between mb-3 p-2 bg-light d-print-none">
                <Button variant="secondary" onClick={onClose}>
                    <i className="bi bi-arrow-left me-1"></i> Повернутися
                </Button>
                <Button variant="primary" onClick={handlePrint}>
                    <i className="bi bi-printer me-1"></i> Друкувати
                </Button>
            </div>
            
            <Container className="invoice-print-container invoice-document">
                <div className="invoice-header">
                    <div className="invoice-title">РАХУНОК-ФАКТУРА</div>
                    <div className="invoice-number">№ {invoice?.invoiceNumber || '-'} від {invoice?.invoiceDate || '-'}</div>
                </div>
                
                <div className="invoice-parties">
                    <div className="invoice-party">
                        <div className="party-label">Постачальник:</div>
                        <div className="party-name">{invoice?.supplierName || '-'}</div>
                        <div className="party-details">
                            {invoice?.supplierDetails?.edrpou && <div>ЄДРПОУ: {invoice.supplierDetails.edrpou}</div>}
                            {invoice?.supplierDetails?.address && <div>Адреса: {invoice.supplierDetails.address}</div>}
                            {invoice?.supplierDetails?.account && <div>р/р: {invoice.supplierDetails.account}</div>}
                            {invoice?.supplierDetails?.bank && <div>Банк: {invoice.supplierDetails.bank}</div>}
                            {invoice?.supplierDetails?.mfo && <div>МФО: {invoice.supplierDetails.mfo}</div>}
                        </div>
                    </div>
                    
                    <div className="invoice-party">
                        <div className="party-label">Покупець:</div>
                        <div className="party-name">{invoice?.buyerName || '-'}</div>
                        <div className="party-details">
                            {invoice?.buyerDetails?.edrpou && <div>ЄДРПОУ: {invoice.buyerDetails.edrpou}</div>}
                            {invoice?.buyerDetails?.address && <div>Адреса: {invoice.buyerDetails.address}</div>}
                            {invoice?.buyerDetails?.account && <div>р/р: {invoice.buyerDetails.account}</div>}
                            {invoice?.buyerDetails?.bank && <div>Банк: {invoice.buyerDetails.bank}</div>}
                            {invoice?.buyerDetails?.mfo && <div>МФО: {invoice.buyerDetails.mfo}</div>}
                        </div>
                    </div>
                </div>
                
                <div className="invoice-items">
                    <Table bordered className="invoice-items-table">
                        <thead>
                            <tr>
                                <th width="5%">№</th>
                                <th width="45%">Найменування</th>
                                <th width="10%">Од. вим.</th>
                                <th width="10%">Кіл-ть</th>
                                <th width="15%">Ціна без ПДВ</th>
                                <th width="15%">Сума без ПДВ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice?.items?.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td className="text-center">{item.unit}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-end">{item.price.toFixed(2)}</td>
                                    <td className="text-end">{(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            
                            <tr>
                                <td colSpan="5" className="text-end total-label">Разом без ПДВ:</td>
                                <td className="text-end total-sum">{totalSum.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="text-end total-label">ПДВ 20%:</td>
                                <td className="text-end total-sum">{totalVat.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="text-end total-label">Загальна сума з ПДВ:</td>
                                <td className="text-end total-sum-vat">{totalWithVat.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                
                <div className="invoice-total-words">
                    Загальна сума до сплати: {totalInWords}
                </div>
                
                <div className="invoice-signatures">
                    <div className="signature-block">
                        <div className="signature-title">Керівник</div>
                        <div className="signature-line"></div>
                    </div>
                    
                    <div className="signature-block">
                        <div className="signature-title">Головний бухгалтер</div>
                        <div className="signature-line"></div>
                    </div>
                </div>
                
                <div className="mt-5 text-center">
                    <small>Рахунок дійсний до оплати протягом 5 банківських днів</small>
                </div>
            </Container>
        </div>
    );
};

InvoicePrint.propTypes = {
    invoice: PropTypes.shape({
        id: PropTypes.number,
        invoiceNumber: PropTypes.string,
        invoiceDate: PropTypes.string,
        supplierName: PropTypes.string,
        buyerName: PropTypes.string,
        supplierDetails: PropTypes.object,
        buyerDetails: PropTypes.object,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                quantity: PropTypes.number,
                price: PropTypes.number,
                unit: PropTypes.string
            })
        )
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

export default InvoicePrint;
