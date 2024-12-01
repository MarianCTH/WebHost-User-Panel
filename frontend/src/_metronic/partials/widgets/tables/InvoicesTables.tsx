
import React from 'react'
import { KTIcon } from '../../../helpers'
import { useUserInvoices } from '../../../../app/modules/invoices/core/Invoices'
import {Dropdown2} from '../../../partials'
import { Link } from 'react-router-dom'
type Props = {
  className: string
}

const InvoicesTables: React.FC<Props> = ({ className }) => {
  var invoices = useUserInvoices();
  const statusClassMap = {
    'paid': 'badge-light-success',
    'unpaid': 'badge-light-danger',
  };
  const header = (
    <div className='card-header border-0 pt-5'>
      <h3 className='card-title align-items-start flex-column'>
        <span className='card-label fw-bold fs-3 mb-1'>Facturile Mele</span>
        <span className='text-muted mt-1 fw-semibold fs-7'>{invoices.length} facturi</span>
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
        <Dropdown2 />
        {/* end::Menu */}
      </div>
    </div>
  );
  
  if (invoices.length == 0) {
    return (
      <div className={`card ${className}`}>
        {header}
      {/* begin::Body */}
      <div className='card-body py-3'>
          <div className='text-center'>
            <h3 className='fw-bold fs-3'>Nu aveți nici o factură activă</h3>
            <p className='text-gray-400 fs-5'>Creați un serviciu nou pentru a primi factura</p>
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
                <th className='min-w-150px'>ID factură</th>
                <th className='min-w-140px'>Serviciu</th>
                <th className='min-w-140px'>Data emiterii</th>
                <th className='min-w-120px'>Data scadentă</th>
                <th className='min-w-120px'>Total</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px text-end'>Actiuni</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              
              {invoices.map((invoice) => {
                const createdDate = new Date(invoice.date_of_issue);
                const formattedDate = createdDate.toISOString().split('T')[0];

                const endDate = new Date(invoice.due_date);
                const formattedEndDate = endDate.toISOString().split('T')[0];
                return (
                  <tr key={invoice.id}>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        #{invoice.id}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {invoice.service.name}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {formattedDate}
                      </a>
                    </td>
                    <td className='text-gray-900 fw-bold text-hover-primary fs-6'>{formattedEndDate}</td>
                    <td className='text-gray-900 fw-bold text-hover-primary fs-6'>
                      {invoice.pack.price}$
                    </td>

                    <td>
                      <span className={`badge ${statusClassMap[invoice.status as keyof typeof statusClassMap]}`}>
                      {invoice.status === 'unpaid' ? 'Neplătit' : 'Plătit'}
                      </span>
                    </td>
                    {invoice.status === 'unpaid' && (
                    <td className='text-end'>
                      <Link
                        to={`/invoices/pay-invoice/${invoice.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='wallet' className='fs-3' />
                      </Link>
                    </td>
                    )}
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

export { InvoicesTables }
