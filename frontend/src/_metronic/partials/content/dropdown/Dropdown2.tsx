
import {FC} from 'react'
import {Link} from 'react-router-dom'

const Dropdown2: FC = () => {
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content fs-6 text-gray-900 fw-bold px-3 py-4'>Acțiuni rapide</div>
      </div>

      <div className='separator mb-3 opacity-75'></div>

      <div className='menu-item px-3'>
        <Link to={`/assistance/open-ticket`} className='menu-link px-3'>
          Ticket nou
        </Link>
      </div>

      <div className='menu-item px-3'>
        <Link to={`/services/new-service`} className='menu-link px-3'>
          Serviciu nou
        </Link>
      </div>

      <div className='menu-item px-3'>
        <Link to={`/invoices/add-funds`} className='menu-link px-3'>
          Adaugă fonduri
        </Link>
      </div>
      {/*
      <div className='separator mt-3 opacity-75'></div>
      <div className='menu-item px-3'>
        <div className='menu-content px-3 py-3'>
          <a className='btn btn-primary  btn-sm px-4' href='#'>
            Generate Reports
          </a>
        </div>
      </div>*/}
    </div>
  )
}

export {Dropdown2}
