import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuInnerWithSub title='Servicii' to='/services' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='cube-2' to='/services/my-services' title='Serviciile mele' />
        <MenuItem icon='handcart' to='/services/new-service' title='Comandă nouă' />
        <MenuItem icon='dots-circle' to='/services/extra-options' title='Opțiuni suplimentare' />
      </MenuInnerWithSub>
      <MenuInnerWithSub title='Domenii' to='/domains' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='document' to='/domains/my-domain' title='Domeniile mele' />
        <MenuItem icon='arrows-circle' to='/domains/renew-domain' title='Reînoire domenii' />
        <MenuItem icon='price-tag' to='/domains/new-domain' title='Înregistrare domeniu nou' />
        <MenuItem icon='arrow-right-left' to='/domains/transfer-domain' title='Transfer domenii' />
      </MenuInnerWithSub>
      <MenuInnerWithSub title='Site & Securitate' to='/security' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='check-circle' to='/security/ssl-certificates' title='Certificate SSL' />
      </MenuInnerWithSub>
      <MenuInnerWithSub title='Financiar' to='/finances' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='book' to='/invoices/my-invoices' title='Facturile mele' />
        {/*<MenuItem icon='message-text-2' to='/invoices/my-offers' title='Ofertele mele' />*/}
        <MenuItem icon='dollar' to='/invoices/mass-pay' title='Plată în masă' />
        <MenuItem icon='wallet' to='/invoices/add-funds' title='Adăugare fonduri' />
      </MenuInnerWithSub>
      <MenuInnerWithSub title='Asistență' to='/assistance' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='devices' to='/assistance/my-tickets' title='Tichete de suport' />
        <MenuItem icon='message-text' to='/assistance/announcements' title='Anunțuri' />
        <MenuItem icon='data' to='/assistance/system-status' title='Starea sistemelor' />
        <MenuItem icon='plus-circle' to='/assistance/open-ticket' title='Deschide tichet' />
      </MenuInnerWithSub>
    </>
  )
}
