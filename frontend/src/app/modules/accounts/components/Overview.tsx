
import React from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets'
import { Content } from '../../../../_metronic/layout/components/Content'
import {useAuth, UserModel} from '../../auth/index';

export function Overview() {
  const { currentUser } = useAuth();

  return (
    <Content>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Detalii Cont</h3>
          </div>

          <Link to='/account/settings' className='btn btn-primary align-self-center'>
            Modifică Profilul
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Nume Complet</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{currentUser?.last_name} {currentUser?.first_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Companie</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{currentUser?.companyName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Telefon de contact
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{currentUser?.phone}</span>
              {currentUser?.phone && (
                <span className='badge badge-success'>Verified</span>
              )}
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Site Companie</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-gray-900 text-hover-primary'>
                {currentUser?.website}
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Țară
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{currentUser?.country}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Comunicare</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>Email, Telefon</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Permite Schimbări</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Da</span>
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
}
