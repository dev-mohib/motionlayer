import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react'
import { PlusIcon } from './icons'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addLayer, setBgColor } from '@/state/store'
import Drggable from './dnd'




const Layers = () => {
    const dispatch = useAppDispatch()
    const { layers } = useAppSelector((s : any) => s.editorReducer)
    const hiddenFileInput = useRef(null)

    const handleAddLayer = (e : ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files
      if(file)
      dispatch(addLayer({name : file[0].name,url : URL.createObjectURL(file[0]), index : layers.length}))
    }
    return (
    <div className='p-2' style={{minHeight : '300px'}}>
      <div className='flex flex-row justify-between items-center'>
        <span className='font-semibold text-base'>Play</span>
        <button onClick={() => {
            const r : any = hiddenFileInput.current
            if(layers.length)
            r.click()
        }} className='flex-row-center items-center p-1 rounded-full bg-gradient-to-tl from-teal-600 to-gray-700 hover:from-gray-400 hover:to-teal-500'><PlusIcon color='#fafafa' width={25} height={25}/></button>
        <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleAddLayer}
            accept='image/png'
            style={{display: 'none'}}
            />
      </div>
      <div className='my-3'>
        <Drggable />
      </div>
      {/* Line */}
      <div className='w-full bg-gray-400 rounded-full my-1' style={{height : '1px'}} />
      <div className=' my-2 rounded-lg w-auto h-10 flex flex-row cursor-pointer bg-gray-900'>
        {/* <div className='bg-teal-800 w-1/4 h-10 rounded-tl-lg rounded-bl-lg' /> */}
        <input id="upload" type="color" onChange={(e : any) => {
          dispatch(setBgColor(e.target.value))
        }} className='w-1/4 h-10 bg-transparent rounded-tl-lg rounded-bl-lg' />
        <div className='bg-gray-900 w-3/4 h-10 rounded-tr-lg rounded-br-lg flex flex-row items-center justify-start pl-2 text-white'>
          Background
        </div>
      </div>
    </div>)
  }


  export default Layers