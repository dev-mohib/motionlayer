import React, { FC, SVGProps } from 'react'

export const DownloadIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" 
    height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg"
    >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
    </svg>
  )
}

