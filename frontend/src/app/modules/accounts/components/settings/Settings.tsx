import React from 'react'
import {ProfileDetails} from './cards/ProfileDetails'
import {SignInMethod} from './cards/SignInMethod'
import {ConnectedAccounts} from './cards/ConnectedAccounts'
import {EmailPreferences} from './cards/EmailPreferences'
import {Notifications} from './cards/Notifications'
import {DeactivateAccount} from './cards/DeactivateAccount'
import { Content } from '../../../../../_metronic/layout/components/Content'
import {useAuth, UserModel} from '../../../auth/index';

export function Settings() {
  const { currentUser } = useAuth();
  return (
    <Content>
      <ProfileDetails user={currentUser ?? {} as UserModel}/>
      <SignInMethod user={currentUser ?? {} as UserModel}/>
      {/*<ConnectedAccounts />*/}
      {/*<EmailPreferences />*/}
      <Notifications />
      <DeactivateAccount />
    </Content>
  )
}
