import React, { FC, useState } from 'react';
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { PaypalPayment } from './payments-methods/paypal'
import { TransferPayment } from './payments-methods/transferPayment'

const AddFunds: FC = () => {
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
                            <h3 className='fw-bolder m-0'>Metodă de plată</h3>
                        </div>
                    </div>

                    <div id='kt_account_signin_method' className='collapse show'>
                        <div className='card-body border-top p-9'>
                            <PaypalPayment />
                            <div className='separator separator-dashed my-6'></div>
                            <TransferPayment />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export { AddFunds }
