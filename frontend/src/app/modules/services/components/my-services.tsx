import React, {FC} from 'react'
import {
  ServicesTables,
} from '../../../../_metronic/partials/widgets'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'

const MyServices: FC = () => {
  return (
    <>
      <Toolbar />
      <Content>
        <ServicesTables className='mb-5 mb-xl-8' />
      </Content>
    </>
  )
}

export {MyServices}
