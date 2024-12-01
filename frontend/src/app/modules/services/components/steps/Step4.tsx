import React, {FC} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'

const Step4: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-gray-900'>Detalii de plată</h2>

        <div className='text-gray-500 fw-bold fs-6'>
          Daca aveti nevoie de mai multe informatii, va rugam sa consultati pagina de
          <a href='/dashboard' className='text-primary fw-bolder'>
            {' '}
            Ajutor
          </a>
          .
        </div>
      </div>

      <div className='d-flex flex-column mb-7 fv-row'>
        <div>
          <label className='d-flex flex-stack mb-5 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                  <KTIcon iconName='wallet' className='fs-1 text-gray-600' />
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                  Balanța personală
                </span>
                <span className='fs-6 fw-bold text-gray-500'>
                  Utilizează balanța personală pentru plată
                </span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-check-input' type='radio' name="servicePaymentMethod" value="wallet" required />
            </span>
          </label>
          <div className='text-danger mt-2'>
            <ErrorMessage name='servicePaymentMethod' />
          </div>
        </div>
        
        <div className='separator separator-dashed my-6'></div>
      </div>

      <div className='d-flex flex-stack'>
        <div className='me-5'>
          <label className='fs-6 fw-bold form-label'>Dorești să salvezi metoda de plată?</label>
          <div className='fs-7 fw-bold text-gray-500'>
            Dacă alegeți să salvați metoda de plată, vom folosi aceasta pentru plata lunară a serviciului.
          </div>
        </div>

        <label className='form-check form-switch form-check-custom form-check-solid'>
          <Field className='form-check-input' type='checkbox' value='0' checked={false} />
          <span className='form-check-label fw-bold text-gray-500'>Salvează</span>
        </label>
      </div>
    </div>
  )
}

export {Step4}
