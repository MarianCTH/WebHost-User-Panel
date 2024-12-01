import {useEffect, useRef, FC} from 'react'
import {KTIcon} from '../../../helpers'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import { ServiceModel } from '../../../../app/modules/services'

type Props = {
  className: string
  serv: ServiceModel | undefined
}

const PackWidget: FC<Props> = ({className, serv}) => {
  const {mode} = useThemeMode()

  useEffect(() => {
  }, [mode])

  return (
    <div className={`card ${className}`}>

      {/* begin::Body */}
      <div className='card-body p-0 d-flex flex-column'>
        {/* begin::Stats */}
        <div className='card-p pt-5 bg-body flex-grow-1'>
          <h3 className='d-flex align-items-center flex-column'>
            <KTIcon iconName='dropbox' className='text-success fs-7hx ms-n1 flex-grow-1 pt-15' />
            <h1 className='card-label fw-bold fs-3 mb-5'>Pachet: {serv?.pack.name}</h1>
            <span className='text-muted fw-semibold fs-5 mb-5'>Stare: <span className="badge badge-light-success">{serv?.status}</span></span>
            <span className='text-muted fw-semibold fs-5 text-center'>{serv?.pack.description}</span>

          </h3>
        </div>
        {/* end::Stats */}
      </div>
      {/* end::Body */}
    </div>
  )
}
export {PackWidget}
