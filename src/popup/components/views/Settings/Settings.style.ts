import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 8px;
`

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const ListItem = styled.li`
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

export const Separator = styled.hr`
  margin: 8px 16px;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.color.border.normal};
  ${(props) => props.theme.transition('border-color')};
`
