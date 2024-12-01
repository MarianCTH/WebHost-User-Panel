
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import { AnnouncementModel } from '../../../../app/modules/tickets/core/_models'

type Props = {
  className: string
  announcement: AnnouncementModel | undefined
}

const Announcement: React.FC<Props> = ({className, announcement}) => {
  const formattedDate = new Date(announcement?.created_at ?? '').toLocaleDateString();
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-45px me-5'>
            <img src={toAbsoluteUrl('media/avatars/' + announcement?.user.pic)} alt='' />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
              {announcement?.user.last_name} {announcement?.user.first_name}
            </a>
            <span className='text-muted fw-semibold text-muted d-block fs-7'>
              {announcement?.user.role}, {formattedDate}
            </span>
          </div>
        </div>
        <h3 className='card-title align-items-start flex-column'>
          
          <span className='card-label fw-bold fs-3 mb-1'>{announcement?.title}</span>
          <span className='text-muted fw-semibold fs-7'>{announcement?.description}</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>

        </div>
        {/* end::Table container */}
      </div>
    </div>
  )
}

export {Announcement}
