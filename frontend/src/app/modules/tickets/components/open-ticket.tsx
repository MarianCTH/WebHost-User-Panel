import React, { FC, useEffect, useRef, useState } from 'react';
import { TicketForm } from './templates/TicketForm';
import { KTIcon } from '../../../../_metronic/helpers';
import { Form, Formik, FormikValues } from 'formik';
import { createTicketSchemas, ICreateTicket } from './CreateTicketHelper';
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar';
import { Content } from '../../../../_metronic/layout/components/Content';
import { useAuth } from '../../auth';
import { createTicket } from '../core/Tickets';
import ReCAPTCHA from 'react-google-recaptcha';

const OpenTicket: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createTicketSchemas[0]);
  const { currentUser } = useAuth();
  const [initValues] = useState<ICreateTicket>({
    userID: currentUser?.userId || 0,
    ticketTitle: '',
    ticketDescription: '',
    ticketEmail: currentUser?.email || '',
    ticketStatus: 'open',
  });
  const [isSubmitButton, setSubmitButton] = useState(false);
  const [ticket_created, setTicketCreated] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const submitStep = async (values: ICreateTicket, actions: FormikValues) => {
    /*if (!recaptchaRef.current?.getValue()) {
      console.log('Please complete the CAPTCHA.');
      return;
    }*/
    setCurrentSchema(createTicketSchemas[0]);

    createTicket(values)
    actions.resetForm();
    setTicketCreated(true);
  };

  const handleCaptchaChange = (token: string | null) => {
    console.log(token);
  };

  return (
    <>
      <Toolbar />
      <Content>
        <div className='card'>
          <div className='card-body'>
            <div className='d-flex flex-column pt-15'>
              <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
                {() => (
                  <Form
                    className='mx-auto mw-600px w-100 pt-15 pb-10'
                    id='kt_create_account_form'
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <div className='current' data-kt-stepper-element='content'>
                      <TicketForm />
                    </div>
                    <div className='d-flex flex-stack pt-15'>
                      <div className='mr-2'>                    
                        <ReCAPTCHA ref={recaptchaRef} sitekey="6LeyzLcpAAAAAIfcq5I1NFdInpWYJ_40o7oe7_SS" onChange={handleCaptchaChange} />
                      </div>

                      <div>
                        <button type='submit' className='btn btn-lg btn-primary me-3'>
                          <span className='indicator-label'>
                            Trimite
                            <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                          </span>
                        </button>
                      </div>
                    </div>
                    {ticket_created ? (
                      <div className='mb-lg-15 mt-5 alert alert-success'>
                        <div className='success-text font-weight-bold'>
                          Tichetul a fost trimis cu success ! O să vă contactăm în cel mai scurt timp.
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { OpenTicket };
