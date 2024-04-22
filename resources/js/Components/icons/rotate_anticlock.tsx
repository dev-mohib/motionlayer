import React, { FC, SVGProps } from 'react'

export const RotateAnticlockIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" 
        strokeLinecap="round" strokeLinejoin="round" 
        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
    >
        <polyline points="1 4 1 10 7 10">
        </polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10">
        </path>
    </svg>
  )
}
