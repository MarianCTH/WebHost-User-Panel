import React, {FC} from 'react'
import {
  InvoicesTables,
} from '../../../../_metronic/partials/widgets'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'

const MyInvoices: FC = () => {
  return (
    <>
      <Toolbar />
      <Content>
        <InvoicesTables className='mb-5 mb-xl-8' />
      </Content>
    </>
  )
}

export {MyInvoices}
