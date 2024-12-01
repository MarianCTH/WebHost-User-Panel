import {useEffect, useRef, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Form, Formik, FormikValues, useFormikContext} from 'formik'
import {createServiceSchemas, ICreateService} from './CreateServiceWizardHelper'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { useAuth } from '../../auth'
import { calculateTotalPrice, createService, getCpanelResponse } from '../core/Services'
import { usePacks, PackModel } from '../'
import { useWalletBalance, useMakePayment } from '../../invoices/core/Invoices'

interface CpanelResponse {
  data:{

  }
  metadata: {
    result: string;
  };
}

const created_message = "Serviciul a fost creat cu succes!"
const NewService = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [ stepper, setStepper ] = useState<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createServiceSchemas[0])
  const { currentUser } = useAuth();
  var userBalance = useWalletBalance(currentUser?.userId || 0);
  const [paymentStatus, setPaymentStatus] = useState<string>('pending')
  const [cpanelNameNotValid, setCpanelNameNotValid] = useState<boolean>(false);

  const packs = usePacks();

  const [initValues] = useState<ICreateService>({
    userID: currentUser?.userId || 0,
    serviceType: 'personal',
    serviceName: '',
    serviceSize: '5',
    serviceStatus: 'In progress',
    servicePlan: '1',
    serviceEndDate: new Date(),
    billingAddress: '',
    billingPostalCode: '',
    billingCity: '',
    billingEmail: currentUser?.email || '',
    servicePaymentMethod: 'wallet',
    saveCard: '1',
    usedPromocode: '',
  })
  const [service_created, setServiceCreated] = useState(false);

  const loadStepper = () => {
    setStepper(StepperComponent.createInsance(stepperRef.current as HTMLDivElement))
  }

  const prevStep = () => {
    if (!stepper) {
      return
    }

    stepper.goPrev()

    setCurrentSchema(createServiceSchemas[stepper.currentStepIndex - 1])
  }
  
  const submitStep = (values: ICreateService, actions: FormikValues) => {
    if (!stepper) {
      return
    }

    if (stepper.currentStepIndex !== stepper.totalStepsNumber) {
      stepper.goNext()
    } else {
      const pack= packs.filter((pack) => pack.pack_id.toString() === values.servicePlan)
      const packPrice = Number(pack[0].price)
      const amountToPay = calculateTotalPrice(packPrice, values.serviceSize)
      const { makePayment } = useMakePayment(currentUser?.userId || 0, Number(amountToPay));

      if(userBalance < amountToPay){
        setPaymentStatus('balance-error')
        setTimeout(() => {
          setPaymentStatus('pending')
        }, 3000)
        return;
      }

      const username = values.serviceName.replace(/\s/g, '');
      const { fetchUserCpanelData: verifyUsername } = getCpanelResponse("verify_new_username", {"api.version":1, "user": username});
      verifyUsername().then((response) => {
        const responseData = typeof response === 'string' ? JSON.parse(response)?.metadata?.result : undefined;
        if (responseData === "0") {
          setCpanelNameNotValid(true)
          alert("Username is invalid !")
        } 
      });

      const { fetchUserCpanelData: verifyAlreadyExistingUsername } = getCpanelResponse("listaccts", {"api.version":1, search: username, searchtype: "user"});
      verifyAlreadyExistingUsername().then((response) => {
        const responseData = typeof response === 'string' ? JSON.parse(response)?.metadata?.result : undefined;
        if (!responseData == false) {
          setCpanelNameNotValid(true)
          alert("Username already exists !")
        } 
      });
      if(cpanelNameNotValid)
        return

      const  { fetchUserCpanelData: makeCpanelAccount } = getCpanelResponse("createacct", {"api.version":1, username: username, domain: username + ".ro", contactemail: values.billingEmail, plan: "default"});

      setPaymentStatus('waiting')
      setTimeout(() => {
        makePayment().then((paymentResult) => {
          if (paymentResult === 'success') {
            makeCpanelAccount().then((response) => 
            {
              const responseData = typeof response === 'string' ? JSON.parse(response)?.metadata?.result : undefined;
              if (responseData === "0") {
                setCpanelNameNotValid(true)
                alert("Something failed to making cpanel account!")
              } 
            });

            if(cpanelNameNotValid)
              return

            createService(values, username)
            actions.resetForm()
            stepper.goFirst()
            setServiceCreated(true);
            setPaymentStatus('success');
            setTimeout(() => {
              setPaymentStatus('pending')
            }, 3000)
          } else {
            console.log('Payment failed');
          }
        }).catch((error) => {
          console.error('Error occurred during payment:', error);
        });
      }, 2000)
    }

    setCurrentSchema(createServiceSchemas[stepper.currentStepIndex - 1])
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])
  return (
    <>
      <Toolbar />
      <Content>
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_create_account_stepper'
        >
          {/* begin::Aside*/}
          <div className='card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
            {/* begin::Wrapper*/}
            <div className='card-body px-6 px-lg-10 px-xxl-15 py-20'>
              {/* begin::Nav*/}
              <div className='stepper-nav'>
                {/* begin::Step 1*/}
                <div className='stepper-item current' data-kt-stepper-element='nav'>
                  {/* begin::Wrapper*/}
                  <div className='stepper-wrapper'>
                    {/* begin::Icon*/}
                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>1</span>
                    </div>
                    {/* end::Icon*/}

                    {/* begin::Label*/}
                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Tip Cumpărător</h3>

                      <div className='stepper-desc fw-semibold'>Configurați detaliile cumpărătorului</div>
                    </div>
                    {/* end::Label*/}
                  </div>
                  {/* end::Wrapper*/}

                  {/* begin::Line*/}
                  <div className='stepper-line h-40px'></div>
                  {/* end::Line*/}
                </div>
                {/* end::Step 1*/}

                {/* begin::Step 2*/}
                <div className='stepper-item' data-kt-stepper-element='nav'>
                  {/* begin::Wrapper*/}
                  <div className='stepper-wrapper'>
                    {/* begin::Icon*/}
                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>2</span>
                    </div>
                    {/* end::Icon*/}

                    {/* begin::Label*/}
                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Configurarea Planului</h3>
                      <div className='stepper-desc fw-semibold'>Configurați setările planului dvs</div>
                    </div>
                    {/* end::Label*/}
                  </div>
                  {/* end::Wrapper*/}

                  {/* begin::Line*/}
                  <div className='stepper-line h-40px'></div>
                  {/* end::Line*/}
                </div>
                {/* end::Step 2*/}

                {/* begin::Step 3*/}
                <div className='stepper-item' data-kt-stepper-element='nav'>
                  {/* begin::Wrapper*/}
                  <div className='stepper-wrapper'>
                    {/* begin::Icon*/}
                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>3</span>
                    </div>
                    {/* end::Icon*/}

                    {/* begin::Label*/}
                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Adresa de facturare</h3>
                      <div className='stepper-desc fw-semibold'>Detaliile dumneavoastră de facturare</div>
                    </div>
                    {/* end::Label*/}
                  </div>
                  {/* end::Wrapper*/}

                  {/* begin::Line*/}
                  <div className='stepper-line h-40px'></div>
                  {/* end::Line*/}
                </div>
                {/* end::Step 3*/}

                {/* begin::Step 4*/}
                <div className='stepper-item' data-kt-stepper-element='nav'>
                  {/* begin::Wrapper*/}
                  <div className='stepper-wrapper'>
                    {/* begin::Icon*/}
                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>4</span>
                    </div>
                    {/* end::Icon*/}

                    {/* begin::Label*/}
                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Detalii de plată</h3>
                      <div className='stepper-desc fw-semibold'>Setează metoda de plată</div>
                    </div>
                    {/* end::Label*/}
                  </div>
                  {/* end::Wrapper*/}

                  {/* begin::Line*/}
                  <div className='stepper-line h-40px'></div>
                  {/* end::Line*/}
                </div>
                {/* end::Step 4*/}

                {/* begin::Step 5*/}
                <div className='stepper-item' data-kt-stepper-element='nav'>
                  {/* begin::Wrapper*/}
                  <div className='stepper-wrapper'>
                    {/* begin::Icon*/}
                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>5</span>
                    </div>
                    {/* end::Icon*/}

                    {/* begin::Label*/}
                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Finalizare</h3>
                      <div className='stepper-desc fw-semibold'>Bucură-te de noul tău plan</div>
                    </div>
                    {/* end::Label*/}
                  </div>
                  {/* end::Wrapper*/}
                </div>
                {/* end::Step 5*/}
              </div>
              {/* end::Nav*/}
            </div>
            {/* end::Wrapper*/}
          </div>
          {/* begin::Aside*/}

          <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
            
            <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
              {() => (
                <Form
                className='py-20 w-100 w-xl-700px px-9'
                noValidate
                id='kt_create_account_form'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                  <div className='current' data-kt-stepper-element='content'>
                    <Step1 />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <Step2 packs={packs}/>
                  </div>

                  <div data-kt-stepper-element='content'>
                    <Step3 />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <Step4 />
                  </div>

                  <div data-kt-stepper-element='content'>
                    <Step5 packs={packs} />
                  </div>
                  {service_created ? (
                    <div className='mb-lg-15 alert alert-success'>
                      <div className='success-text font-weight-bold'>{created_message}</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {paymentStatus == "balance-error" && (
                    <div className='mt-10 alert alert-danger'>
                        <div className='alert-text font-weight-bold'>
                            Balanța curentă este insuficientă !
                        </div>
                    </div>
                  )}
                  <div className='d-flex flex-stack pt-10'>
                    <div className='mr-2'>
                      <button
                        onClick={prevStep}
                        type='button'
                        className='btn btn-lg btn-light-primary me-3'
                        data-kt-stepper-action='previous'
                      >
                        <KTIcon iconName='arrow-left' className='fs-4 me-1' />
                        Înapoi
                      </button>
                    </div>

                    <div>
                      <button type='submit' className='btn btn-lg btn-primary me-3'>
                        <span className='indicator-label'>
                          {stepper?.currentStepIndex !== ((stepper?.totalStepsNumber || 2)) && paymentStatus != "waiting" && 'Continuă'}
                          {stepper?.currentStepIndex === ((stepper?.totalStepsNumber || 2)) && paymentStatus != "waiting" && 'Creează serviciul'}
                          {paymentStatus != "waiting" && (
                            <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                          )}
                          {paymentStatus == "waiting" && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Se creează serviciul...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            
          </div>
        </div>
      </Content>
    </>
  )
}


export {NewService}
