
import clsx from 'clsx'

type Props = {
  className?: string
}
const TilesWidget4 = ({className}: Props) => {
  return (
    <div className={clsx('card h-150px', className)}>
      <div className='card-body d-flex align-items-center justify-content-between flex-wrap'>
        <div className='me-2'>
          <h2 className='fw-bold text-gray-800 mb-3'>Dorești găzduire gratis?</h2>

          <div className='text-muted fw-semibold fs-6'>
            Comandă pachetul dezvoltare web și primești găzduire gratis pentru 1 an.
          </div>
        </div>
        <a
          href='services/new-service'
          className='btn btn-primary fw-semibold'
        >
          Începe acum
        </a>
      </div>
    </div>
  )
}

export {TilesWidget4}
