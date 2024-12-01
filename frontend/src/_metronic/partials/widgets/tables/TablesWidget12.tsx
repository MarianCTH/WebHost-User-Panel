
import { FC } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {Dropdown2} from '../../../partials'

type Props = {
  className: string
}

const TablesWidget12: FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Member Statistics</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 new members</span>
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
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-300px rounded-start'>Agent</th>
                <th className='min-w-125px'>Earnings</th>
                <th className='min-w-125px'>Comission</th>
                <th className='min-w-200px'>Company</th>
                <th className='min-w-150px'>Rating</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src={toAbsoluteUrl('media/svg/avatars/001-boy.svg')}
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        Brad Simmons
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $8,000,000
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Pending</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $5,400
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Intertico
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className='rating'>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                  </div>
                  <span className='text-muted fw-semibold text-muted d-block fs-7 mt-1'>
                    Best Rated
                  </span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    View
                  </a>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src={toAbsoluteUrl('media/svg/avatars/047-girl-25.svg')}
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        Lebron Wayde
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $8,750,000
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $7,400
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Agoda
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Houses &amp; Hotels
                  </span>
                </td>
                <td>
                  <div className='rating'>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                  </div>
                  <span className='text-muted fw-semibold text-muted d-block fs-7 mt-1'>
                    Above Avarage
                  </span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    View
                  </a>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src={toAbsoluteUrl('media/svg/avatars/006-girl-3.svg')}
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        Brad Simmons
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $8,000,000
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    In Proccess
                  </span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $2,500
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    RoadGee
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <div className='rating'>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                  </div>
                  <span className='text-muted fw-semibold text-muted d-block fs-7 mt-1'>
                    Best Rated
                  </span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    View
                  </a>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src={toAbsoluteUrl('media/svg/avatars/014-girl-7.svg')}
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        Natali Trump
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $700,000
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Pending</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $7,760
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    The Hill
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Insurance</span>
                </td>
                <td>
                  <div className='rating'>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                  </div>
                  <span className='text-muted fw-semibold text-muted d-block fs-7 mt-1'>
                    Avarage
                  </span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    View
                  </a>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src={toAbsoluteUrl('media/svg/avatars/020-girl-11.svg')}
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        Jessie Clarcson
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $1,320,000
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Pending</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $6,250
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Intertico
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Web, UI/UX Design
                  </span>
                </td>
                <td>
                  <div className='rating'>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                  </div>
                  <span className='text-muted fw-semibold text-muted d-block fs-7 mt-1'>
                    Best Rated
                  </span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    View
                  </a>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                  >
                    Edit
                  </a>
                </td>
              </tr>
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

export {TablesWidget12}
