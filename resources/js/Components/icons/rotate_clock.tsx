import React, { FC, SVGProps } from 'react'

export const RotateClockIcon: FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" 
    stroke-linejoin="round" 
    height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10">
        </path>
    </svg>
  )
}
