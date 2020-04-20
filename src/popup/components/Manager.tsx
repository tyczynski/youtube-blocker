import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { BaseButton } from '@popup/components';
import Context from '@popup/store/store';
import IModifierSign from '@popup/assets/icons/IModifierSign';
import GModifierSign from '@popup/assets/icons/GModifierSign';
import { Info as InfoIcon } from '@popup/assets/icons';
import { modes, modifiers } from '@src/shared/data';
import { Channel, Modifier, Mode } from '@src/shared/types';

const Form = styled.form`
  display: block;
`;

const Button = styled(BaseButton)`
  border-radius: 2px;
  background-color: ${props => props.theme.color.states.red};
  color: #fff;
  ${props => props.theme.transition('background-color')};
`;

const Group = styled.div`
  position: relative;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.color.border.normal};
  background-color: ${props => props.theme.color.background.accent};
  ${props => props.theme.transition('background-color', 'border-color')};
`;

const TypesGroup = styled(Group)`
  display: flex;
  margin: 0 0 5px;
  height: 22px;
`;

const TypeButton = styled(BaseButton)<{ active: boolean }>`
  margin: 0 8px;
  height: 100%;
  color: ${props => props.theme.color.text.faded};
  ${props => props.theme.transition('color')};

  ${({ active }) =>
    active &&
    css`
      color: ${props => props.theme.color.states.red};
    `}
`;

const InputGroup = styled(Group)`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0 8px;
  height: 36px;
`;

const Input = styled.input<{ monospace: boolean }>`
  width: 100%;
  height: 100%;
  font-size: 12px;
  outline: none;
  background: none;
  border: none;
  padding: 0 8px;
  text-overflow: ellipsis;
  color: ${props => props.theme.color.text.normal};
  ${props => props.theme.transition('color', 'letter-spacing')};

  ${({ monospace }) =>
    monospace &&
    css`
      font-family: monospace;
      letter-spacing: 0.5;
    `}

  &::placeholder {
    color: ${props => props.theme.color.text.faded};
    opacity: 1;
    ${props => props.theme.transition('color')};
  }
`;

const Submit = styled(Button)`
  font-size: 12px;
  padding: 5px 10px;
  margin: 0 4px 0 0;
  ${props => props.theme.transition('opacity')};

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Underline = styled.span`
  position: absolute;
  width: 0;
  height: 1px;
  background-color: ${props => props.theme.color.states.red};
  bottom: 0;
  left: 0;
  ${props => props.theme.transition('width', 'transform')};
`;

const Modifier = styled(BaseButton)<{ active: boolean }>`
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  overflow: hidden;
  line-height: 0;
  border: 1px solid ${props => props.theme.color.states.red};
  ${props => props.theme.transition('background-color', 'border-color', 'color')};

  svg {
    display: block;
    fill: ${props => props.theme.color.text.faded};
    transition: fill 0.3s ease;
  }

  ${props =>
    props.active &&
    css`
      background-color: ${props => props.theme.color.states.red};

      svg {
        fill: #fff;
      }
    `}
`;

const Modifiers = styled.div`
  display: flex;
  height: 16px;

  ${Modifier} {
    margin: 0 4px 0 0;

    &:last-child {
      margin: 0;
    }
  }
`;

const InfoButton = styled.a`
  position: absolute;
  display: block;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;

  svg {
    display: block;
  }
