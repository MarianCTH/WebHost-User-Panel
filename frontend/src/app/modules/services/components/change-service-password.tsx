import React, { FC, useEffect, useState } from 'react';
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { ChangeServicePasswordForm } from './templates/ChangeServicePasswordForm'
import { KTIcon } from '../../../../_metronic/helpers';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup'
import { Link, useParams } from 'react-router-dom'
import { changeServicePassword, useUserOneService } from '../core/Services';
import { IChangePassword } from './../core/_models';

const changePasswordSchemas = [
  Yup.object({
    newPassword: Yup.string().required('Parola este obligatorie !'),
    newPasswordConfirm: Yup.string().required('Parola nouă este obligatorie !'),
  }),
]

const ServicePasswordChanger: FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = useUserOneService(parseInt(id ?? '0'))
  const [currentSchema, setCurrentSchema] = useState(changePasswordSchemas[0]);
  const [password_changed, setPasswordChanged] = useState(false);
  const [initValues, setInitValues] = useState<IChangePassword | undefined>(undefined);

  useEffect(() => {
    if (service) {
      setInitValues({
        username: service.username || '',
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  }, [service]);

  const submitStep = async (values: IChangePassword, actions: FormikValues) => {
    setCurrentSchema(changePasswordSchemas[0]);
    if (values.newPassword !== values.newPasswordConfirm) {
      actions.setFieldError('newPasswordConfirm', 'Parolele nu se potrivesc !');
      return;
    }
    else if (values.newPassword.length < 8) {
      actions.setFieldError('newPasswordConfirm', 'Parola trebuie să aibă minim 8 caractere !');
      return;
    }
    else if (!values.newPassword.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/)) {
        actions.setFieldError('newPasswordConfirm', 'Parola trebuie sa conțină minim o cifră, un caracter special și o literă mare !');
        return;
      }
    try {
        const response = await changeServicePassword(values);
        if (response && response.data && response.data.success) {
          actions.resetForm();
          setPasswordChanged(true);
        } else {
          actions.setFieldError('newPasswordConfirm', 'Eroare la schimbarea parolei. Parola este prea slabă, încearcă din nou !');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        actions.setFieldError('newPasswordConfirm', 'Eroare la schimbarea parolei !');
      }
  };

  return (
    <>
      <Toolbar />
      <Content>
        {initValues ? (
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
                        <ChangeServicePasswordForm serviceName={service?.name ?? '' } />
                      </div>
                      <div className='d-flex flex-stack pt-15'>
                        <div className='mr-2'>
                        </div>
                        <div>
                          <button type='submit' className='btn btn-lg btn-primary me-3'>
                            <span className='indicator-label'>
                              Schimbă
                              <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                            </span>
                          </button>
                        </div>
                      </div>
                      {password_changed ? (
                        <div className='mb-lg-15 mt-5 alert alert-success'>
                          <div className='success-text font-weight-bold'>
                            Parola a fost schimbată cu success !
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
        ) : (
            <div>Loading service data...</div>
          )}
      </Content>
    </>
  )
}

export { ServicePasswordChanger }
