import { useAgent } from '@credo-ts/react-hooks'
import { useStore, useContainer, TOKENS } from '@hyperledger/aries-bifold-core'
import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter } from 'react-native'

import { attestationCredDefIds } from '../constants'
import { AttestationMonitor, AttestationEventTypes } from '../services/attestation'
import { BCState } from '../store'

export interface AttestationX {
  start: () => Promise<void>
  stop: () => void
  loading: boolean
}

export const AttestationContext = createContext<AttestationX>(null as unknown as AttestationX)

type AttestationProviderParams = {
  children: React.ReactNode
}

export const AttestationProvider: React.FC<AttestationProviderParams> = ({ children }) => {
  const { agent } = useAgent()
  // const { t } = useTranslation()
  const [store] = useStore<BCState>()
  const container = useContainer()
  const logger = container.resolve(TOKENS.UTIL_LOGGER)
  const attestationInviteUrl = store.developer.environment.attestationInviteUrl
  const [loading, setLoading] = useState(false)
  let am: AttestationMonitor | undefined = undefined

  DeviceEventEmitter.addListener(AttestationEventTypes.Started, () => setLoading(true))
  DeviceEventEmitter.addListener(AttestationEventTypes.Completed, () => setLoading(false))
  DeviceEventEmitter.addListener(AttestationEventTypes.Failed, () => setLoading(false))

  useEffect(() => {
    if (!agent) {
      return
    }

    const options = {
      attestationInviteUrl,
      attestationCredDefIds,
    }

    am = new AttestationMonitor(agent, logger, options)
    am.start()
  }, [agent, logger, attestationInviteUrl, attestationCredDefIds])

  const start = async () => {
    if (!am) {
      return
    }

    await am.start()
  }

  const stop = () => {
    if (!am) {
      return
    }

    am.stop()
  }

  const value = {
    start,
    stop,
    loading,
  }

  return <AttestationContext.Provider value={value}>{children}</AttestationContext.Provider>
}

export const useAttestation = () => {
  const attestationContext = useContext(AttestationContext)
  if (!attestationContext) {
    throw new Error('attestationContext must be used within a AttestationContextProvider')
  }

  return attestationContext
}
