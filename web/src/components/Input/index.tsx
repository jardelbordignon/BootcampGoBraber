import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string // possui todos os atributos de um input porém o nome é obrigatório
  icon: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      { Icon && <Icon size={20} /> }
      <input defaultValue={defaultValue} ref={inputRef} {...rest} placeholder='' />
      <span>{rest.placeholder}</span>
    </Container>
  )
}

export default Input
