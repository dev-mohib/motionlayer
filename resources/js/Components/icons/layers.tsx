import React, { FC, SVGProps } from 'react'

export const LayerIcon: FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" 
        height="23" width="23" xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"></path>
        <path d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"></path>
    </svg>
  )
}
