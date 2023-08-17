import React, { FC, SVGProps } from 'react'

export const Pause : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" 
    height="23" width="23" xmlns="http://www.w3.org/2000/svg">
        <path d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zm144 0h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z">
        </path>
    </svg>
  )
}
