/** @format */

import {useContext} from 'react'
import {AccountsContext, AccountsProviderData} from './AccountsProvider'

export function useAccounts(): AccountsProviderData {
  return useContext(AccountsContext)
}
