import { Link } from '@inertiajs/react'
import React from 'react'

const Index = () => {
  return (
    <div className='min-h-screen flex flex-col  justify-center items-center bg-gray-700'>
        <h1 className='text-3xl font-extrabold text-white'>Video Data Cleaned </h1>
        <h1 className='text-3xl font-extrabold text-blue-300 hover:underline'>
          <Link href={route('video.index')}>Go Home</Link>
        </h1>
    </div>
  )
}

export default Index