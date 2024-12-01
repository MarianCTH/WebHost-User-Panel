import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar';
import { Content } from '../../../../_metronic/layout/components/Content';
import { TicketMessage } from './templates/TicketMessage';
import { useTicketData} from '../core/Tickets';
import { Formik, Form, FormikValues, ErrorMessage, Field } from 'formik';
import { ICreateMessage, createMessageSchemas } from './CreateTicketHelper';
import { useAuth } from '../../auth';
import ReCAPTCHA from 'react-google-recaptcha';
import { KTIcon } from '../../../../_metronic/helpers';
import { createMessage } from '../core/Tickets';

const ViewTicket: FC = () => {
    const { id } = useParams<{ id: string }>();
    const ticketData = useTicketData(parseInt(id??'0'));
    const createdDate = ticketData ? new Date(ticketData.created_date) : new Date();
    const formattedDate = createdDate.toLocaleString();
    const { currentUser } = useAuth();
    const statusClassMap = {
        'open': 'badge-light-success',
        'closed': 'badge-light-danger',
      };
    const [currentSchema, setCurrentSchema] = useState(createMessageSchemas[0]);
    const [initValues] = useState<ICreateMessage>({
        userID: currentUser?.userId || 0,
        ticketID: parseInt(id??'0'),
        messageDescription: '',
      });
    const [ticket_created, setTicketCreated] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const handleCaptchaChange = (token: string | null) => {
        console.log(token);
    };
    const submitStep = async (values: ICreateMessage, actions: FormikValues) => {
        /*if (!recaptchaRef.current?.getValue()) {
          console.log('Please complete the CAPTCHA.');
          return;
        }*/
        setCurrentSchema(createMessageSchemas[0]);
        createMessage(values);
        console.log(values);
        actions.resetForm();
      };
    
    return (
        <>
        <Toolbar />
        <Content>
        <div className='card'>
            <div className='card-body'>
                <div className='d-flex flex-column pt-5'>
                    <div className='w-100'>
                        <div className='pb-10 pb-lg-12'>
                            <h2 className='fw-bolder text-gray-900'>[#{id}] {ticketData?.title}</h2>
                            <div className='text-muted fw-bold fs-7'>
                                <span>Creat la: {formattedDate} </span>                         
                                <span className={`badge ${statusClassMap[ticketData?.status as keyof typeof statusClassMap]}`}>
                                    {ticketData?.status === 'closed' ? 'Închis' : 'Deschis'}
                                </span>
                            </div>
                        </div>
                        {ticketData?.messages.map((message, index) => (
                            <TicketMessage key={index} message={message} className='mb-5 mb-xxl-8'/>
                        ))}
                        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
                        {() => (
                            <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className='current' data-kt-stepper-element='content'>
                                    <div className='fv-row mb-10'>
                                        <label className='form-label required'>Mesaj</label>

                                        <Field
                                        as='textarea'
                                        name='messageDescription'
                                        className='form-control form-control-lg form-control-solid'
                                        rows={3}
                                        ></Field>
                                        <div className='text-danger mt-2'>
                                        <ErrorMessage name='messageDescription' />
                                        </div>
                                    </div>
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
                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
        </Content>
        </>
    );
};

export { ViewTicket };
