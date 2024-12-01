
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../_metronic/layout/components/Content'
import {useAuth, UserModel} from '../auth/index';
const calculateCompletionPercentage = (currentUser: UserModel ) => {

  if (!currentUser) return '0';

  const userModelFields: Array<keyof UserModel> = Object.keys(currentUser) as Array<keyof UserModel>;
  const totalFields = userModelFields.length;
  let filledFields = 0;

  userModelFields.forEach((field) => {
    if (currentUser[field] !== undefined && currentUser[field] !== '') {
      filledFields++;
    }
  });

  const percentage = (filledFields / totalFields) * 100;
  return percentage.toFixed(2);
};

const AccountHeader: React.FC = () => {
  const location = useLocation()
  const { currentUser } = useAuth();
  const completion_percentage = currentUser ? calculateCompletionPercentage(currentUser) : 0;
  return (
    <>
      <Toolbar />
      <Content>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src={toAbsoluteUrl('media/avatars/' + currentUser?.pic)} alt='Metronic' />
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        {currentUser?.last_name} {currentUser?.first_name}
                      </a>
                      <a
                        href='#'
                        className='badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2'
                      >
                        #{currentUser?.userId}
                      </a>
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                        {currentUser?.role}
                      </a>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='geolocation' className='fs-4 me-1' />
                        {currentUser?.country}
                      </a>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'
                      >
                        <KTIcon iconName='sms' className='fs-4 me-1' />
                        {currentUser?.email}
                      </a>
                    </div>
                    <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
          <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
            <span className='fw-bold fs-6 text-gray-500'>Completarea Profilului</span>
            <span className='fw-bolder fs-6'>{completion_percentage}%</span>
          </div>
          <div className='h-5px mx-3 w-100 bg-light mb-3'>
            <div
              className='bg-success rounded h-5px'
              role='progressbar'
              style={{ width: `${completion_percentage}%` }}
            ></div>
          </div>
        </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/account/overview' && 'active')
                    }
                    to='/account/overview'
                  >
                    Vizualizare
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/account/settings' && 'active')
                    }
                    to='/account/settings'
                  >
                    Setări
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export {AccountHeader}
