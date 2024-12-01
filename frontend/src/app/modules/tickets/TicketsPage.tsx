import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { MyTickets } from './components/my-tickets'
import { OpenTicket } from './components/open-ticket'
import { ViewTicket } from './components/view-ticket'
import { Announcements } from './components/announcements'
import { SystemStatus } from './components/system-status'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Asistență',
    path: '/assistance/my-tickets',
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

const InvoicesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='my-tickets'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Tichetele mele</PageTitle>
              <MyTickets />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='open-ticket'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Tichet nou</PageTitle>
              <OpenTicket />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='view-ticket/:id'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Vizualizare Tichet</PageTitle>
              <ViewTicket />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='announcements'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Anunțuri</PageTitle>
              <Announcements />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='system-status'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Status sistem</PageTitle>
              <SystemStatus />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default InvoicesPage
