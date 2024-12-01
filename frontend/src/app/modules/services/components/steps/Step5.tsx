import React, {FC} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useFormikContext} from 'formik'
import { ICreateService } from '../CreateServiceWizardHelper'
import { PackModel } from '../../'
import { calculateTotalPrice } from '../../'

interface Step5{
  packs: PackModel[]
}

const Step5: FC<Step5> = ({packs}) => {
  const { values } = useFormikContext<ICreateService>()
  const pack = packs.filter((pack) => pack.pack_id.toString() === values.servicePlan)
  const totalPrice = calculateTotalPrice(pack[0]?.price, values.serviceSize)
  const extraSpacePrice = totalPrice - pack[0]?.price
  return (
    <div className='w-100'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bolder text-gray-900'>Serviciul dumneavoastră este aproape gata!</h2>

        <div className='text-gray-500 fw-bold fs-6'>
          Daca aveti nevoie de mai multe informatii, va rugam sa consultati pagina de
          <Link to='/auth/login' className='link-primary fw-bolder'>
            {' '}
            Ajutor
          </Link>
          .
        </div>
      </div>
      <div>
        <div className='d-flex justify-content-between flex-wrap flex-lg-nowrap'>
          <div className='d-flex flex-column flex-grow-1 pe-8'>
            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Persoană:</div>
              <div className='fw-bold fs-6 text-gray-600'>{values.serviceType}</div>
            </div>
            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Nume serviciu:</div>
              <div className='fw-bold fs-6 text-gray-600'>{values.serviceName}</div>
            </div>
            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Adresa:</div>
              <div className='fw-bold fs-6 text-gray-600'>{values.billingAddress}, {values.billingCity}, {values.billingPostalCode}</div>
            </div>

            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Metodă de plată:</div>
              <div className='fw-bold fs-6 text-gray-600'>{values.servicePaymentMethod}</div>
            </div>

            <div className='separator separator-dashed my-6'></div>

            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Plan:</div>
              <div className='fw-bold fs-6 text-gray-600'>{pack[0]?.name} - {pack[0]?.price} $</div>
            </div>

            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Capacitate:</div>
              <div className='fw-bold fs-6 text-gray-600'>{Number(values.serviceSize) ? Number(values.serviceSize) : "Nelimitat"} GB - {extraSpacePrice}$</div>
            </div>
            <div className='d-flex flex-row'>
              <div className='fw-bolder fs-6 text-gray-800'>Total:</div>
              <div className='fw-bold fs-6 text-gray-600'>{totalPrice}$</div>
            </div>
            <div className='separator separator-dashed my-6'></div>

          </div>
        </div>
      </div>
      <div className='mb-0'>
        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-bold'>
              <h4 className='text-gray-800 fw-bolder'>Avem nevoie de atenția dumneavoastră!</h4>
              <div className='fs-6 text-gray-600'>
                Pentru a finaliza comandă verificați detaliile și apăsați pe
                <a href='/dashboard' className='fw-bolder'>
                  {' '}
                  butonul de mai jos
                </a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step5}
