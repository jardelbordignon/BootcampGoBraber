import styled, { css } from 'styled-components'

interface ToastProps {
  type?: 'info' | 'success' | 'error'
}

const toastVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`

export const Toast = styled.div<ToastProps>`
  display: flex;
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  margin-top: 8px;

  ${props => toastVariations[props.type || 'info']}

  > svg {
    margin-right: 12px;
  }

  > div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  > button {
    position: absolute;
    top: 18px;
    right: 15px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit; // usa a cor do container onde estiver inserido
  }

  > button:hover { opacity: 1; }
`
