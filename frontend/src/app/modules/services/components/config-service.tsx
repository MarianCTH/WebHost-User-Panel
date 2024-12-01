import { FC } from 'react'
import {
    UsedDiskSpace,
    ServiceData,
} from '../../../../_metronic/partials/widgets'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { useUserOneService, useUserCpanelLink } from '../core/Services'
import { Link, useParams } from 'react-router-dom'
import { KTIcon } from '../../../../_metronic/helpers'

const ServiceConfigurator: FC = () => {
    const { id } = useParams<{ id: string }>();
    const service = useUserOneService(parseInt(id ?? '0'))
    function getCpanelLink(app: string) {   
        return useUserCpanelLink(service?.username ?? '', app)
    }
    return (
        <>
            <Toolbar />
            <Content>
                <div className='row g-5 g-xl-8'>
                    <div className='col-xl-3'>
                        <div className={`card card-xl-stretch mb-xl-8`}>
                            {/* begin::Body */}
                            <div className='card-body p-0 d-flex flex-column'>
                                {/* begin::Stats */}
                                <div className='card-p pt-5 bg-body flex-grow-1'>
                                    <h3 className='d-flex flex-column'>
                                        <h1 className='card-label fw-bold fs-3 mb-5'>Acțiuni</h1>
                                        <a href={getCpanelLink('a')} className='text-gray-900 text-hover-primary d-block mb-5 fs-6'> <KTIcon iconName='user' className='fs-4 me-1' />Autentificare Cpanel </a>
                                        <Link to="#" className='text-gray-900 text-hover-primary d-block mb-5 fs-6'><KTIcon iconName='sms' className='fs-4 me-1' />Acces Webmail </Link>
                                        <Link to={`../change-service-password/${service?.service_id}`} className='text-gray-900 text-hover-primary d-block mb-5 fs-6'><KTIcon iconName='password-check' className='fs-4 me-1' />Modificare Parolă</Link>

                                    </h3>
                                </div>
                                {/* end::Stats */}
                            </div>
                            {/* end::Body */}
                        </div>
                    </div>
                    <div className='col-xl-4'>
                        <ServiceData
                            className='card-xl-stretch mb-5 mb-xl-8'
                            serv={service}
                        />
                    </div>
                    <div className='col-xl-5'>
                        <UsedDiskSpace
                            className='card-xl-stretch mb-xl-8'
                            chartColor='primary'
                            chartHeight='175px'
                            username={service?.username ?? ''}
                        />
                    </div>
                </div>
                <div className='row g-5 g-xl-8'>
                    <div className='col-xl-3'>

                    </div>

                    <div className='col-xl-9'>
                        <div className={`card card-xl-stretch mb-xl-8`}>
                            {/* begin::Header */}
                            <div className='card-header border-0 pt-5'>
                                <h3 className='card-title align-items-start flex-column'>
                                    <span className='card-label fw-bold fs-3 mb-1'>Scurtături CPanel</span>
                                    {/*<span className='text-muted mt-1 fw-semibold fs-7'>Over 500 orders</span>*/}
                                </h3>
                            </div>
                            {/* end::Header */}
                            {/* begin::Body */}
                            <div className='card-body py-3'>
                                {/* begin::Table container */}
                                <div className='table-responsive'>
                                    {/* begin::Table */}
                                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                                        {/* begin::Table body */}
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <a href={getCpanelLink('Email_Accounts')} target='_blank' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                                                        <KTIcon iconName='user' className='fs-3' /> Conturi Email
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('Email_Forwarders')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='arrow-right-left' className='fs-3' /> Redirectări
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('Email_AutoResponders')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='arrow-left' className='fs-3' /> Autorespondere
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('FileManager_Home')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='folder' className='fs-3' /> Editor de fișiere
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href={getCpanelLink('Backups_Home')} target='_blank' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                                                        <KTIcon iconName='monitor-mobile' className='fs-3' /> Backup
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('domains')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='abstract-42' className='fs-3' /> Subdomenii
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('Domains_AddonDomains')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='plus-square' className='fs-3' /> Domenii suplimentare
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('Cron_Home')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='time' className='fs-3' /> Activități programate
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href={getCpanelLink('Database_MySQL')} target='_blank' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                                                        <KTIcon iconName='data' className='fs-3' /> Baze de date
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('Database_phpMyAdmin')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='notepad' className='fs-3' /> phpMyAdmin
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={getCpanelLink('Stats_AWStats')} target='_blank' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    <KTIcon iconName='chart-simple-2' className='fs-3' /> Awstats
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
                    </div>
                </div>
            </Content>
        </>
    )
}

export { ServiceConfigurator }
