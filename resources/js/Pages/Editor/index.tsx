import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { hideMenu } from '@/state/store'
import TopMenuBar from '@/Components/menu'
import Fabric from './fabric/canvas'
import UploadView from './upload_view'
import { Head, usePage } from '@inertiajs/react'

const Editor = () => {
  const {message} = usePage().props
  // console.log({pageMsg : message})
  const dispatch = useAppDispatch()
  const { isRecording, isEditing, layers, bgColor } = useAppSelector(state => state.editorReducer)

  return (
    <div className=' min-h-screen' 
    style={{backgroundColor : bgColor}}
    >
      <Head title='Editor'/>
      <TopMenuBar />
      <div onClick={()  => dispatch(hideMenu())} className='h-screen'>
        {isEditing ? 
          <Fabric /> 
          :
          <UploadView />
        }
      </div>
    { isRecording && <Recording />}
    </div>
  )
}

const Recording = () => {
  const { countDown } = useAppSelector(s => s.editorReducer)
if(countDown > 0)
  return (
    <div className='h-16 w-52 bg-gray-700 rounded z-50 absolute bottom-5 left-3 shadow-3xl border border-gray-600'>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row justify-start items-center h-16 px-5'>
          <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-700 opacity-75"></span>
          <span className='ml-3 text-white'>Recording...</span>
        </div>
        <div className='h-14 bg-red-700 my-1' style={{width : '2px'}} />
          <div className='h-16 w-12 flex-row-center cursor-pointer rounded-tr roundedbr'>
            {countDown}s
          </div>
      </div>
      </div>
  )
  else return null
}

export default Editor