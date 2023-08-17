import React, { FC, SVGProps } from 'react'

export const PlusIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" 
    aria-hidden="true" color="#fafafa" 
    height="24" width="24" xmlns="http://www.w3.org/2000/svg" style={{color: "rgb(250, 250, 250)"}}><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd">
        </path>
    </svg>
  )
}
