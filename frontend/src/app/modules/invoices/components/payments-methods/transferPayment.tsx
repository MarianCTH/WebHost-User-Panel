import React, { FC, useState } from 'react'
import { Formik, Form, useFormikContext, Field } from 'formik'
import { KTIcon } from '../../../../../_metronic/helpers';
import { usePaypalPaymentURL } from '../../core/Invoices'
import { useAuth } from '../../../../../app/modules/auth';

interface Payment {
    amount: string
  }

const TransferPayment: FC = () => {
    const [showPasswordForm, setPasswordForm] = useState<boolean>(false);

    return(
        <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
                <KTIcon iconName='bank' className='fs-6x mt-1' />
            </div>
            <div id='kt_balance' className={' ' + (showPasswordForm && 'd-none')}>
                <h3 className='fw-bolder m-0'>Transfer bancar</h3>
            </div>
            <div id='kt_signin_password_edit' className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}>
                <div className='mb-2'>
                    Pentru plata cu transferul bancar este necesar să trimiteți suma dorită pe contul nostru bancar. <br />
                    Vă rugăm să specificați codul de client, alături de suma de plată și numele dumneavoastră în descrierea plății. <br />
                    Exemplu: <strong>#123456 - 100 RON - Numele dumneavoastră</strong> <br />
                    ##################################################<br />
                    IBAN: <strong>RO28 RNCB 0788 1660 2294 0001</strong> <br />
                    BIC/SWIFT: <strong>RNCBROBUXXX</strong> <br />
                    Banca: <strong>Banca Comercială Română</strong> <br />
                    Beneficiar: <strong>ZappTelecom SRL</strong> <br />
                    ##################################################<br />
                </div>
                <div className='form-text mb-5'>
                    După ce ați efectuat plata, balanța dumneavoastră va fi actualizată în maxim 24 de ore lucrătoare.
                </div>

                <div className='d-flex'>
                    <button
                        onClick={() => {
                            setPasswordForm(false)
                        }}
                        id='kt_password_submit'
                        type='submit'
                        className='btn btn-primary me-2 px-6'
                    >
                        Am înțeles
                    </button>
                </div>
            </div>

            <div id='kt_signin_password_button' className={'ms-auto ' + (showPasswordForm && 'd-none')}>
                <button
                    onClick={() => {
                        setPasswordForm(true)
                    }}
                    className='btn btn-light btn-active-light-primary'
                >
                    Adaugă fonduri cu transfer bancar
                </button>
            </div>
        </div>
    )
}

export {TransferPayment}
