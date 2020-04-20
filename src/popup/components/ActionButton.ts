import styled from 'styled-components';

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 0;
  padding: 0;
  border-radius: 100%;
  background-color: ${props =>
    props.theme.type === 'light' ? '#e8e8e8' : props.theme.color.custom.badge.background};
  cursor: pointer;
  ${props => props.theme.transition('background-color')};

  .stroke {
    stroke: #626066;
    ${props => props.theme.transition('stroke')};
  }

  .fill {
    fill: #626066;
    ${props => props.theme.transition('fill')};
  }

  &:hover {
    background-color: ${props => props.theme.color.states.red};

    .stroke {
      stroke: #fff;
    }

    .fill {
      fill: #fff;
    }
  }
`;

export default ActionButton;
