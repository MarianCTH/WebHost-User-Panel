import React, {FC} from 'react'
import {
    UnpaidInvoices,
} from '../../../../_metronic/partials/widgets'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
const MassPay: FC = () => {
    return (
      <>
        <Toolbar />
        <Content>
          <UnpaidInvoices className='mb-5 mb-xl-8' />
        </Content>
      </>
    )
  }
  
  export {MassPay}
  