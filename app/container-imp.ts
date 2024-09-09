import { BaseLogger } from '@credo-ts/core'
import { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'
import {
  Container,
  TOKENS,
  TokenMapping,
  ReducerAction,
  loadLoginAttempt,
  LocalStorageKeys,
  PreferencesState,
  MigrationState,
  ToursState,
  OnboardingState,
  DispatchAction,
  Stacks,
  Screens,
  testIdWithKey,
} from '@hyperledger/aries-bifold-core'
import { getProofRequestTemplates } from '@hyperledger/aries-bifold-verifier'
import { BrandingOverlayType, RemoteOCABundleResolver } from '@hyperledger/aries-oca/build/legacy'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TFunction } from 'react-i18next'
import { Config } from 'react-native-config'
import { DependencyContainer } from 'tsyringe'

import ledgers from './config/ledgers'
import AddCredentialButton from './src/components/AddCredentialButton'
import AddCredentialSlider from './src/components/AddCredentialSlider'
import EmptyList from './src/components/EmptyList'
import { PINValidationRules } from './src/constants'
import Developer from './src/screens/Developer'
import { pages } from './src/screens/OnboardingPages'
import Splash from './src/screens/Splash'
import Terms, { TermsVersion } from './src/screens/Terms'
import { BCLocalStorageKeys, BCState, DismissPersonCredentialOffer, IASEnvironment, initialState } from './src/store'

export interface AppState {
  showSurvey: boolean
}

export class AppContainer implements Container {
  private _container: DependencyContainer
  private log?: BaseLogger
  private t: TFunction<'translation', undefined>
  private navigate: (stack: never, params: never) => void

  public constructor(
    bifoldContainer: Container,
    t: TFunction<'translation', undefined>,
    navigate: (stack: never, params: never) => void,
    log?: BaseLogger
  ) {
    this._container = bifoldContainer.container.createChildContainer()
    this.log = log
    this.t = t
    this.navigate = navigate
  }

  public get container(): DependencyContainer {
    return this._container
  }

  public init(): Container {
    this.log?.info(`Initializing QC Wallet App container`)

    const qcLedgers: IndyVdrPoolConfig[] = ledgers

    const indyLedgers = this._container.resolve(TOKENS.UTIL_LEDGERS) satisfies IndyVdrPoolConfig[]
    const allLedgers = [...qcLedgers, ...indyLedgers]

    // Here you can register any component to override components in core package
    // Example: Replacing button in core with custom button
    this._container.registerInstance(TOKENS.UTIL_LEDGERS, allLedgers)
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING_PAGES, pages)
    this._container.registerInstance(TOKENS.SCREEN_TERMS, { screen: Terms, version: TermsVersion })
    this._container.registerInstance(TOKENS.SCREEN_SPLASH, Splash)
    this._container.registerInstance(TOKENS.CONFIG, {
      PINSecurity: { rules: PINValidationRules, displayHelper: true },
      settings: [
        {
          header: {
            title: this.t('Settings.MoreInformation'),
            icon: { name: 'info' },
          },
          data: [
            {
              title: this.t('Settings.TermsOfUse'),
              accessibilityLabel: this.t('Settings.TermsOfUse'),
              testID: testIdWithKey('TermsOfUse'),
              onPress: () => this.navigate(Stacks.SettingStack as never, { screen: Screens.Terms } as never),
            },
            {
              title: this.t('Settings.IntroductionToTheApp'),
              accessibilityLabel: this.t('Settings.IntroductionToTheApp'),
              testID: testIdWithKey('IntroductionToTheApp'),
              onPress: () => this.navigate(Stacks.SettingStack as never, { screen: Screens.Onboarding } as never),
            },
          ],
        },
      ],
      enableTours: true,
      supportedLanguages: ['en', 'fr'],
      showPreface: false,
      disableOnboardingSkip: true,
      showScanHelp: true,
      showScanButton: true,
      showDetailsInfo: true,
    })
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT, AddCredentialButton)
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_OPTIONS, AddCredentialSlider)
    this._container.registerInstance(TOKENS.COMPONENT_CRED_EMPTY_LIST, EmptyList)
    this._container.registerInstance(TOKENS.SCREEN_DEVELOPER, Developer)

    const resolver = new RemoteOCABundleResolver(Config.OCA_URL ?? '', {
      brandingOverlayType: BrandingOverlayType.Branding10,
    })
    this._container.registerInstance(TOKENS.UTIL_OCA_RESOLVER, resolver)
    this._container.registerInstance(TOKENS.UTIL_PROOF_TEMPLATE, getProofRequestTemplates)
    this._container.registerInstance(TOKENS.LOAD_STATE, async (dispatch: React.Dispatch<ReducerAction<unknown>>) => {
      const loadState = async <Type>(key: LocalStorageKeys | BCLocalStorageKeys, updateVal: (val: Type) => void) => {
        const data = await AsyncStorage.getItem(key)
        if (data) {
          const dataAsJSON = JSON.parse(data) as Type
          updateVal(dataAsJSON)
        }
      }

      let loginAttempt = initialState.loginAttempt
      let preferences = initialState.preferences
      let migration = initialState.migration
      let tours = initialState.tours
      let onboarding = initialState.onboarding
      let personCredOfferDissmissed = initialState.dismissPersonCredentialOffer
      let { environment } = initialState.developer

      await Promise.all([
        loadLoginAttempt().then((data) => {
          if (data) {
            loginAttempt = data
          }
        }),
        loadState<PreferencesState>(LocalStorageKeys.Preferences, (val) => (preferences = val)),
        loadState<MigrationState>(LocalStorageKeys.Migration, (val) => (migration = val)),
        loadState<ToursState>(LocalStorageKeys.Tours, (val) => (tours = val)),
        loadState<OnboardingState>(LocalStorageKeys.Onboarding, (val) => (onboarding = val)),
        loadState<DismissPersonCredentialOffer>(
          BCLocalStorageKeys.PersonCredentialOfferDismissed,
          (val) => (personCredOfferDissmissed = val)
        ),
        loadState<IASEnvironment>(BCLocalStorageKeys.Environment, (val) => (environment = val)),
      ])
      const state: BCState = {
        ...initialState,
        loginAttempt: { ...initialState.loginAttempt, ...loginAttempt },
        preferences: { ...initialState.preferences, ...preferences },
        migration: { ...initialState.migration, ...migration },
        tours: { ...initialState.tours, ...tours },
        onboarding: { ...initialState.onboarding, ...onboarding },
        dismissPersonCredentialOffer: { ...initialState.dismissPersonCredentialOffer, ...personCredOfferDissmissed },
        developer: {
          ...initialState.developer,
          environment,
        },
      }
      dispatch({ type: DispatchAction.STATE_DISPATCH, payload: [state] })
    })
    return this
  }

  public resolve<K extends keyof TokenMapping>(token: K): TokenMapping[K] {
    return this._container.resolve(token) as TokenMapping[K]
  }
  public resolveAll<K extends keyof TokenMapping, T extends K[]>(
    tokens: [...T]
  ): { [I in keyof T]: TokenMapping[T[I]] } {
    return tokens.map((key) => this.resolve(key)!) as { [I in keyof T]: TokenMapping[T[I]] }
  }
}
