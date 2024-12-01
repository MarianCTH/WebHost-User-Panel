import React, { FC, useState, useEffect } from 'react';
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { PaypalPayment } from './payments-methods/paypal'
import { useUserInvoices } from '../core/Invoices'
import { useParams } from 'react-router-dom'
import { MultiplePayment } from './payments-methods/multiplePayment'
import { InvoiceModel } from '../../../../app/modules/invoices/core/_models'

const PayAllInvoices: FC = () => {
    const [unpaidInvoices, setUnpaidInvoices] = useState<InvoiceModel[]>([]);
    var total = 0;
    var invoices = useUserInvoices();
    useEffect(() => {
        const filteredUnpaidInvoices = invoices.filter(invoice => invoice.status === 'unpaid');
        setUnpaidInvoices(filteredUnpaidInvoices);
        unpaidInvoices.map((invoice) => {
            total += invoice.pack.price;
        });
    }, [invoices]);
    unpaidInvoices.map((invoice) => {
        total += invoice.pack.price;
    });

    if(unpaidInvoices.length == 0)
        return (
            <div className='card mb-5 mb-xl-10'>
                <div className='card-header border-0 cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Nu există facturi neplătite</h3>
                    </div>
                </div>
            </div>
        )
    return (
        <>
            <Toolbar />
            <Content>
                <div className='card mb-5 mb-xl-10'>
                    <div
                        className='card-header border-0 cursor-pointer'
                        role='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_account_signin_method'
                    >
                        <div className='card-title m-0'>
                            <h3 className='fw-bolder m-0'>Alege metoda de plată pentru achitarea facturilor cu totalul de {total}$</h3>
                        </div>
                    </div>

                    <div id='kt_account_signin_method' className='collapse show'>
                        <div className='card-body border-top p-9'>
                            <MultiplePayment amount={total} invoices={unpaidInvoices}/>
                            <div className='separator separator-dashed my-6'></div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export { PayAllInvoices }
