import React, { FC, SVGProps } from 'react'

export const GridIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" 
    className="hover:text-gray-600 cursor-grabbing" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10h4v4H7zm0-6h4v4H7zm0 12h4v4H7zm6-6h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z">
        </path>
    </svg>
  )
}
