import React, { useContext } from 'react'
import styled from 'styled-components'
import Context from '@popup/store/store'
import { browser } from 'webextension-polyfill-ts'
import { ActionButton, Title } from '@popup/components'
import { SwitchCheckbox } from '@popup/components/ui'
import { Export, Import } from '@popup/assets/icons'
import { exportData } from '@popup/store'

const Container = styled.div`
  width: 100%;
  padding: 8px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px 16px;

  &:hover {
    h2 {
      color: ${(props) => props.theme.color.text.normal};
    }
  }
`

const Separator = styled.hr`
  margin: 8px 16px;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.color.border.normal};
  ${(props) => props.theme.transition('border-color')};
`

const Settings: React.FC = () => {
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

export default Settings
