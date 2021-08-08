import React, { useEffect, useReducer, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'

import Context, {
  preloadedState,
  preloadedContext,
  reducer,
  View,
} from '@popup/store/store'
import { Channel, Theme } from '@src/shared/types'
import styled, { ThemeProvider, css } from 'styled-components'
import { GlobalStyles, themes, transition } from '@popup/styles'
import {
  Container,
  Header,
  Channels,
  Settings,
  Manager,
} from '@popup/components'

const Content = styled.div<{ settings: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 200%;
  overflow: hidden;
  height: 100%;
  background-color: ${(props) => props.theme.color.custom.content.background};
  ${(props) =>
    props.theme.transition('background-color', 'transform', 'height')};

  > *:first-child {
    ${(props) => props.theme.transition('opacity')};
  }

  ${(props) =>
    props.settings &&
    css`
      transform: translateX(-50%);

      > *:first-child {
        opacity: 0;
      }
    `}
`

const Footer = styled.div<{ settings: boolean }>`
  position: relative;
  overflow: hidden;
  border-top: 1px solid ${(props) => props.theme.color.border.normal};
  padding: 16px;
  ${(props) => props.theme.transition('border-color', 'height')};

  > div {
    ${(props) => props.theme.transition('transform')};
    transform: translateY(-31px);
  }

  ${(props) =>
    props.settings &&
    css`
      > div {
        transform: translateY(-2px);
      }
    `}
`

const Copyrights = styled.p`
  margin: 0 0 16px;
  text-align: center;
  font-size: 10px;
  color: ${(props) => props.theme.color.text.faded};
  ${(props) => props.theme.transition('color')};

  a {
    color: inherit;
    text-decoration: underline;
  }
`

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, preloadedState)
  const [prepare, setPrepare] = useState(false)

  useEffect(() => {
    browser.storage.local
      .get(['channels', 'theme'])
      .then(({ channels, theme }) => {
        if (Array.isArray(channels)) {
          dispatch({ type: 'INSERT_CHANNELS', payload: channels })
        }

        if (theme) {
          dispatch({ type: 'SET_THEME', payload: theme })
        }

        setTimeout(() => {
          setPrepare(true)
        }, 800)
      })
  }, [])

  const addChannel = (payload: Channel) => {
    dispatch({ type: 'ADD_CHANNEL', payload })
  }

  const removeChannel = (payload: Channel) => {
    dispatch({ type: 'REMOVE_CHANNEL', payload })
  }

  const activeChannel = (payload: Channel) => {
    dispatch({ type: 'ACTIVE_CHANNEL', payload })
  }

  const updateChannel = (payload: Channel) => {
    dispatch({ type: 'UPDATE_CHANNEL', payload })
  }

  const setTheme = (payload: Theme) => {
    dispatch({ type: 'SET_THEME', payload })
  }

  const setQuickBlock = (payload: boolean) => {
    dispatch({ type: 'SET_QUICKBLOCK', payload })
  }

  const setView = (payload: View) => {
    dispatch({ type: 'SET_VIEW', payload })
  }

  return (
    <Context.Provider
      value={{
        ...preloadedContext,
        ...state,
        addChannel,
        removeChannel,
        // @ts-ignore
        activeChannel,
        updateChannel,
        setTheme,
        setQuickBlock,
        setView,
      }}
    >
      <GlobalStyles />
      <ThemeProvider theme={{ ...themes[state.theme as Theme], transition }}>
        <Container settings={state.view === 'settings'}>
          <Header />
          <Content settings={state.view === 'settings'}>
            <Channels prepared={prepare} />
            <Settings />
          </Content>
          <Footer settings={state.view === 'settings'}>
            <div>
              <Copyrights>
                Coded by{' '}
                {/* @ts-ignore */}
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href="https://github.com/tyczynski" target="_blank">
                  PT
                </a>
                . Designed by{' '}
                {/* @ts-ignore */}
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href="https://kyosk.studio" target="_blank">
                  kyosk.studio
                </a>
              </Copyrights>
              <Manager />
            </div>
          </Footer>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App
