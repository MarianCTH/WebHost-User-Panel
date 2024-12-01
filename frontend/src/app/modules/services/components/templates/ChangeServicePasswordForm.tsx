import React, {FC} from 'react'
import {ErrorMessage, Field} from 'formik'

type Props = {
  serviceName: string
}

const ChangeServicePasswordForm: FC<Props> = ({serviceName}) => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-gray-900'>Schimbare parolă pentru serviciul {serviceName}</h2>

        <div className='text-gray-500 fw-bold fs-6'>
          Daca aveti nevoie de mai multe informatii, va rugam sa consultati pagina de
          <a href='/help' className='link-primary fw-bolder'>
            {' '}
            Ajutor
          </a>
          .
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Parolă nouă</label>

        <Field name='newPassword' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='newPassword' />
        </div>
      </div>

      <div className='fv-row mb-0'>
        <label className='fs-6 fw-bold form-label required'>Confirmare parolă nouă</label>

        <Field name='newPasswordConfirm' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='newPasswordConfirm' />
        </div>
      </div>
    </div>
    
  )
}

export {ChangeServicePasswordForm}
