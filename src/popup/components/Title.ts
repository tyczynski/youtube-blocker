import styled, { css } from 'styled-components';

const Title = styled.h2<{ monospace?: boolean }>`
  font-size: 12px;
  font-weight: 400;
  margin: 0 5px 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.theme.color.text.faded};
  ${props => props.theme.transition('color', 'letter-spacing')};

  ${props =>
    props.monospace &&
    css`
      font-family: monospace;
      letter-spacing: 0.1px;
    `}
`;

export default Title;
