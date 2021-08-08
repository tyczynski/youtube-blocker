/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { browser } from 'webextension-polyfill-ts'
import { Channel, Theme } from '@src/shared/types'

export type View = 'channels' | 'settings'

export interface State {
  view: View
  channels: Channel[]
  active: Channel | null
  theme: Theme
  quickblock: boolean
}

export interface ContextProps extends State {
  addChannel: (payload: Channel) => void
  removeChannel: (payload: Channel) => void
  activeChannel: (payload: Channel | null) => void
  updateChannel: (payload: Channel) => void
  setView: (payload: View) => void
  setTheme: (payload: Theme) => void
  setQuickBlock: (payload: boolean) => void
}

export interface Action {
  type: string
  payload: any
}

export const preloadedState: State = {
  view: 'channels',
  channels: [],
  active: null,
  theme: 'light',
  quickblock: true,
}

export const preloadedContext: ContextProps = {
  ...preloadedState,
  // @ts-ignore
  addChannel: () => {},
  // @ts-ignore
  removeChannel: () => {},
  // @ts-ignore
  activeChannel: () => {},
  // @ts-ignore
  updateChannel: () => {},
  // @ts-ignore
  setView: () => {},
  // @ts-ignore
  setTheme: () => {},
  // @ts-ignore
  setQuickBlock: () => {},
}

const setChannels = (channels: Channel[]) => {
  browser.storage.local.set({ channels })
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INSERT_CHANNELS':
      return {
        ...state,
        channels: action.payload,
      }
    case 'ADD_CHANNEL': {
      const { payload } = action
      const exists = Boolean(
        state.channels.find((item) => item.value === payload.value)
      )

      if (!exists) {
        const channels = [...state.channels, payload]
        setChannels(channels)

        return {
          ...state,
          channels,
        }
      }

      return state
    }
    case 'REMOVE_CHANNEL': {
      const { payload } = action
      const channels = state.channels.filter(
        (item) => payload.value !== item.value
      )

      setChannels(channels)

      return {
        ...state,
        channels,
      }
    }
    case 'ACTIVE_CHANNEL': {
      return {
        ...state,
        active: action.payload,
      }
    }
    case 'UPDATE_CHANNEL': {
      const { payload } = action
      const channels = state.channels.map((item) => {
        // @ts-ignore
        if (item.value === state.active.value) {
          return payload
        }

        return item
      })

      setChannels(channels)

      return {
        ...state,
        channels,
        active: null,
      }
    }
    case 'SET_THEME': {
      browser.storage.local.set({ theme: action.payload })

      return {
        ...state,
        theme: action.payload,
      }
    }
    case 'SET_QUICKBLOCK': {
      browser.storage.local.set({ quickblock: action.payload })

      return {
        ...state,
        quickblock: action.payload,
      }
    }
    case 'SET_VIEW': {
      return {
        ...state,
        view: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const Context = React.createContext<ContextProps>(preloadedContext)
export default Context
