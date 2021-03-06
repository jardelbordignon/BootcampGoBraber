import { InputHTMLAttributes, useEffect, useState, useRef, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import theme from '../../styles/theme.json'
import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string // possui todos os atributos de um input porém o nome é obrigatório
  icon: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => setIsFocused(true), [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
    setIsFilled(!!inputRef.current?.value)
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}

      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        placeholder=""
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color={theme.colors.danger} />
        </Error>
      )}

      {rest.placeholder && <span className="placeholder">{rest.placeholder}</span>}
    </Container>
  )
}

export default Input
