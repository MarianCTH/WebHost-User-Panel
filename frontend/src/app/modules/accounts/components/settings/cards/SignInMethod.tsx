
import React, { FC, useState } from 'react'
import {KTIcon} from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { useAuth } from '../../../../auth/core/Auth'
import { UserModel } from '../../../../auth/index';
import { UpdateDatabasePassword, UpdateDatabaseEmail, checkUserPassword } from '../../../core/UserProfile';

const emailFormValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Formatul email-ului este greșit')
    .min(3, 'Minim 3 caractere')
    .max(50, 'Maxim 50 caractere')
    .required('Email-ul este necesar'),
  confirmPassword: Yup.string()
    .min(3, 'Minim 3 caractere')
    .max(50, 'Maxim 50 caractere')
    .required('Parola este necesară'),
})

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minim 3 caractere')
    .max(50, 'Maxim 50 caractere')
    .required('Parola este necesară'),
  newPassword: Yup.string()
    .min(3, 'Minim 3 caractere')
    .max(50, 'Maxim 50 caractere')
    .required('Parola este necesară'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minim 3 caractere')
    .max(50, 'Maxim 50 caractere')
    .required('Parola este necesară')
    .oneOf([Yup.ref('newPassword')], 'Parolele trebuie să coincidă'),
})

type Props = {
  user: UserModel
}

interface IUpdatePassword {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}
interface IUpdateEmail {
  newEmail: string;
  confirmPassword: string;
}

