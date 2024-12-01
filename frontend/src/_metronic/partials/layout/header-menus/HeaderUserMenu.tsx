
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import { useUserServices } from '../../../../app/modules/services'
import { useUserInvoices } from '../../../../app/modules/invoices'
import { useUserTickets } from '../../../../app/modules/tickets/core/Tickets'
import { useWalletBalance } from '../../../../app/modules/invoices/core/Invoices'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  const services = useUserServices()
  var invoices = useUserInvoices();
  var tickets = useUserTickets();
  const userBalance = useWalletBalance(currentUser?.userId || 0);

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-semibold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('media/avatars/' + currentUser?.pic)} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bold d-flex align-items-center fs-5'>
              {currentUser?.last_name} {currentUser?.first_name}
              <span className='badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2'>#{currentUser?.userId}</span>
            </div>
            <a href='#' className='fw-semibold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
      <div className='menu-item px-5'>
      <Link to={'invoices/add-funds'} className='menu-link px-5'>
          <span className='menu-text'>Balanță:</span>
          <span className='menu-badge'>
            <span className='badge fw-bold fs-7'>{userBalance} $</span>
          </span>
          </Link>
      </div>
      <div className='menu-item px-5'>
      <Link to={'services/my-services'} className='menu-link px-5'>
          <span className='menu-text'>Serviciile mele</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bold fs-7'>{services.length}</span>
          </span>
          </Link>
      </div>

      <div className='menu-item px-5'>
      <Link to={'invoices/my-invoices'} className='menu-link px-5'>
          <span className='menu-text'>Facturile mele</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bold fs-7'>{invoices.length}</span>
          </span>
          </Link>
      </div>
      <div className='menu-item px-5'>
      <Link to={'assistance/my-tickets'} className='menu-link px-5'>
          <span className='menu-text'>Tichetele mele</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bold fs-7'>{tickets.length}</span>
          </span>
          </Link>
      </div>
      {/*<div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'
      >
        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>Abonamentele Mele</span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Cod promoțional
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Adresă de facturare
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Plăți
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  defaultChecked={true}
                  name='notifications'
                />
                <span className='form-check-label text-muted fs-7'>Notificări</span>
              </label>
            </div>
          </div>
        </div>
      </div>*/}

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/account/settings' className='menu-link px-5'>
          Setări cont
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Deconectare
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
