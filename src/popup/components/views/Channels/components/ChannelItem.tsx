import React, { useContext } from 'react'
import Context from '@popup/store/store'
import { Pen } from '@popup/assets/icons'
import { ActionButton, Title } from '@popup/components'
import { Channel } from '@src/shared/types'
import { Container, Column, Badge, EditButton, Icon } from './ChannelItem.style'

interface ChannelItemProps {
  channel: Channel
}

export const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  const store = useContext(Context)
  const isActive = Boolean(store.active && channel.value === store.active.value)
  const isFaded = Boolean(store.active && channel.value !== store.active.value)
  const isRegex = channel.mode === 'regex'

  function handleActionClick() {
    if (isActive) {
      store.activeChannel(null)
    } else {
      store.removeChannel(channel)
    }
  }

  function handleEditClick() {
    store.activeChannel(channel)
  }

  return (
    <Container $faded={isFaded} $active={isActive}>
      <Column>
        <Title monospace={isRegex}>
          {isRegex ? `/${channel.value}/` : channel.value}
        </Title>
        <Badge>{channel.mode}</Badge>
      </Column>
      <Column>
        <EditButton $hidden={isActive} onClick={handleEditClick}>
          <Pen />
        </EditButton>
        <ActionButton onClick={handleActionClick}>
          <Icon
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="stroke"
              stroke="#000"
              strokeWidth="2"
              d={isActive ? 'M8,16 L16,8 M8,8 L16,16' : 'M7 12h10'}
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
            />
          </Icon>
        </ActionButton>
      </Column>
    </Container>
  )
}
