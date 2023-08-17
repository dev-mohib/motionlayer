import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { addLayer, disableRecording, enableEditing, hideMenu } from '@/state/store'
import TopMenuBar from '@/Components/menu'
import Fabric from './fabric/canvas'
import UploadView from './upload_view'

import { saveRecording } from '@/utils/recording'


const Editor = () => {
  const dispatch = useAppDispatch()
  const { isRecording, isEditing, layers, bgColor } = useAppSelector(state => state.editorReducer)
  var _added = false
  // TODO: Test Hook : Remove in Production
  // useEffect(() => {
  //   if(!_added){
  //     images.map((l, i) => dispatch(addLayer({index : i, url : l,name : "leave_"+i })))
  //     dispatch(enableEditing())
  //   }
  //   _added = true
  // },[])

  return (
    <div className=' min-h-screen' 
    style={{backgroundColor : bgColor}}
    >
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
  const dispatch = useAppDispatch()
  const { videoLength } = useAppSelector(s => s.editorReducer)
  const [countdown, setCountdown] = useState(0)
  useEffect(() => {
    var countDownTime = new Date().getTime() + (videoLength * 1000)
    var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownTime - now;
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setCountdown(seconds)
    if (distance < 0) {
      clearInterval(x);
      saveRecording()
      dispatch(disableRecording())
      setCountdown(0)
    }
  }, 1000);
},[])
  return (
    <div className='h-16 w-52 bg-gray-700 rounded z-50 absolute bottom-5 left-3 shadow-3xl border border-gray-600'>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row justify-start items-center h-16 px-5'>
          <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-700 opacity-75"></span>
          <span className='ml-3 text-white'>Recording...</span>
        </div>
        <div className='h-14 bg-red-700 my-1' style={{width : '2px'}} />
          <div className='h-16 w-12 flex-row-center cursor-pointer rounded-tr roundedbr'>
            {/* <CgPlayStopO size={24} className='play-icon' /> */}
            {countdown !== 0 && `${countdown}s`}
          </div>
      </div>
      </div>
  )
}

export default Editor