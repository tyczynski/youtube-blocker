import React, { useContext } from 'react'
import Context from '@popup/store/store'
import { browser } from 'webextension-polyfill-ts'
import { ActionButton, Title } from '@popup/components'
import { SwitchCheckbox } from '@popup/components/ui'
import { Export, Import } from '@popup/assets/icons'
import { exportData } from '@popup/store'
import { Container, List, ListItem, Separator } from './Settings.style'

export const SettingsView: React.FC = () => {
  const store = useContext(Context)
  const isDark = store.theme === 'dark'
  const isQuickBlock = store.quickblock

  return (
    <Container>
      <List>
        <ListItem onClick={() => exportData()}>
          <Title>Export data</Title>
          <ActionButton>
            <Export />
          </ActionButton>
        </ListItem>
        <ListItem onClick={() => browser.runtime.openOptionsPage()}>
          <Title>Import data</Title>
          <ActionButton>
            <Import />
          </ActionButton>
        </ListItem>
      </List>
      <Separator />
      <List>
        <ListItem>
          <Title>Dark mode</Title>
          <SwitchCheckbox
            checked={isDark}
            onChange={(value: boolean) => {
              store.setTheme(value ? 'dark' : 'light')
            }}
          />
        </ListItem>
        <ListItem>
          <Title>Show "quick block" button</Title>
          <SwitchCheckbox
            checked={isQuickBlock}
            onChange={(value: boolean) => {
              store.setQuickBlock(value)
            }}
          />
        </ListItem>
      </List>
    </Container>
  )
}
