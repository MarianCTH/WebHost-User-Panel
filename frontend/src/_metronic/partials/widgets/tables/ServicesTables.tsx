
import React from 'react'
import { KTIcon } from '../../../helpers'
import { useUserServices} from '../../../../app/modules/services/core/Services'
import { Link } from 'react-router-dom'
import {Dropdown2} from '../../../partials'

type Props = {
  className: string
}

const ServicesTables: React.FC<Props> = ({ className }) => {
  var services = useUserServices();

  const statusClassMap = {
    'Active': 'badge-light-success',
    'In progress': 'badge-light-warning',
    'Suspended': 'badge-light-danger',
  };

  const header = (
    <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>
      <span className='card-label fw-bold fs-3 mb-1'>Servicii Active</span>
      <span className='text-muted mt-1 fw-semibold fs-7'>{services.length} servicii</span>
    </h3>
    <div className='card-toolbar'>
      {/* begin::Menu */}
      <button
        type='button'
        className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        data-kt-menu-flip='top-end'
      >
        <KTIcon iconName='category' className='fs-2' />
      </button>
      {/* begin::Menu 2 */}
      <Dropdown2 />
      {/* end::Menu 2 */}
      {/* end::Menu */}
    </div>
  </div>
  );
  if (services.length == 0) {
    return (
      <div className={`card ${className}`}>
      {/* begin::Header */}
      {header}
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
          <div className='text-center'>
            <h3 className='fw-bold fs-3'>Nu aveți nici un serviciu activ</h3>
            <p className='text-gray-400 fs-5'>Creați un serviciu nou apăsând mai jos</p>
            <Link to='/services/new-service' className='btn btn-primary mt-5'>Creează serviciu</Link>
          </div>
        </div>
      {/* begin::Body */}
    </div>
    )
  }
  return (

    <div className={`card ${className}`}>
      {/* begin::Header */}
      {header}
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>ID Comanda</th>
                <th className='min-w-140px'>Nume</th>
                <th className='min-w-120px'>Pachet</th>
                <th className='min-w-120px'>Data</th>
                <th className='min-w-120px'>Total</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px text-end'>Actiuni</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {services.length > 0 && services.map((service) => {
                const createdDate = new Date(service.created_date);
                const formattedDate = createdDate.toISOString().split('T')[0];

                const endDate = new Date(service.end_date);
                const formattedEndDate = endDate.toISOString().split('T')[0];
                return (
                  <tr key={service.service_id}>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        #{service.service_id}
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Zapp</span>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {service.name}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {service.pack.name}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {formattedDate}
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>{formattedEndDate}</span>
                    </td>
                    <td className='text-gray-900 fw-bold text-hover-primary fs-6'>${service.pack.price}/lună</td>
                    <td>
                      <span className={`badge ${statusClassMap[service.status as keyof typeof statusClassMap]}`}>
                        {service.status}
                      </span>
                    </td>
                    <td className='text-end'>
                      <Link to={`/services/config-service/${service.service_id}`} className='btn btn-bg-light btn-active-color-primary btn-sm me-1'>
                        Configurare
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { ServicesTables }
