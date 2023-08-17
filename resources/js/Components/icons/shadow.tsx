import React, { FC, SVGProps } from 'react'

export const ShadowIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" 
    color="white" height="48" width="48" xmlns="http://www.w3.org/2000/svg" style={{color: "white"}}>
        <path d="M20 4V16H22V2H8V4H20Z" fill="currentColor"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8V22H16V8H2ZM14 10H4V20H14V10Z" fill="currentColor">
        </path>
        <path d="M17 7H5V5H19V19H17V7Z" fill="currentColor">
        </path>
    </svg>
  )
}
