import React, {FC} from 'react'
import {ErrorMessage, Field} from 'formik'

const Step3: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-gray-900'>Adresa de facturare</h2>

        <div className='text-gray-500 fw-bold fs-6'>
          Daca aveti nevoie de mai multe informatii, va rugam sa consultati pagina de
          <a href='/dashboard' className='link-primary fw-bolder'>
            {' '}
            Ajutor
          </a>
          .
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Stradă</label>

        <Field name='billingAddress' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='billingAddress'>
          </ErrorMessage>
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Oraș</span>
        </label>

        <Field
          name='billingCity'
          className='form-control form-control-lg form-control-solid'/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='billingCity' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Cod poștal</span>
        </label>

        <Field
          name='billingPostalCode'
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='billingPostalCode' />
        </div>
      </div>

      <div className='fv-row mb-0'>
        <label className='fs-6 fw-bold form-label required'>Email de contact</label>

        <Field name='billingEmail' className='form-control form-control-lg form-control-solid' disabled/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='billingEmail' />
        </div>
        <div className='form-text'>
          Pentru a schimba adresa de email trebuie să mergeți la setările contului.
        </div>
      </div>
    </div>
  )
}

export {Step3}
