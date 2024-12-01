import React, {FC} from 'react'

import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { getCpanelData } from '../../services/core/Services'

const SystemStatus: FC = () => {
    const data = getCpanelData("gethostname", {"api.version": 1}, 0) as { metadata?: { result?: string | undefined } } | undefined || {};
    const server_status = data?.metadata?.result;

    return (
        <>
        <Toolbar />
        <Content>
        <div className='card'>
          <div className='card-body pt-20 pb-20'>
            <div className='d-flex flex-row justify-content-center align-items-center custom-size'>
                <h1>Status:</h1>
                {server_status === "1" ? <span className="badge badge-light-success ms-3">Active</span> : 
                <span className="badge badge-light-danger ms-3">Inactive</span>}
            </div>

          </div>
        </div>
        </Content>
        </>
    )
}

export {SystemStatus}