const SignInMethod: FC<Props> = ({ user }) => {
  const [emailUpdateData, setEmailUpdateData] = useState<IUpdateEmail>({
    newEmail: user?.email,
    confirmPassword: "",
  })
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>({
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  })
  const { updateCurrentUser } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
  const [passwordNotCorrect, setPasswordNotCorrect] = useState<boolean>(false)
  const [passwordNotCorrect1, setPasswordNotCorrect1] = useState<boolean>(false)
  const [isPasswordUpdated, setPasswordUpdated] = useState<boolean>(false)
  const [isEmailUpdated, setEmailUpdated] = useState<boolean>(false)

  const [loading1, setLoading1] = useState(false)

  const formik1 = useFormik<IUpdateEmail>({
    initialValues: {
      ...emailUpdateData,
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: (values) => {
      setLoading1(true)
      setTimeout(() => {
        const handlePasswordCheck = async () => {
          const resultx = await checkUserPassword({ userID: user.userId, password: values.confirmPassword });
          setLoading1(false)
  
          if (resultx == "0") {
            setPasswordNotCorrect1(true)
          } else {
            setPasswordNotCorrect1(false)
            setEmailUpdated(true)
            setTimeout(() => {
              setShowEmailForm(false)
              setEmailUpdated(false)
            }, 2000)
            const newUser: UserModel = {
              userId: user.userId,
              username: user.username,
              password: user.password,
              email: values.newEmail,
              first_name: user.first_name,
              last_name: user.last_name,
              pic: user.pic,
              phone: user.phone,
              companyName: user.companyName,
              website: user.website,
              country: user.country,
              timeZone: user.timeZone,
              role: user.role,
            }
            updateCurrentUser(newUser);
            setEmailUpdateData(values)
            UpdateDatabaseEmail({ userID: user.userId, email: values.newEmail });
          }
        }
        handlePasswordCheck();

      }, 1000)
    },
  })

  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true)
      setTimeout(() => {

      const handlePasswordCheck = async () => {
        const resultx = await checkUserPassword({ userID: user.userId, password: values.currentPassword });
        setLoading2(false)

        if (resultx == "0") {
          setPasswordNotCorrect(true)
        } else {
          setPasswordUpdateData(values)
          const newPasswordData = {
            userID: user.userId,
            password: values.newPassword,
          }
          UpdateDatabasePassword(newPasswordData);
          setPasswordNotCorrect(false)
          setPasswordUpdated(true)
          setTimeout(() => {
            setPasswordForm(false)
            setPasswordUpdated(false)
          }, 2000)
        }
      }
      handlePasswordCheck();
      }, 1000)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Metodă de autentificare</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_email' className={' ' + (showEmailForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Adresă de email</div>
              <div className='fw-bold text-gray-600'>{user?.email}</div>
            </div>

            <div
              id='kt_signin_email_edit'
              className={'flex-row-fluid ' + (!showEmailForm && 'd-none')}
            >
              <form
                onSubmit={formik1.handleSubmit}
                id='kt_signin_change_email'
                className='form'
                noValidate
              >
                <div className='row mb-6'>
                  <div className='col-lg-6 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='emailaddress' className='form-label fs-6 fw-bolder mb-3'>
                        Adresa Nouă de Email
                      </label>
                      <input
                        type='email'
                        className='form-control form-control-lg form-control-solid'
                        id='emailaddress'
                        placeholder='Email Address'
                        {...formik1.getFieldProps('newEmail')}
                      />
                      {formik1.touched.newEmail && formik1.errors.newEmail && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik1.errors.newEmail}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='fv-row mb-0'>
                      <label
                        htmlFor='confirmemailpassword'
                        className='form-label fs-6 fw-bolder mb-3'
                      >
                        Confirmă Parola
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid'
                        id='confirmemailpassword'
                        {...formik1.getFieldProps('confirmPassword')}
                      />
                      {formik1.touched.confirmPassword && formik1.errors.confirmPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik1.errors.confirmPassword}</div>
                        </div>
                      )}
                      {passwordNotCorrect1 && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>Parola curentă nu este corectă !</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <button
                    id='kt_signin_submit'
                    type='submit'
                    className='btn btn-primary  me-2 px-6'
                  >
                    {!loading1 && 'Actualizează'}
                    {loading1 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Se încarcă...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    id='kt_signin_cancel'
                    type='button'
                    onClick={() => {
                      setShowEmailForm(false)
                    }}
                    className='btn btn-color-gray-500 btn-active-light-primary px-6'
                  >
                    Anulează
                  </button>
                </div>
                {isEmailUpdated && (
                  <div className='mb-lg-15 alert alert-success mt-5'>
                  <div className='success-text font-weight-bold'>Email-ul a fost actualizat cu success !</div>
                </div>
                )}
              </form>
            </div>

            <div id='kt_signin_email_button' className={'ms-auto ' + (showEmailForm && 'd-none')}>
              <button
                onClick={() => {
                  setShowEmailForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Modifică adresa de email
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Parolă</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Parolă Curentă
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='currentpassword'
                        {...formik2.getFieldProps('currentPassword')}
                      />
                      {formik2.touched.currentPassword && formik2.errors.currentPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.currentPassword}</div>
                        </div>
                      )}
                      {passwordNotCorrect && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>Parola curentă nu este corectă !</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                       Parolă Nouă
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='newpassword'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.newPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Confirmă Parola Nouă
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Parola trebuie să aibă cel puțin 8 caractere și să conțină simboluri
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Actualizează'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Se încarcă...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-500 btn-active-light-primary px-6'
                  >
                    Anulează
                  </button>
                </div>
                {isPasswordUpdated && (
                  <div className='mb-lg-15 alert alert-success mt-5'>
                  <div className='success-text font-weight-bold'>Parola a fost actualizată cu success !</div>
                </div>
                )}
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Resetează Parola
              </button>
            </div>
          </div>

          <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed p-6'>
            <KTIcon iconName='shield-tick' className='fs-2tx text-primary me-4' />
            <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
              <div className='mb-3 mb-md-0 fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Securizează contul</h4>
                <div className='fs-6 text-gray-600 pe-7'>
                Autentificarea cu doi factori adaugă un nivel suplimentar de securitate contului dvs. Pentru a vă conecta, în plus, va trebui să furnizați un cod din 6 cifre.
                </div>
              </div>
              <a
                href='#'
                className='btn btn-primary px-6 align-self-center text-nowrap'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_two_factor_authentication'
              >
                Activează
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SignInMethod}
