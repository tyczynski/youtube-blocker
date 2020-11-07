import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const Info: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <g fillRule="nonzero" fill="none">
        <rect
          fill={theme.color.background.normal}
          width="16"
          height="16"
          rx="2"
        />
        <g fill={theme.color.text.normal}>
          <circle cx="7.571" cy="11.549" r="1" />
          <path d="M7.571 4.015a2.413 2.413 0 00-2.41 2.41.603.603 0 101.205 0c0-.664.54-1.205 1.205-1.205s1.206.541 1.206 1.206c0 .664-.54 1.205-1.206 1.205a.603.603 0 00-.602.603V9.74a.603.603 0 101.205 0v-.98a2.415 2.415 0 001.808-2.335c0-1.33-1.081-2.41-2.41-2.41z" />
        </g>
      </g>
    </svg>
  )
}

export default Info
