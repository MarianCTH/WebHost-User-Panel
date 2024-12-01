import React, {FC} from 'react'
import {
  TicketsTables,
} from '../../../../_metronic/partials/widgets'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'

const MyTickets: FC = () => {
  return (
    <>
      <Toolbar />
      <Content>
        <TicketsTables className='mb-5 mb-xl-8' />
      </Content>
    </>
  )
}

export {MyTickets}
