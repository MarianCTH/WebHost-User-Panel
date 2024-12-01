import React, {FC} from 'react'
import {ErrorMessage, Field} from 'formik'

const TicketForm: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-gray-900'>Tichet Nou</h2>

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
        <label className='form-label required'>Subiect</label>

        <Field name='ticketTitle' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='ticketTitle' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Descriere</label>

        <Field
          as='textarea'
          name='ticketDescription'
          className='form-control form-control-lg form-control-solid'
          rows={3}
        ></Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='ticketDescription' />
        </div>
      </div>

      <div className='fv-row mb-0'>
        <label className='fs-6 fw-bold form-label required'>Email de contact</label>

        <Field name='ticketEmail' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='ticketEmail' />
        </div>
      </div>
    </div>
    
  )
}

export {TicketForm}
