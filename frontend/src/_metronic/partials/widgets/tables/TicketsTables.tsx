
import React from 'react'
import { KTIcon } from '../../../helpers'
import { useUserTickets } from '../../../../app/modules/tickets/core/Tickets'
import { Link } from 'react-router-dom'
import {Dropdown2} from '../../../partials'

type Props = {
  className: string
}

const TicketsTables: React.FC<Props> = ({ className }) => {
  var tickets = useUserTickets();
  console.log(tickets);

  const statusClassMap = {
    'open': 'badge-light-success',
    'closed': 'badge-light-danger',
  };
  const header = (
    <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>
      <span className='card-label fw-bold fs-3 mb-1'>Tichete de suport</span>
      <span className='text-muted mt-1 fw-semibold fs-7'>{tickets.length} tichete</span>
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

  if (tickets.length == 0) {
    return (
      <div className={`card ${className}`}>
        {/* begin::Header */}
        {header}
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <div className='text-center'>
            <h3 className='fw-bold fs-3'>Nu aveți tichete de suport</h3>
            <p className='text-gray-400 fs-5'>Creați un tichet nou pentru a primi asistență</p>
            <Link to='/assistance/open-ticket' className='btn btn-primary mt-5'>Creează tichet</Link>
          </div>
        </div>
        {/* end::Body */}
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
                <th className='min-w-150px'>ID tichet</th>
                <th className='min-w-140px'>Subiect</th>
                <th className='min-w-140px'>Data creării</th>
                <th className='min-w-120px'>Status</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              
              {tickets.map((ticket) => {
                const createdDate = new Date(ticket.created_date);
                const formattedDate = createdDate.toISOString().split('T')[0];
                return (
                  <tr key={ticket.id}>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        #{ticket.id}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {ticket.title}
                      </a>
                    </td>
                    <td>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                        {formattedDate}
                      </a>
                    </td>
                    <td>
                      <span className={`badge ${statusClassMap[ticket.status as keyof typeof statusClassMap]}`}>
                      {ticket.status === 'closed' ? 'Închis' : 'Deschis'}
                      </span>
                    </td>
                    <td className='text-end'>
                      <Link to={`/assistance/view-ticket/${ticket.id}`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                        <KTIcon iconName='eye' className='fs-3' />
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

export { TicketsTables }
