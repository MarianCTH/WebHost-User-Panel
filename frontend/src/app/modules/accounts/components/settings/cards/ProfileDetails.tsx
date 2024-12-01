import React, { FC, useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { IProfileDetails } from '../SettingsModel'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { UserModel } from '../../../../auth/index';
import { UpdateProfileDetails } from '../../../core/UserProfile'
import { useAuth } from '../../../../auth/core/Auth'

const profileDetailsSchema = Yup.object().shape({
  fName: Yup.string().required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  country: Yup.string().required('Country is required'),
})

type Props = {
  user: UserModel
}

const ProfileDetails: FC<Props> = ({ user }) => {
  const initialValues: IProfileDetails = {
    userID: user.userId,
    avatar: user.pic || 'blank.png',
    fName: user.first_name,
    lName: user.last_name,
    company: user.companyName || '',
    contactPhone: user.phone || '',
    companySite: user.website || '',
    country: user.country || '',
    timeZone: user.timeZone || '',
    communications: {
      email: false,
      phone: false,
    },
  };
  const [data, setData] = useState<IProfileDetails>(initialValues)
  const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
    const updatedData = Object.assign(data, fieldsToUpdate)
    setData(updatedData)
  }

  const { updateCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false)
  const [errorUpdatingProfile, setErrorUpdatingProfile] = useState(false)
  const [isProfileUpdated, setIsProfileUpdated] = useState(false)
  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        values.communications.email = data.communications.email
        values.communications.phone = data.communications.phone
        const updatedData = Object.assign(data, values)
        setData(updatedData)
        try{
          UpdateProfileDetails(updatedData)
          setIsProfileUpdated(true)
          const newUser: UserModel = {
            userId: user.userId,
            username: user.username,
            password: user.password,
            email: user.email,
            first_name: updatedData.fName,
            last_name: updatedData.lName,
            pic: updatedData.avatar,
            phone: updatedData.contactPhone,
            companyName: updatedData.company,
            website: updatedData.companySite,
            country: updatedData.country,
            timeZone: updatedData.timeZone,
            role: user.role,
          }
          updateCurrentUser(newUser);
        }
        catch(e){
          console.log(e)
          setErrorUpdatingProfile(true)
        }
        setLoading(false)
      }, 1000)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Detalii Cont</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{ backgroundImage: `url(${toAbsoluteUrl('media/avatars/blank.png')})` }}
                >
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{ backgroundImage: `url(${toAbsoluteUrl('media/avatars/' + data.avatar)})` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Nume Complet</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Prenume'
                      {...formik.getFieldProps('fName')}
                    />
                    {formik.touched.fName && formik.errors.fName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.fName}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Nume de familie'
                      {...formik.getFieldProps('lName')}
                    />
                    {formik.touched.lName && formik.errors.lName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Companie</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Numele companiei'
                  {...formik.getFieldProps('company')}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span >Telefon de contact</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Număr de telefon'
                  {...formik.getFieldProps('contactPhone')}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span>Site companie</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Website-ul Companiei'
                  {...formik.getFieldProps('companySite')}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Țară</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('country')}
                >
                <option value=''>Selectează o țară...</option>
                <option value='Afghanistan'>Afghanistan</option>
                <option value='Aland Islands'>Aland Islands</option>
                <option value='Albania'>Albania</option>
                <option value='Algeria'>Algeria</option>
                <option value='American Samoa'>American Samoa</option>
                <option value='Andorra'>Andorra</option>
                <option value='Angola'>Angola</option>
                <option value='Anguilla'>Anguilla</option>
                <option value='Antarctica'>Antarctica</option>
                <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                <option value='Argentina'>Argentina</option>
                <option value='Armenia'>Armenia</option>
                <option value='Aruba'>Aruba</option>
                <option value='Australia'>Australia</option>
                <option value='Austria'>Austria</option>
                <option value='Azerbaijan'>Azerbaijan</option>
                <option value='Bahamas'>Bahamas</option>
                <option value='Bahrain'>Bahrain</option>
                <option value='Bangladesh'>Bangladesh</option>
                <option value='Barbados'>Barbados</option>
                <option value='Belarus'>Belarus</option>
                <option value='Belgium'>Belgium</option>
                <option value='Belize'>Belize</option>
                <option value='Benin'>Benin</option>
                <option value='Bermuda'>Bermuda</option>
                <option value='Bhutan'>Bhutan</option>
                <option value='Bolivia, Plurinational State of'>Bolivia, Plurinational State of</option>
                <option value='Bonaire, Sint Eustatius and Saba'>Bonaire, Sint Eustatius and Saba</option>
                <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                <option value='Botswana'>Botswana</option>
                <option value='Bouvet Island'>Bouvet Island</option>
                <option value='Brazil'>Brazil</option>
                <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
                <option value='Brunei Darussalam'>Brunei Darussalam</option>
                <option value='Bulgaria'>Bulgaria</option>
                <option value='Burkina Faso'>Burkina Faso</option>
                <option value='Burundi'>Burundi</option>
                <option value='Cambodia'>Cambodia</option>
                <option value='Cameroon'>Cameroon</option>
                <option value='Canada'>Canada</option>
                <option value='Cape Verde'>Cape Verde</option>
                <option value='Cayman Islands'>Cayman Islands</option>
                <option value='Central African Republic'>Central African Republic</option>
                <option value='Chad'>Chad</option>
                <option value='Chile'>Chile</option>
                <option value='China'>China</option>
                <option value='Christmas Island'>Christmas Island</option>
                <option value='Cocos'>Cocos</option>
                <option value='Colombia'>Colombia</option>
                <option value='Comoros'>Comoros</option>
                <option value='Congo'>Congo</option>
                <option value='Congo'>Congo</option>
                <option value='Cook Islands'>Cook Islands</option>
                <option value='Costa Rica'>Costa Rica</option>
                <option value='Croatia'>Croatia</option>
                <option value='Cuba'>Cuba</option>
                <option value='Curaçao'>Curaçao</option>
                <option value='Cyprus'>Cyprus</option>
                <option value='Czech Republic'>Czech Republic</option>
                <option value='Denmark'>Denmark</option>
                <option value='Djibouti'>Djibouti</option>
                <option value='Dominica'>Dominica</option>
                <option value='Dominican Republic'>Dominican Republic</option>
                <option value='Ecuador'>Ecuador</option>
                <option value='Egypt'>Egypt</option>
                <option value='El Salvador'>El Salvador</option>
                <option value='Equatorial Guinea'>Equatorial Guinea</option>
                <option value='Eritrea'>Eritrea</option>
                <option value='Estonia'>Estonia</option>
                <option value='Ethiopia'>Ethiopia</option>
                <option value='Faroe Islands'>Faroe Islands</option>
                <option value='Fiji'>Fiji</option>
                <option value='Finland'>Finland</option>
                <option value='France'>France</option>
                <option value='Gabon'>Gabon</option>
                <option value='Gambia'>Gambia</option>
                <option value='Georgia'>Georgia</option>
                <option value='Germany'>Germany</option>
                <option value='Ghana'>Ghana</option>
                <option value='Gibraltar'>Gibraltar</option>
                <option value='Greece'>Greece</option>
                <option value='Greenland'>Greenland</option>
                <option value='Grenada'>Grenada</option>
                <option value='Guadeloupe'>Guadeloupe</option>
                <option value='Guam'>Guam</option>
                <option value='Guatemala'>Guatemala</option>
                <option value='Guernsey'>Guernsey</option>
                <option value='Guinea'>Guinea</option>
                <option value='Guinea-Bissau'>Guinea-Bissau</option>
                <option value='Guyana'>Guyana</option>
                <option value='Haiti'>Haiti</option>
                <option value='Holy See'>Holy See</option>
                <option value='Honduras'>Honduras</option>
                <option value='Hong Kong'>Hong Kong</option>
                <option value='Hungary'>Hungary</option>
                <option value='Iceland'>Iceland</option>
                <option value='India'>India</option>
                <option value='Indonesia'>Indonesia</option>
                <option value='Iran'>Iran</option>
                <option value='Iraq'>Iraq</option>
                <option value='Ireland'>Ireland</option>
                <option value='Isle of Man'>Isle of Man</option>
                <option value='Israel'>Israel</option>
                <option value='Italy'>Italy</option>
                <option value='Jamaica'>Jamaica</option>
                <option value='Japan'>Japan</option>
                <option value='Jersey'>Jersey</option>
                <option value='Jordan'>Jordan</option>
                <option value='Kazakhstan'>Kazakhstan</option>
                <option value='Kenya'>Kenya</option>
                <option value='Kiribati'>Kiribati</option>
                <option value='Kuwait'>Kuwait</option>
                <option value='Kyrgyzstan'>Kyrgyzstan</option>
                <option value='Latvia'>Latvia</option>
                <option value='Lebanon'>Lebanon</option>
                <option value='Lesotho'>Lesotho</option>
                <option value='Liberia'>Liberia</option>
                <option value='Libya'>Libya</option>
                <option value='Liechtenstein'>Liechtenstein</option>
                <option value='Lithuania'>Lithuania</option>
                <option value='Luxembourg'>Luxembourg</option>
                <option value='Macao'>Macao</option>
                <option value='Macedonia'>Macedonia</option>
                <option value='Madagascar'>Madagascar</option>
                <option value='Malawi'>Malawi</option>
                <option value='Malaysia'>Malaysia</option>
                <option value='Maldives'>Maldives</option>
                <option value='Mali'>Mali</option>
                <option value='Malta'>Malta</option>
                <option value='Marshall Islands'>Marshall Islands</option>
                <option value='Martinique'>Martinique</option>
                <option value='Mauritania'>Mauritania</option>
                <option value='Mauritius'>Mauritius</option>
                <option value='Mayotte'>Mayotte</option>
                <option value='Mexico'>Mexico</option>
                <option value='Micronesia'>Micronesia</option>
                <option value='Moldova'>Moldova</option>
                <option value='Monaco'>Monaco</option>
                <option value='Mongolia'>Mongolia</option>
                <option value='Montenegro'>Montenegro</option>
                <option value='Montserrat'>Montserrat</option>
                <option value='Morocco'>Morocco</option>
                <option value='Mozambique'>Mozambique</option>
                <option value='Myanmar'>Myanmar</option>
                <option value='Namibia'>Namibia</option>
                <option value='Nauru'>Nauru</option>
                <option value='Nepal'>Nepal</option>
                <option value='Netherlands'>Netherlands</option>
                <option value='New Caledonia'>New Caledonia</option>
                <option value='New Zealand'>New Zealand</option>
                <option value='Nicaragua'>Nicaragua</option>
                <option value='Niger'>Niger</option>
                <option value='Nigeria'>Nigeria</option>
                <option value='Niue'>Niue</option>
                <option value='Norfolk Island'>Norfolk Island</option>
                <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
                <option value='Norway'>Norway</option>
                <option value='Oman'>Oman</option>
                <option value='Pakistan'>Pakistan</option>
                <option value='Palau'>Palau</option>
                <option value='Palestinian Territory'>Palestinian Territory</option>
                <option value='Panama'>Panama</option>
                <option value='Papua New Guinea'>Papua New Guinea</option>
                <option value='Paraguay'>Paraguay</option>
                <option value='Peru'>Peru</option>
                <option value='Philippines'>Philippines</option>
                <option value='Pitcairn'>Pitcairn</option>
                <option value='Poland'>Poland</option>
                <option value='Portugal'>Portugal</option>
                <option value='Puerto Rico'>Puerto Rico</option>
                <option value='Qatar'>Qatar</option>
                <option value='Réunion'>Réunion</option>
                <option value='Romania'>Romania</option>
                <option value='Russian Federation'>Russian Federation</option>
                <option value='Rwanda'>Rwanda</option>
                <option value='Saint Barthélemy'>Saint Barthélemy</option>
                <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                <option value='Saint Lucia'>Saint Lucia</option>
                <option value='Samoa'>Samoa</option>
                <option value='San Marino'>San Marino</option>
                <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                <option value='Saudi Arabia'>Saudi Arabia</option>
                <option value='Senegal'>Senegal</option>
                <option value='Serbia'>Serbia</option>
                <option value='Seychelles'>Seychelles</option>
                <option value='Sierra Leone'>Sierra Leone</option>
                <option value='Singapore'>Singapore</option>
                <option value='Sint Maarten'>Sint Maarten</option>
                <option value='Slovakia'>Slovakia</option>
                <option value='Slovenia'>Slovenia</option>
                <option value='Solomon Islands'>Solomon Islands</option>
                <option value='Somalia'>Somalia</option>
                <option value='South Africa'>South Africa</option>
                <option value='South Korea'>South Korea</option>
                <option value='South Sudan'>South Sudan</option>
                <option value='Spain'>Spain</option>
                <option value='Sri Lanka'>Sri Lanka</option>
                <option value='Sudan'>Sudan</option>
                <option value='Suriname'>Suriname</option>
                <option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option>
                <option value='Swaziland'>Swaziland</option>
                <option value='Sweden'>Sweden</option>
                <option value='Switzerland'>Switzerland</option>
                <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                <option value='Taiwan'>Taiwan</option>
                <option value='Tajikistan'>Tajikistan</option>
                <option value='Tanzania'>Tanzania</option>
                <option value='Thailand'>Thailand</option>
                <option value='Timor-Leste'>Timor-Leste</option>
                <option value='Togo'>Togo</option>
                <option value='Tokelau'>Tokelau</option>
                <option value='Tonga'>Tonga</option>
                <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                <option value='Tunisia'>Tunisia</option>
                <option value='Turkey'>Turkey</option>
                <option value='Turkmenistan'>Turkmenistan</option>
                <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
                <option value='Tuvalu'>Tuvalu</option>
                <option value='Uganda'>Uganda</option>
                <option value='Ukraine'>Ukraine</option>
                <option value='United Arab Emirates'>United Arab Emirates</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='United States'>United States</option>
                <option value='Uruguay'>Uruguay</option>
                <option value='Uzbekistan'>Uzbekistan</option>
                <option value='Vanuatu'>Vanuatu</option>
                <option value='Venezuela'>Venezuela</option>
                <option value='Vietnam'>Vietnam</option>
                <option value='Virgin Islands'>Virgin Islands</option>
                <option value='Wallis and Futuna'>Wallis and Futuna</option>
                <option value='Western Sahara'>Western Sahara</option>
                <option value='Yemen'>Yemen</option>
                <option value='Zambia'>Zambia</option>
                <option value='Zimbabwe'>Zimbabwe</option>
              </select>
              {formik.touched.country && formik.errors.country && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.country}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Fus orar</label>

            <div className='col-lg-8 fv-row'>
              <select
                className='form-select form-select-solid form-select-lg'
                {...formik.getFieldProps('timeZone')}
              >
                <option value=''>Selectează un fus orar...</option>
                <option value='International Date Line West'>
                  (GMT-11:00) International Date Line West
                </option>
                <option value='Midway Island'>(GMT-11:00) Midway Island</option>
                <option value='Samoa'>(GMT-11:00) Samoa</option>
                <option value='Hawaii'>(GMT-10:00) Hawaii</option>
                <option value='Alaska'>(GMT-08:00) Alaska</option>
                <option value='Pacific Time (US &amp; Canada)'>
                  (GMT-07:00) Pacific Time (US &amp; Canada)
                </option>
                <option value='Tijuana'>(GMT-07:00) Tijuana</option>
                <option value='Arizona'>(GMT-07:00) Arizona</option>
                <option value='Mountain Time (US &amp; Canada)'>
                  (GMT-06:00) Mountain Time (US &amp; Canada)
                </option>
                <option value='Chihuahua'>(GMT-06:00) Chihuahua</option>
                <option value='Mazatlan'>(GMT-06:00) Mazatlan</option>
                <option value='Saskatchewan'>(GMT-06:00) Saskatchewan</option>
                <option value='Central America'>(GMT-06:00) Central America</option>
                <option value='Central Time (US &amp; Canada)'>
                  (GMT-05:00) Central Time (US &amp; Canada)
                </option>
                <option value='Guadalajara'>(GMT-05:00) Guadalajara</option>
                <option value='Mexico City'>(GMT-05:00) Mexico City</option>
                <option value='Monterrey'>(GMT-05:00) Monterrey</option>
                <option value='Bogota'>(GMT-05:00) Bogota</option>
                <option value='Lima'>(GMT-05:00) Lima</option>
                <option value='Quito'>(GMT-05:00) Quito</option>
                <option value='Eastern Time (US &amp; Canada)'>
                  (GMT-04:00) Eastern Time (US &amp; Canada)
                </option>
                <option value='Indiana (East)'>(GMT-04:00) Indiana (East)</option>
                <option value='Caracas'>(GMT-04:00) Caracas</option>
                <option value='La Paz'>(GMT-04:00) La Paz</option>
                <option value='Georgetown'>(GMT-04:00) Georgetown</option>
                <option value='Atlantic Time (Canada)'>(GMT-03:00) Atlantic Time (Canada)</option>
                <option value='Santiago'>(GMT-03:00) Santiago</option>
                <option value='Brasilia'>(GMT-03:00) Brasilia</option>
                <option value='Buenos Aires'>(GMT-03:00) Buenos Aires</option>
                <option value='Newfoundland'>(GMT-02:30) Newfoundland</option>
                <option value='Greenland'>(GMT-02:00) Greenland</option>
                <option value='Mid-Atlantic'>(GMT-02:00) Mid-Atlantic</option>
                <option value='Cape Verde Is.'>(GMT-01:00) Cape Verde Is.</option>
                <option value='Azores'>(GMT) Azores</option>
                <option value='Monrovia'>(GMT) Monrovia</option>
                <option value='UTC'>(GMT) UTC</option>
                <option value='Dublin'>(GMT+01:00) Dublin</option>
                <option value='Edinburgh'>(GMT+01:00) Edinburgh</option>
                <option value='Lisbon'>(GMT+01:00) Lisbon</option>
                <option value='London'>(GMT+01:00) London</option>
                <option value='Casablanca'>(GMT+01:00) Casablanca</option>
                <option value='West Central Africa'>(GMT+01:00) West Central Africa</option>
                <option value='Belgrade'>(GMT+02:00) Belgrade</option>
                <option value='Bratislava'>(GMT+02:00) Bratislava</option>
                <option value='Budapest'>(GMT+02:00) Budapest</option>
                <option value='Ljubljana'>(GMT+02:00) Ljubljana</option>
                <option value='Prague'>(GMT+02:00) Prague</option>
                <option value='Sarajevo'>(GMT+02:00) Sarajevo</option>
                <option value='Skopje'>(GMT+02:00) Skopje</option>
                <option value='Warsaw'>(GMT+02:00) Warsaw</option>
                <option value='Zagreb'>(GMT+02:00) Zagreb</option>
                <option value='Brussels'>(GMT+02:00) Brussels</option>
                <option value='Copenhagen'>(GMT+02:00) Copenhagen</option>
                <option value='Madrid'>(GMT+02:00) Madrid</option>
                <option value='Paris'>(GMT+02:00) Paris</option>
                <option value='Amsterdam'>(GMT+02:00) Amsterdam</option>
                <option value='Berlin'>(GMT+02:00) Berlin</option>
                <option value='Bern'>(GMT+02:00) Bern</option>
                <option value='Rome'>(GMT+02:00) Rome</option>
                <option value='Stockholm'>(GMT+02:00) Stockholm</option>
                <option value='Vienna'>(GMT+02:00) Vienna</option>
                <option value='Cairo'>(GMT+02:00) Cairo</option>
                <option value='Harare'>(GMT+02:00) Harare</option>
                <option value='Pretoria'>(GMT+02:00) Pretoria</option>
                <option value='Bucharest'>(GMT+03:00) Bucharest</option>
                <option value='Helsinki'>(GMT+03:00) Helsinki</option>
                <option value='Kiev'>(GMT+03:00) Kiev</option>
                <option value='Kyiv'>(GMT+03:00) Kyiv</option>
                <option value='Riga'>(GMT+03:00) Riga</option>
                <option value='Sofia'>(GMT+03:00) Sofia</option>
                <option value='Tallinn'>(GMT+03:00) Tallinn</option>
                <option value='Vilnius'>(GMT+03:00) Vilnius</option>
                <option value='Athens'>(GMT+03:00) Athens</option>
                <option value='Istanbul'>(GMT+03:00) Istanbul</option>
                <option value='Minsk'>(GMT+03:00) Minsk</option>
                <option value='Jerusalem'>(GMT+03:00) Jerusalem</option>
                <option value='Moscow'>(GMT+03:00) Moscow</option>
                <option value='St. Petersburg'>(GMT+03:00) St. Petersburg</option>
                <option value='Volgograd'>(GMT+03:00) Volgograd</option>
                <option value='Kuwait'>(GMT+03:00) Kuwait</option>
                <option value='Riyadh'>(GMT+03:00) Riyadh</option>
                <option value='Nairobi'>(GMT+03:00) Nairobi</option>
                <option value='Baghdad'>(GMT+03:00) Baghdad</option>
                <option value='Abu Dhabi'>(GMT+04:00) Abu Dhabi</option>
                <option value='Muscat'>(GMT+04:00) Muscat</option>
                <option value='Baku'>(GMT+04:00) Baku</option>
                <option value='Tbilisi'>(GMT+04:00) Tbilisi</option>
                <option value='Yerevan'>(GMT+04:00) Yerevan</option>
                <option value='Tehran'>(GMT+04:30) Tehran</option>
                <option value='Kabul'>(GMT+04:30) Kabul</option>
                <option value='Ekaterinburg'>(GMT+05:00) Ekaterinburg</option>
                <option value='Islamabad'>(GMT+05:00) Islamabad</option>
                <option value='Karachi'>(GMT+05:00) Karachi</option>
                <option value='Tashkent'>(GMT+05:00) Tashkent</option>
                <option value='Chennai'>(GMT+05:30) Chennai</option>
                <option value='Kolkata'>(GMT+05:30) Kolkata</option>
                <option value='Mumbai'>(GMT+05:30) Mumbai</option>
                <option value='New Delhi'>(GMT+05:30) New Delhi</option>
                <option value='Sri Jayawardenepura'>(GMT+05:30) Sri Jayawardenepura</option>
                <option value='Kathmandu'>(GMT+05:45) Kathmandu</option>
                <option value='Astana'>(GMT+06:00) Astana</option>
                <option value='Dhaka'>(GMT+06:00) Dhaka</option>
                <option value='Almaty'>(GMT+06:00) Almaty</option>
                <option value='Urumqi'>(GMT+06:00) Urumqi</option>
                <option value='Rangoon'>(GMT+06:30) Rangoon</option>
                <option value='Novosibirsk'>(GMT+07:00) Novosibirsk</option>
                <option value='Bangkok'>(GMT+07:00) Bangkok</option>
                <option value='Hanoi'>(GMT+07:00) Hanoi</option>
                <option value='Jakarta'>(GMT+07:00) Jakarta</option>
                <option value='Krasnoyarsk'>(GMT+07:00) Krasnoyarsk</option>
                <option value='Beijing'>(GMT+08:00) Beijing</option>
                <option value='Chongqing'>(GMT+08:00) Chongqing</option>
                <option value='Hong Kong'>(GMT+08:00) Hong Kong</option>
                <option value='Kuala Lumpur'>(GMT+08:00) Kuala Lumpur</option>
                <option value='Singapore'>(GMT+08:00) Singapore</option>
                <option value='Taipei'>(GMT+08:00) Taipei</option>
                <option value='Perth'>(GMT+08:00) Perth</option>
                <option value='Irkutsk'>(GMT+08:00) Irkutsk</option>
                <option value='Ulaan Bataar'>(GMT+08:00) Ulaan Bataar</option>
                <option value='Seoul'>(GMT+09:00) Seoul</option>
                <option value='Osaka'>(GMT+09:00) Osaka</option>
                <option value='Sapporo'>(GMT+09:00) Sapporo</option>
                <option value='Tokyo'>(GMT+09:00) Tokyo</option>
                <option value='Yakutsk'>(GMT+09:00) Yakutsk</option>
                <option value='Darwin'>(GMT+09:30) Darwin</option>
                <option value='Adelaide'>(GMT+09:30) Adelaide</option>
                <option value='Canberra'>(GMT+10:00) Canberra</option>
                <option value='Melbourne'>(GMT+10:00) Melbourne</option>
                <option value='Sydney'>(GMT+10:00) Sydney</option>
                <option value='Brisbane'>(GMT+10:00) Brisbane</option>
                <option value='Hobart'>(GMT+10:00) Hobart</option>
                <option value='Vladivostok'>(GMT+10:00) Vladivostok</option>
                <option value='Guam'>(GMT+10:00) Guam</option>
                <option value='Port Moresby'>(GMT+10:00) Port Moresby</option>
                <option value='Solomon Is.'>(GMT+10:00) Solomon Is.</option>
                <option value='Magadan'>(GMT+11:00) Magadan</option>
                <option value='New Caledonia'>(GMT+11:00) New Caledonia</option>
                <option value='Fiji'>(GMT+12:00) Fiji</option>
                <option value='Kamchatka'>(GMT+12:00) Kamchatka</option>
                <option value='Marshall Is.'>(GMT+12:00) Marshall Is.</option>
                <option value='Auckland'>(GMT+12:00) Auckland</option>
                <option value='Wellington'>(GMT+12:00) Wellington</option>
                <option value="Nuku'alofa">(GMT+13:00) Nuku'alofa</option>
              </select>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Comunicări</label>

            <div className='col-lg-8 fv-row'>
              <div className='d-flex align-items-center mt-3'>
                <label className='form-check form-check-inline form-check-solid me-5'>
                  <input
                    className='form-check-input'
                    name='communication[]'
                    type='checkbox'
                    defaultChecked={data.communications?.email}
                    onChange={() => {
                      updateData({
                        communications: {
                          email: !data.communications?.email,
                          phone: data.communications?.phone,
                        },
                      })
                    }}
                  />
                  <span className='fw-bold ps-2 fs-6'>Email</span>
                </label>

                <label className='form-check form-check-inline form-check-solid'>
                  <input
                    className='form-check-input'
                    name='communication[]'
                    type='checkbox'
                    defaultChecked={data.communications?.phone}
                    onChange={() => {
                      updateData({
                        communications: {
                          email: data.communications?.email,
                          phone: !data.communications?.phone,
                        },
                      })
                    }}
                  />
                  <span className='fw-bold ps-2 fs-6'>Telefon</span>
                </label>
              </div>
            </div>
          </div>
          { errorUpdatingProfile && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>Ceva nu a mers bine, vă rugăm să încercați din nou !</div>
            </div>
          )}
          {isProfileUpdated ? (
          <div className='mb-lg-15 alert alert-success'>
            <div className='success-text font-weight-bold'>Profilul a fost actualizat cu success !</div>
          </div>
           ) : (
          <></>
          )}
      </div>

      <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {!loading && 'Salvează modificările'}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Se procesează...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
      </div >
    </div >
  )
}

export { ProfileDetails }
