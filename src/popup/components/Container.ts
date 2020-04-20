import styled from 'styled-components';

const Container = styled.div<{ settings: boolean }>`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 418px;
  overflow: hidden;
  color: ${props => props.theme.color.text.normal};
  background-color: ${props => props.theme.color.background.normal};
  ${props => props.theme.transition('color', 'background-color')};

  > * {
    &:nth-child(1) {
      height: 64px;
    }

    &:nth-child(2) {
      height: calc(100% - 64px - ${props => (props.settings ? '43px' : '96px')});
    }

    &:nth-child(3) {
      height: ${props => (props.settings ? '43px' : '96px')};
    }
  }
`;

export default Container;
