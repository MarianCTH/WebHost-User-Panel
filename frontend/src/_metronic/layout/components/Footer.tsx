
import {FC} from 'react'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        {/* begin::Copyright */}
        <div className='text-gray-900 order-2 order-md-1'>
          <span className='text-muted fw-semibold me-2'>{new Date().getFullYear()} &copy;</span>
          <a href='#' className='text-gray-800 text-hover-primary'>
            Zapptelecom
          </a>
        </div>
        {/* end::Copyright */}

        {/* begin::Nav */}
        <ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
          <li className='menu-item'>
            <a href='services/my-services' className='menu-link ps-0 pe-2'>
              Servicii
            </a>
          </li>
          <li className='menu-item'>
            <a href='terms/terms' className='menu-link pe-0'>
              Termeni
            </a>
          </li>
          <li className='menu-item'>
            <a href='contact/contact' className='menu-link pe-0 pe-2'>
              Contact
            </a>
          </li>
        </ul>
        {/* end::Nav */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
