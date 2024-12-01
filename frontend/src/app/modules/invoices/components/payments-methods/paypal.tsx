import React, { FC, useState } from 'react'
import { Formik, Form, useFormikContext, Field } from 'formik'
import { KTIcon } from '../../../../../_metronic/helpers';
import { usePaypalPaymentURL } from '../../core/Invoices'
import { useAuth } from '../../../../../app/modules/auth';

interface Payment {
    amount: string
  }

const PaypalPayment: FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [redirectUrl, setRedirectUrl] = useState<string>('');
    const [showPasswordForm, setPasswordForm] = useState<boolean>(false);
    const { currentUser } = useAuth();
    const [loading2, setLoading2] = useState(false)

    const handleSubmit = (values: Payment) => {
        setLoading2(true)
        setTimeout(() => {
            setLoading2(false)
        }, 2000)
    };
    return(
        <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
                <KTIcon iconName='paypal' className='fs-6x mt-1' />
            </div>
            <div id='kt_balance' className={' ' + (showPasswordForm && 'd-none')}>
                <h3 className='fw-bolder m-0'>Paypal</h3>
            </div>
            <div id='kt_signin_password_edit' className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}>
                <Formik
                    initialValues={{ amount: "1" }}
                    onSubmit={handleSubmit}
                >
                        <Form id='kt_signin_change_password' className='form' noValidate placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className='row mb-2' data-kt-buttons='true'>
                                <div className='col'>
                                    <Field
                                        type='radio'
                                        className='btn-check'
                                        name='amount'
                                        value='1'
                                        id='amount_1'
                                    />
                                    <label
                                        className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                        htmlFor='amount_1'
                                    >
                                        <span className='fw-bolder fs-3'>1 $</span>
                                    </label>
                                </div>
                                <div className='col'>
                                    <Field
                                        type='radio'
                                        className='btn-check'
                                        name='amount'
                                        value='5'
                                        id='amount_2'
                                    />
                                    <label
                                        className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                        htmlFor='amount_2'
                                    >
                                        <span className='fw-bolder fs-3'>5 $</span>
                                    </label>
                                </div>
                                <div className='col'>
                                    <Field
                                        type='radio'
                                        className='btn-check'
                                        name='amount'
                                        value='10'
                                        id='amount_3'
                                    />
                                    <label
                                        className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                        htmlFor='amount_3'
                                    >
                                        <span className='fw-bolder fs-3'>10 $</span>
                                    </label>
                                </div>
                                <div className='col'>
                                    <Field
                                        type='radio'
                                        className='btn-check'
                                        name='amount'
                                        value='15'
                                        id='amount_4'
                                    />
                                    <label
                                        className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                        htmlFor='amount_4'
                                    >
                                        <span className='fw-bolder fs-3'>15 $</span>
                                    </label>
                                </div>
                            </div>

                            <div className='form-text mb-5'>
                                Alegeți suma dorită pentru a adăuga fonduri în contul dvs.
                            </div>

                            <div className='d-flex'>
                                <button
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
                        </Form>
                </Formik>
            </div>

            <div id='kt_signin_password_button' className={'ms-auto ' + (showPasswordForm && 'd-none')}>
                <button
                    onClick={() => {
                        setPasswordForm(true)
                    }}
                    className='btn btn-light btn-active-light-primary'
                >
                    Adaugă fonduri cu Paypal
                </button>
            </div>
        </div>
    )
}

export {PaypalPayment}
