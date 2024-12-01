
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import { MessageModel } from '../../core/_models'

type Props = {
  className: string
  message: MessageModel
}

const TicketMessage: React.FC<Props> = ({className, message}) => {
  const createdDate = message.created_at ? new Date(message.created_at) : new Date();
  const formattedDate = createdDate.toLocaleString();
  
  return (
    <div className={` ${className}`}>
      {/* begin::Body */}
      <div className='card-body pb-0'>
        {/* begin::Header */}
        <div className='d-flex align-items-center mb-5'>
          {/* begin::User */}
          <div className='d-flex align-items-center flex-grow-1'>
            {/* begin::Avatar */}
            <div className='symbol symbol-45px me-5'>
              <img src={toAbsoluteUrl('media/avatars/' + message.user.pic)} alt='' />
            </div>
            {/* end::Avatar */}

            {/* begin::Info */}
            <div className='d-flex flex-column'>
              <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                {message.user?.last_name} {message.user?.first_name}
              </a>
              <span className='text-gray-500 fw-semibold'>{message.user?.role}, {formattedDate}</span>
            </div>
            {/* end::Info */}
          </div>
          {/* end::User */}

        </div>
        {/* end::Header */}

        {/* begin::Post */}
        <div className='mb-5'>
          {/* begin::Text */}
          <p className='text-gray-800 fw-normal mb-5'>
            {message.message}
          </p>
          {/* end::Text */}

        </div>
        {/* end::Post */}

        {/* begin::Separator */}
        <div className='separator mb-4'></div>
        {/* end::Separator */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {TicketMessage}
