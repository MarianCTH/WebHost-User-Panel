import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { MyInvoices } from './components/my-invoices'
import { AddFunds } from './components/add-funds'
import { PayInvoice } from './components/pay-invoice'
import { MassPay } from './components/mass-pay'
import { PayAllInvoices } from './components/pay-all-invoices'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Facturi',
    path: '/invoices/my-invoices',
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
          path='my-invoices'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Facturile mele</PageTitle>
              <MyInvoices />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='add-funds'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Adăugare fonduri</PageTitle>
              <AddFunds />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='pay-invoice/:id'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Plătește factura</PageTitle>
              <PayInvoice />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='mass-pay'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Plată în masă</PageTitle>
              <MassPay />
            </>
          }
        />
      </Route>
      <Route element={<Outlet />}>
        <Route
          path='pay-all-invoices'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Confirmare plată în masă</PageTitle>
              <PayAllInvoices />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default InvoicesPage
