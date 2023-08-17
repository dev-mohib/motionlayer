import React, { useRef, useState } from 'react'
import { BoxIcon } from './icons'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { hideMenu, enableRecording,setVideoLength } from '@/state/store'
import { startRecording } from '@/utils/recording'


const View = () => {
    const { videoLength, isRecording, isEditing } = useAppSelector(s => s.editorReducer)
    const dispatch = useAppDispatch()
    return(
    <div className='p-2'>
      <h2 className='font-semibold text-base'>View</h2>
      <div className='p-4 rounded bg-slate-600 mx-1 px-2 mt-4 py-2'>
        <label htmlFor="speed-range" className="block mb-1 text-sm font-medium text-white dark:text-gray-300 flex-row-between pr-3">Auto Save In <span>{videoLength}s</span></label>
        <input value={videoLength} onChange={e => 
          dispatch(setVideoLength(parseInt(e.target.value)))
          } step={5} min={5} max={40} type="range"  className="w-full h-2 bg-gradient-to-tl from-gray-700 to-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        {/*  Line */}
        <div className='w-full bg-white rounded-full my-1' style={{height : '1px'}} />
        {
        !isRecording && <button onClick={() => {
          if(!isEditing)
          return
          dispatch(hideMenu())
          dispatch(enableRecording())
          startRecording()
        }} className='btn w-full'>Record</button>
      }
        {/* Line */}
      </div>
      <div className='flex-row-center btn w-full rounded mx-1 my-3'>
        <BoxIcon className='mr-1' /> Full Screen
      </div>
      
    </div>)
  }
  


export default View