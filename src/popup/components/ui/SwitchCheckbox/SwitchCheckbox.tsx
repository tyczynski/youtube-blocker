import React from 'react'
import {
  Input,
  Switch,
  Background,
  Indicator,
  Container,
} from './SwitchCheckbox.style'

interface SwitchCheckboxProps {
  checked: boolean
  onChange: (state: boolean) => void
}

export const SwitchCheckbox: React.FC<SwitchCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <Container $checked={checked}>
      <Input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      <Switch>
        <Background />
        <Indicator />
      </Switch>
    </Container>
  )
}
