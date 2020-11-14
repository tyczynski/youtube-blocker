import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import Context from '@popup/store/store'
import IconButton from '@popup/components/IconButton'
import { Pen } from '@popup/assets/icons'
import { ActionButton, Title } from '@popup/components'
import { Channel } from '@src/shared/types'

const Col = styled.div`
  display: flex;
  align-items: center;
`

const Badge = styled.div`
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.custom.badge.background};
  color: ${(props) => props.theme.color.text.faded};
  ${(props) => props.theme.transition('color', 'background-color')};
`

const EditButton = styled(IconButton)<{ hidden: boolean }>`
  width: 12px;
  height: 12px;
  margin-right: 16px;
  ${(props) => props.theme.transition('transform', 'opacity')};

  ${({ hidden }) =>
    hidden &&
    css`
      transform: translate(15px);
      opacity: 0;
      pointer-events: none;
    `}

  svg {
    fill: ${(props) => (props.theme.type === 'light' ? '#d8d8d8' : '#626066')};
    ${(props) => props.theme.transition('fill')};
  }
`

const hover = css`
  h2 {
    color: ${(props) => props.theme.color.text.normal};
  }

  ${EditButton} {
    svg {
      fill: ${(props) =>
        props.theme.type === 'light' ? props.theme.color.text.faded : '#fff'};
    }
  }
`

const Container = styled.li<{ $faded: boolean; $active: boolean }>`
  --buttons-width: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;
  overflow: hidden;
  ${(props) => props.theme.transition('opacity', 'color')};

  ${Col}:first-child {
    width: calc(100% - var(--buttons-width));
    padding-right: 16px;
  }

  ${Col}:last-child {
    width: var(--buttons-width);
  }

  ${({ $faded }) =>
    $faded &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}

  ${({ $active }) => $active && hover}

  &:hover {
    ${hover}
  }
`

const Toggle: React.FC<{ active: boolean }> = ({ active }) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="stroke"
      stroke="#000"
      strokeWidth="2"
      d={active ? 'M8,16 L16,8 M8,8 L16,16' : 'M7 12h10'}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
    />
  </svg>
)

const Item: React.FC<{ data: Channel }> = ({ data }) => {
  const store = useContext(Context)
  const isActive = Boolean(store.active && data.value === store.active.value)
  const isFaded = Boolean(store.active && data.value !== store.active.value)
  const isRegex = data.mode === 'regex'

  const handleActionClick = () => {
    if (isActive) {
      store.activeChannel(null)
    } else {
      store.removeChannel(data)
    }
  }

  const handleEditClick = () => {
    store.activeChannel(data)
  }

  return (
    <Container $faded={isFaded} $active={isActive}>
      <Col>
        <Title monospace={isRegex}>
          {isRegex ? `/${data.value}/` : data.value}
        </Title>
        <Badge>{isRegex ? 'reg' : data.mode}</Badge>
      </Col>
      <Col>
        <EditButton hidden={isActive} onClick={handleEditClick}>
          <Pen />
        </EditButton>
        <ActionButton onClick={handleActionClick}>
          <Toggle active={isActive} />
        </ActionButton>
      </Col>
    </Container>
  )
}

export default Item
