import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import Context from '@popup/store/store';
import { Cog, Cross, Logo } from '@popup/assets/icons';
import IconButton from './IconButton';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.color.border.normal};
  ${props => props.theme.transition('border-color')};
`;

const Button = styled(IconButton)<{ transformed: boolean }>`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;

  span {
    display: inline-flex;
    width: 100%;
    height: 100%;
    padding: 4px;
    ${props => props.theme.transition('transform')};
  }

  svg {
    position: absolute;
    fill: #626066;
    left: 50%;
    top: 50%;
    ${props => props.theme.transition('opacity')};

    &:first-child {
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    &:last-child {
      transform: translate(-50%, calc(-50% + 14px));
      opacity: 0;
    }
  }

  ${props =>
    props.transformed &&
    css`
      svg {
        &:first-child {
          opacity: 0;
        }

        &:last-child {
          opacity: 1;
        }
      }

      span {
        transform: translateY(calc(-100% + 2px));
      }
    `}
`;

const Header: React.FC = () => {
  const store = useContext(Context);
  const theme = useContext(ThemeContext);
  const view = store.view === 'channels' ? 'settings' : 'channels';

  return (
    <Container>
      <Logo color={store.theme === 'dark' ? '#fff' : theme.color.text.normal} />
      <Button transformed={store.view === 'settings'} onClick={() => store.setView(view)}>
        <span>
          <Cog />
          <Cross />
        </span>
      </Button>
    </Container>
  );
};

export default Header;
