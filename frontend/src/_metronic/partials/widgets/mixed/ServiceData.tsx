
import {useEffect, useRef, FC} from 'react'
import {KTIcon} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import { ServiceModel, getCpanelData } from '../../../../app/modules/services'

type Props = {
  className: string
  serv: ServiceModel | undefined
}

const ServiceData: FC<Props> = ({className, serv}) => {
  const databases = getCpanelData("list_mysql_databases_and_users", {"user": serv?.username || '', "api.version": 1}, serv?.service_id || 0) as { data?: { mysql_databases?: Record<string, unknown> | undefined } | undefined };
  const dbNumber = databases?.data?.mysql_databases ? Object.keys(databases.data.mysql_databases).length : 0;

  const emailUsersObject = getCpanelData("uapi_cpanel", {"api.version": 1,"cpanel.function": "count_pops", "cpanel.module": "Email", "cpanel.user": serv?.username}, serv?.service_id || 0) as { data?: { uapi?: {data: String | undefined } | undefined } | undefined };
  const emailUserNumber = emailUsersObject?.data?.uapi?.data || 0;

  const ftpAccounts = getCpanelData("uapi_cpanel", {"api.version": 1,"cpanel.function": "list_ftp", "cpanel.module": "Ftp", "cpanel.user": serv?.username}, serv?.service_id || 0) as { data?: { uapi?: {data: String | undefined } | undefined } | undefined };
  const ftpAccNumber = ftpAccounts?.data?.uapi?.data ? Object.keys(ftpAccounts.data.uapi.data).length : 0;

  const databaseUsers = getCpanelData("uapi_cpanel", {"api.version": 1,"cpanel.function": "list_users", "cpanel.module": "Mysql", "cpanel.user": serv?.username}, serv?.service_id || 0) as { data?: { uapi?: {data: Record<string, unknown> | undefined } | undefined } | undefined };
  const databaseUsersNumber = databaseUsers?.data?.uapi?.data ? Object.keys(databaseUsers.data.uapi.data).length : 0;
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
          <div className="px-9 pt-7 card-rounded h-225px w-100 bg-primary">
            <div className="d-flex flex-stack">
              <h3 className="m-0 text-white fw-bold fs-3">{serv?.name}</h3>
            </div>
            <p className="text-white">{serv?.pack.name}</p>
            <p className="text-white">{serv?.pack.description}</p>
          </div>
        {/* begin::Stats */}
        <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'>
              <a className='fs-2x text-warning d-block my-2' >{emailUserNumber}</a>
              <a href='#' className='text-warning fw-semibold fs-6'>
                Conturi Email
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7'>
              <a className='fs-2x text-primary d-block my-2' >{databaseUsersNumber}</a>
              <a href='#' className='text-primary fw-semibold fs-6'>
                Utilizatori DB
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-danger px-6 py-8 rounded-2 me-7'>
              <a className='fs-2x text-danger d-block my-2' >{dbNumber}</a>
              <a href='#' className='text-danger fw-semibold fs-6 mt-2'>
              Baze de date
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-8 rounded-2'>
                <a className='fs-2x text-success d-block my-2' >{ftpAccNumber}</a>
                <a href='#' className='text-success fw-semibold fs-6 mt-2'>
                Conturi FTP
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}
      </div>
      {/* end::Body */}
    </div>
  )
}


export {ServiceData}
