import React from 'react'
import Editor, {OnChange} from '@monaco-editor/react'
import styled, { css } from 'styled-components'

export interface EditorProps {
  darkMode?: boolean
  height?: string
  onChange?: OnChange
  value?: string
  defaultValue?: string
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
  ...props
}) => {
  return (
    <StyledEditor
      defaultLanguage="markdown"
      height={height}
      theme={darkMode ? "vs-dark" : "light"}
      darkMode={darkMode}
      {...props}
    />
  )
}
