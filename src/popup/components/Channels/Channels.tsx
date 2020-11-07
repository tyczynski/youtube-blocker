import React, { useContext } from 'react'
import styled from 'styled-components'
import Context from '@popup/store/store'
import { Skeleton } from '@popup/components'
import Item from './components/ListItem'
import NoItems from './components/NoItems'

const Items = styled.ul`
  display: block;
  padding: 8px;
  margin: 0;
  list-style: none;
  height: 100%;
  overflow: auto;
`

const List: React.FC<{ prepared: boolean }> = ({ prepared }) => {
  const store = useContext(Context)

  return (
    <>
      {store.channels.length || !prepared ? (
        <Items>
          {!prepared ? (
            <Skeleton />
          ) : (
            store.channels.map((channel) => (
              <Item key={channel.value} data={channel} />
            ))
          )}
        </Items>
      ) : (
        <NoItems />
      )}
    </>
  )
}

export default List
