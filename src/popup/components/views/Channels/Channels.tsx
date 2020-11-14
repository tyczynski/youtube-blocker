import React, { useContext } from 'react'
import Context from '@popup/store/store'
import { ChannelItem, Skeleton, NoItems } from './components'
import { Container, List } from './Channels.style'

/**
 * Displays list of blocked channels
 */
export const ChannelsView: React.FC<{ prepared: boolean }> = ({ prepared }) => {
  const store = useContext(Context)

  if (!prepared) {
    return <Skeleton />
  }

  return (
    <Container>
      {store.channels.length ? (
        <List>
          {store.channels.map((channel) => (
            <ChannelItem key={channel.value} channel={channel} />
          ))}
        </List>
      ) : (
        <NoItems />
      )}
    </Container>
  )
}
