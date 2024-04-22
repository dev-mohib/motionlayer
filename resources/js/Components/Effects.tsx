import React from 'react'
import { LayerIcon, ThreeDIcon, TransformIcon } from './icons'
import { editorActions } from '@/state/store'
import { useAppSelector,useAppDispatch } from '@/state/hooks'

const Effects = () => {

    const { shadow, skew, isEditing, transformControls } = useAppSelector(s => s.editorReducer)
    const dispatch = useAppDispatch()
    return (
      <div className='p-2'>
        <h2 className='font-semibold text-base'>Effects</h2>
        <div className='p-4 rounded bg-slate-600 mx-1 px-2 mt-4 py-2'>
          <div className='flex flex-row justify-between px-3 items-center'>
            <TransformIcon width={25} height={25} color="white" />
            <div className='ml-5'>
              <h2 className='font-semibold text-lg text-gray-400'>Transformer</h2>
              <p className='font-extralight text-xs text-gray-400'>Adjust position, size and rotation of top layer</p>
            </div>
          </div>
          <div className='w-full bg-white rounded-full my-2' style={{height : '1px'}} />
          <div className='flex flex-row justify-between'>
            <span>Enable</span>
            <label className="switch">
              <input type="checkbox" checked={transformControls} onChange={(e) => {
                if(isEditing)
                dispatch(editorActions.setTransformControls(!transformControls))
                }} />
              <span className="slider round"></span>
            </label>
          </div>
          
        </div>
        
        <div className='p-4 rounded bg-slate-600 mx-1 px-2 mt-4 py-2'>
          <div className='flex flex-row justify-between px-3 items-center'>
              <LayerIcon width={25} height={25} color="white" />
              <div className='ml-5'>
                <h2 className='font-semibold text-lg text-gray-400'>Shadow</h2>
                <p className='font-extralight text-xs text-gray-400'>Add drop shadow for more realistic result</p>
              </div>
            </div>
        <div className='w-full bg-white rounded-full my-1' style={{height : '1px'}} />
        <div className='flex flex-row justify-between mt-3x'>
            <span>Enable</span>
            <label className="switch">
              <input type="checkbox" checked={shadow.enabled} onChange={(e) => {
                if(isEditing)
                dispatch(editorActions.setShadow({enabled : !shadow.enabled}))}} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
  
      </div>
    )
  }

export default Effects