/** @format */

import React, {createContext, useEffect, useState} from 'react'
import {Keyring} from '@polkadot/keyring'

export interface AccountsProviderData {
  accountList: AccountItem[]
  isExtensionInjected: boolean
}

export const AccountsContext = createContext<AccountsProviderData>({} as AccountsProviderData)

export const AccountsProvider: React.FC = ({children}) => {
  const [accountList, setAccountList] = useState<AccountItem[]>([])
  const [isExtensionInjected, setIsExtensionInjected] = useState<boolean>(false)
  const keyring = new Keyring()

  const injectExtension = async (): Promise<void> => {
    const {web3Enable} = await import('@polkadot/extension-dapp')
    const extensions = await web3Enable('next')
    if (extensions.length === 0) {
      return
    }

    setIsExtensionInjected(true)
  }

  const subscribeAccounts = async () => {
    const {web3AccountsSubscribe} = await import('@polkadot/extension-dapp')
    const account$ = web3AccountsSubscribe(accounts => {
      const accountsList = accounts.map(acc => {
        const publicKey = keyring.decodeAddress(acc.address)
        const encodedAddress = keyring.encodeAddress(publicKey, 44)
        return {
          address: encodedAddress,
          name: acc.meta.name
        }
      })
      setAccountList(accountsList as AccountItem[])
    })
  }

  useEffect(() => {
    setTimeout(() => {
      injectExtension()
    }, 100)
  }, [])

  useEffect(() => {
    isExtensionInjected && subscribeAccounts()
  }, [isExtensionInjected])

  useEffect(() => {
    if (
      (window as any).web3 &&
      (window as any).web3.currentProvider &&
      (window as any).web3.currentProvider.isComingWallet &&
      (window as any).web3.comingUserInfo
    ) {
      const account = JSON.parse((window as any).web3.comingUserInfo).address
      const name = JSON.parse((window as any).web3.comingUserInfo).name
      const publicKey = keyring.decodeAddress(account)
      const encodedAddress = keyring.encodeAddress(publicKey, 44)
      setAccountList([
        {
          address: encodedAddress,
          name: name
        }
      ])
    }
  })

  return (
    <AccountsContext.Provider
      value={{
        accountList,
        isExtensionInjected
      }}>
      {children}
    </AccountsContext.Provider>
  )
}