`;

const initModifiers = {
  caseInsensitive: false,
  global: false,
};
const defaultMode = modes[0] as Mode;
const modifierSign = {
  caseInsensitive: 'i',
  global: 'g',
};

const modifierIcon = {
  caseInsensitive: IModifierSign,
  global: GModifierSign,
};

const Manager: React.FC = () => {
  const store = useContext(Context);
  const [entryMode, setMode] = useState<Mode>(defaultMode);
  const [entryValue, setValue] = useState('');
  const [entryModifiers, setModifiers] = useState(initModifiers);

  const typesUnderlineRef = useRef(null);
  const inputRef = useRef(null);
  const typesRefs: (HTMLButtonElement | null)[] = [];
  const isRegex = entryMode === 'regex';
  const modifiersLetters = modifiers
    .filter(m => entryModifiers[m])
    .map(m => modifierSign[m])
    .join('');

  const moveTypeUnderline = (index: number) => {
    if (typesUnderlineRef.current !== null && index > -1) {
      typesUnderlineRef.current.style.width = `${typesRefs[index].offsetWidth}px`;
      typesUnderlineRef.current.style.transform = `translateX(${typesRefs[index].offsetLeft}px)`;
    }
  };

  useEffect(() => {
    moveTypeUnderline(0);
  }, []);

  /**
   * Detect when a user wants to edit an existing channel
   * and fill in state from that channel.
   */
  useEffect(() => {
    if (store.active === null) {
      setValue('');
      setMode(defaultMode);
      moveTypeUnderline(0);
    } else {
      setValue(store.active.value);
      setModifiers(store.active.modifiers);
      handleTypeClick(store.active.mode);
      inputRef.current.focus();
    }
  }, [store.active]);

  /**
   * Place the cursor in 2nd place for better UX when it
   * starts to type the channel name in "regex" mode.
   */
  useEffect(() => {
    if (isRegex && entryValue.length === 1) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(2, 2);
    }
  }, [entryValue.length]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (entryValue.length === 0) return;

    const data: Channel = {
      mode: entryMode,
      modifiers: entryModifiers,
      value: entryValue,
    };

    if (store.active) {
      store.updateChannel(data);
    } else {
      store.addChannel(data);
    }

    resetState();
  };

  const handleTypeClick = (type: Mode) => {
    setMode(type);
    moveTypeUnderline(modes.findIndex(current => current === type));
  };

  /**
   * Reset state to default values
   */
  const resetState = () => {
    setValue('');
    setMode(defaultMode);
    setModifiers(initModifiers);
    moveTypeUnderline(0);
  };

  const handleInputChange = (value: string) => {
    if (isRegex && value.length > 1) {
      const match = value.match(new RegExp('^/(.*)/' + modifiersLetters + '$'));

      if (match !== null) {
        setValue(match[1]);
      }
    } else {
      setValue(value);
    }
  };

  const toggleModifier = (modifier: 'global' | 'caseInsensitive') => {
    setModifiers(prevState => ({
      ...prevState,
      [modifier]: !prevState[modifier],
    }));
  };

  const inputValue = (() => {
    if (isRegex && entryValue.length > 0) {
      return `/${entryValue}/${modifiersLetters}`;
    }

    return entryValue;
  })();

  return (
    <Form onSubmit={handleSubmit}>
      <TypesGroup>
        {modes.map((mode, index) => (
          <TypeButton
            active={mode === entryMode}
            ref={node => (typesRefs[index] = node)}
            key={mode}
            onClick={() => handleTypeClick(mode)}
            type="button"
          >
            {mode}
          </TypeButton>
        ))}

        <Underline ref={typesUnderlineRef} />

        <InfoButton href="https://youtube-blocker.tyczynski.dev/#how-to-use">
          <InfoIcon />
        </InfoButton>
      </TypesGroup>

      <InputGroup>
        <Input
          monospace={entryMode === 'regex'}
          ref={inputRef}
          value={inputValue}
          placeholder={isRegex ? '/Channel name/gi' : 'Channel name'}
          onChange={({ target }) => handleInputChange(target.value)}
          type="text"
        />

        <Modifiers>
          {modifiers.map(modifier => (
            <Modifier
              key={modifier}
              active={entryModifiers[modifier]}
              type="button"
              onClick={() => toggleModifier(modifier)}
            >
              {modifierIcon[modifier]()}
            </Modifier>
          ))}
        </Modifiers>

        <Submit disabled={entryValue.length === 0} type="submit">
          {store.active ? 'Edit' : 'Block'}
        </Submit>
      </InputGroup>
    </Form>
  );
};

export default Manager;
