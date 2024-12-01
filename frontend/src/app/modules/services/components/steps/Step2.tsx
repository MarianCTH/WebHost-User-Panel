import React, {FC} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'
import {PackModel} from '../../'

interface step2{
  packs: PackModel[]
}

const Step2: FC<step2> = ({packs}) => {

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-gray-900'>Informații Plan</h2>

        <div className='text-gray-500 fw-bold fs-6'>
          Daca aveti nevoie de mai multe informatii, va rugam sa consultati pagina de
          <a href='/dashboard' className='link-primary fw-bolder'>
            {' '}
            Ajutor
          </a>
          .
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='d-flex align-items-center form-label mb-3'>
          Specificați Dimensiunea Planului
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title=''
          ></i>
        </label>

        <div className='row mb-2' data-kt-buttons='true'>
          <div className='col'>
            <Field
              type='radio'
              className='btn-check'
              name='serviceSize'
              value='5'
              id='kt_account_team_size_select_1'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
              htmlFor='kt_account_team_size_select_1'
            >
              <span className='fw-bolder fs-3'>5 GB</span>
            </label>
          </div>

          <div className='col'>
            <Field
              type='radio'
              className='btn-check'
              name='serviceSize'
              value='10'
              id='kt_account_team_size_select_2'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
              htmlFor='kt_account_team_size_select_2'
            >
              <span className='fw-bolder fs-3'>10 GB</span>
            </label>
          </div>

          <div className='col'>
            <Field
              type='radio'
              className='btn-check'
              name='serviceSize'
              value='20'
              id='kt_account_team_size_select_3'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
              htmlFor='kt_account_team_size_select_3'
            >
              <span className='fw-bolder fs-3'>20 GB</span>
            </label>
          </div>

          <div className='col'>
            <Field
              type='radio'
              className='btn-check'
              name='serviceSize'
              value='unlimited'
              id='kt_account_team_size_select_4'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
              htmlFor='kt_account_team_size_select_4'
            >
              <span className='fw-bolder fs-3'>Nelimitat</span>
            </label>
          </div>
        </div>

        <div className='form-text'>
          Selectați dimensiunea planului care se potrivește cel mai bine nevoilor dvs.
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Nume Serviciu</label>

        <Field
          type='text'
          className='form-control form-control-lg form-control-solid'
          name='serviceName'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='serviceName' />
        </div>
      </div>

      <div className='mb-0 fv-row'>
        <label className='d-flex align-items-center form-label mb-5'>
          Selectați Planul Serviciului
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title='Selectați planul pe care doriți să îl creați.'
          ></i>
        </label>

        <div className='mb-0'>
          {packs.map((pack: PackModel, index: number) => {
            var i = pack.pack_id.toString();
            return(
            <label key={index} className='d-flex flex-stack mb-5 cursor-pointer'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label'>
                    <KTIcon iconName='chart' className='fs-1 text-gray-600' />
                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                    {pack.name}
                  </span>
                  <span className='fs-6 fw-bold text-gray-500'>
                    {pack.description}
                  </span>
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <Field className='form-check-input' type='radio' name="servicePlan" value={i} required />
              </span>
            </label>
            )
          })}
          <div className='text-danger mt-2'>
            <ErrorMessage name='servicePlan' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step2}
