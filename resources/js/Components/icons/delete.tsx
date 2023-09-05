import React, { FC, SVGProps } from 'react'

export const DeleteIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" 
        height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path>
    </svg>
  )
}

