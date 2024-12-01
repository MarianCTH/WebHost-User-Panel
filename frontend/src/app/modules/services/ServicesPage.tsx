import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { MyServices } from './components/my-services'
import { NewService } from './components/new-service'
import { ServiceConfigurator } from './components/config-service'
import { ServicePasswordChanger } from './components/change-service-password'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Servicii',
    path: '/services/my-services',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ServicesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='my-services'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Serviciile mele</PageTitle>
              <MyServices />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='new-service'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Serviciu nou</PageTitle>
              <NewService />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='config-service/:id'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Configurare serviciu</PageTitle>
              <ServiceConfigurator />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='change-service-password/:id'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Schimbare parolă serviciu</PageTitle>
              <ServicePasswordChanger />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default ServicesPage
