import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ProfileWidget,
  ServicesTables,
  TilesWidget4,
  TilesWidget5,
} from '../../../_metronic/partials/widgets'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../_metronic/layout/components/Content'
import { useUserServices } from '../../modules/services'
import { useUserInvoices } from '../../modules/invoices'
import { useUserTickets } from '../../modules/tickets/core/Tickets'

const DashboardPage = () => {
  var services = useUserServices();
  var invoices = useUserInvoices();
  var tickets = useUserTickets();

  const servicesNumber = services.length.toString() ?? '0';
  const invoicesNumber = invoices.length.toString() ?? '0';
  const ticketsNumber = tickets.length.toString() ?? '0';
  return (
    <>
      <Toolbar />
      <Content>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-4'>
            <ProfileWidget
              className='card-xxl-stretch mb-xl-3'
              chartColor='success'
              chartHeight='150px'
            />
          </div>

          <div className='col-xl-8'>
            <div className='row gx-5 gx-xl-8 mb-5 mb-xl-8'>
              <div className='col-xl-12'>
                <TilesWidget4 className='card-xl-stretch' />
              </div>
            </div>

            <div className='row gx-5 gx-xl-8 mb-5 mb-xl-8'>
              <div className='col-xl-12'>
                <div className='row gx-5 gx-xl-8'>
                  <div className='col-xl-3'>
                    <TilesWidget5
                      className='card-xxl-stretch bg-primary'
                      svgIcon='document'
                      titleClass='text-white'
                      descriptionClass='text-white'
                      iconClass='text-white'
                      title={servicesNumber}
                      description='Servicii'
                      link='services/my-services'
                    />
                  </div>
                  <div className='col-xl-3'>
                    <TilesWidget5
                      className='card-xxl-stretch bg-body'
                      svgIcon='notepad'
                      titleClass='text-gray-900'
                      descriptionClass='text-muted'
                      iconClass='text-success'
                      title='0'
                      description='Domenii'
                      link='domain/my-domains'
                    />
                  </div>
                  <div className='col-xl-3'>
                    <TilesWidget5
                      className='card-xxl-stretch bg-primary'
                      svgIcon='wallet'
                      titleClass='text-white'
                      descriptionClass='text-white'
                      iconClass='text-white'
                      title={invoicesNumber}
                      description='Facturi neachitate'
                      link='invoices/my-invoices'
                    />
                  </div>
                  <div className='col-xl-3'>
                    <TilesWidget5
                      className='card-xxl-stretch bg-body'
                      svgIcon='notification'
                      titleClass='text-gray-900'
                      descriptionClass='text-muted'
                      iconClass='text-success'
                      title={ticketsNumber}
                      description='Tichete de suport'
                      link="assistance/my-tickets"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* begin::Row */}
        <div className='row gy-5 gx-xl-8'>
          <div className='col-xl-12'>
            <ServicesTables className='card-xxl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
        {/* end::Row */}

      </Content>
    </>
  )
}

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
