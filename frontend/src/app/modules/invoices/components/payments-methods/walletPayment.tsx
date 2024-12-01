import React, { FC, useEffect, useState } from 'react'
import { Formik, Form, useFormikContext, Field, setIn } from 'formik'
import { KTIcon } from '../../../../../_metronic/helpers';
import { useAuth } from '../../../../../app/modules/auth';
import { useMakePayment, useWalletBalance } from '../../core/Invoices';
import { useNavigate } from 'react-router-dom';
import { useSetInvoiceStatus } from '../../core/Invoices';

interface Payment {
    amount: number
    invoiceID: number
}

const WalletPayment: FC<Payment> = ({amount, invoiceID}) => {
    const [showPasswordForm, setPasswordForm] = useState<boolean>(false);
    const { currentUser } = useAuth();
    const [loading2, setLoading2] = useState(false)
    const [hideButtons, setHideButtons] = useState(false)
    var getUserBalance = useWalletBalance(currentUser?.userId || 0);
    const [userBalance, setUserBalance] = useState<number>(0)
    const { makePayment } = useMakePayment(currentUser?.userId || 0, Number(amount));
    const { setInvoiceStatus } = useSetInvoiceStatus();
    const navigate = useNavigate();
    useEffect(() => {
        if(getUserBalance)
            setUserBalance(getUserBalance)
    }, [getUserBalance])

    const [paymentStatus, setPaymentStatus] = useState<string>('pending')
    const handleSubmit = () => {
        setLoading2(true)
        setTimeout(() => {
            setLoading2(false)
            if(userBalance < Number(amount)) {
                setPaymentStatus('balance-error')
                return
            }
            makePayment().then((paymentResult) => {
                if (paymentResult === 'success') {
                  setPaymentStatus('success');
                  setInvoiceStatus(invoiceID, 'paid');
                  getUserBalance -= Number(amount);
                  setUserBalance(getUserBalance)
                  setHideButtons(true) 
                  setTimeout(() => {  
                    navigate('/invoices/my-invoices')
                  }, 3000)
                } else {
                  console.log('Payment failed');
                }
              }).catch((error) => {
                console.error('Error occurred during payment:', error);
              });
        }, 2000)
    };
    return(
        <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
                <KTIcon iconName='wallet' className='fs-6x mt-1' />
            </div>
            <div id='kt_balance' className={' ' + (showPasswordForm && 'd-none')}>
                <h3 className='fw-bolder m-0'> Din balanța personală</h3>
            </div>
            <div id='kt_signin_password_edit' className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}>
                <div className='mb-5'>
                    <p className='fs-2'>Balanața curentă: <span className='fw-bolder'>{userBalance} $</span></p>
                    <p className='fs-2'>Suma de plată: <span className='fw-bolder'>{amount} $</span></p>
                </div>

                {hideButtons ? (<></>) : (
                <div className='d-flex'>
                    <button
                            onClick={() => {
                            handleSubmit()
                        }}
                        id='kt_password_submit'
                        type='submit'
                        className='btn btn-primary me-2 px-6'
                    >
                        {!loading2 && 'Plătește acum'}
                        {loading2 && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Se încarcă...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setPasswordForm(false)
                        }}
                        id='kt_password_cancel'
                        type='button'
                        className='btn btn-color-gray-500 btn-active-light-primary px-6'
                    >
                        Anulează
                    </button>
                </div>
                )}
                {paymentStatus == "balance-error" && (
                    <div className='mt-10 alert alert-danger'>
                        <div className='alert-text font-weight-bold'>
                            Balanța curentă este insuficientă !
                        </div>
                    </div>
                )}
                {paymentStatus == "success" && (
                    <div className='mt-10 alert alert-success'>
                        <div className='alert-text font-weight-bold'>
                            Factura a fost platită cu success !
                        </div>
                    </div>
                )}
            </div>

            <div id='kt_signin_password_button' className={'ms-auto ' + (showPasswordForm && 'd-none')}>
                <button
                    onClick={() => {
                        setPasswordForm(true)
                    }}
                    className='btn btn-light btn-active-light-primary'
                >
                    Plătește cu balanța
                </button>
            </div>
        </div>
    )
}

export {WalletPayment}
