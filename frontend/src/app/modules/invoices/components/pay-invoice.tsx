import React, { FC, useState } from 'react';
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { PaypalPayment } from './payments-methods/paypal'
import { useUserInvoices } from '../core/Invoices'
import { useParams } from 'react-router-dom'
import { WalletPayment } from './payments-methods/walletPayment'

const PayInvoice: FC = () => {
    const id = useParams<{ id: string }>();
    const currentInvoice = useUserInvoices().find(obj => obj.id == Number(id?.id));
    if (currentInvoice && currentInvoice.status === 'paid') {
        return (
            <div className='card mb-5 mb-xl-10'>
                <div className='card-header border-0 cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Factura este plătită</h3>
                    </div>
                </div>
            </div>
        )
    }
    if(!currentInvoice)
        return (
            <div className='card mb-5 mb-xl-10'>
                <div className='card-header border-0 cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Factura nu există</h3>
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
                            <h3 className='fw-bolder m-0'>Alege metoda de plată pentru factura cu numărul #{currentInvoice?.id} ({currentInvoice?.service.name})</h3>
                        </div>
                    </div>

                    <div id='kt_account_signin_method' className='collapse show'>
                        <div className='card-body border-top p-9'>
                            <WalletPayment amount={currentInvoice.pack.price} invoiceID={currentInvoice.id} />
                            <div className='separator separator-dashed my-6'></div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export { PayInvoice }
