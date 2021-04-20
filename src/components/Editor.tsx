import React from 'react'
import Editor, { OnChange } from '@monaco-editor/react'
import styled, { css } from 'styled-components'
import StyledLabel from './StyledLabel'

export interface EditorProps {
  darkMode?: boolean
  height?: string
  onChange?: OnChange
  value?: string
  defaultValue?: string
  id: string
  labelColor?: string
  label: string
  required?: boolean
}

const StyledEditor = styled(Editor)<EditorProps>`
  ${({ darkMode }) =>
    !darkMode &&
    css`
      border: 1px solid black;
      border-radius: 4px;
      padding-top: 10px;
    `};
`

export const CustomEditor: React.FC<EditorProps> = ({
  height = '90vh',
  darkMode = true,
  labelColor = 'black',
  ...props
}) => {
  return (
    <>
      <StyledLabel labelColor={labelColor} htmlFor={props.id}>
        {`${props.label}${props.required ? '*' : ''}`}
      </StyledLabel>
      <StyledEditor
        required
        defaultLanguage="markdown"
        height={height}
        theme={darkMode ? 'vs-dark' : 'light'}
        darkMode={darkMode}
        {...props}
      />
    </>
  )
}
