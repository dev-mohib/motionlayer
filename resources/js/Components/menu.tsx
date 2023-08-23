import React, { FormEvent, FormEventHandler, createRef, useEffect, useRef, useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import {  EyeIcon, EffectIcon, RotateClockIcon, RotateAnticlockIcon, 
  VerticalArrowIcon, HorizontalArrowIcon, PlayIcon, Pause, LayerIcon} from './icons'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { hideMenu,showMenu, enableAnimating, disableAnimating, setAnimationName, enableRecording, setEaseType, setAnimationDuration, setAnimationDelta, setTempLayers, setVideoLength } from '@/state/store'
import { easeTypes } from '@/utils/animation'
import Effects from './Effects'
import View from './View'
import Layers from './Layers'
import { getRecordedBlob, downloadRecording, recordedBlobs, sendPostRequest } from '@/utils/recording'
const mountedStyle = {
  animation: "inAnimation 250ms ease-in"
};
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards"
};

const TopMenuBar = () => {
  const menuContent = useRef(null)
  const dialogRef = createRef()
  const dispatch = useAppDispatch()
  const { countDown, isRecording } = useAppSelector(s=>s.editorReducer)
  const { isMenuOpened, openedMenu, isAnimating } = useAppSelector(s => s.editorReducer)
  const handleMenu = (option : string) => {
    if(openedMenu === option && isMenuOpened){
      dispatch(hideMenu())
      return
    }else {
      dispatch(hideMenu())
      setTimeout(() => {
        dispatch(showMenu(option))
      },300)
    }
  }

  useEffect(() => {
    if(countDown <= 0){
      setTimeout(() => {
        // @ts-ignore
        dialogRef.current.showModal()
        dispatch(disableAnimating())
      },200)
    }
  },[countDown, isRecording])
return (
  <div className='fixed top-0 left-0 right-0 z-50'>
  <Dialog ref={dialogRef}/>
  <div className='w-full bg-gray-800 h-12 flex flex-row justify-between items-center p-0'>
    <img src='/logo_3.png' className="h-16 -mb-1"/>
    <div className='flex flex-row text-white z-50'>
      <div className="relative inline-block text-left mx-2">
        <div className='flex flex-row text-white'>
          <span className='mx-2 cursor-pointer' onClick={()=> handleMenu('view')}>
            <EyeIcon width={23} height={23} /></span>
          <span className='mx-2 cursor-pointer' onClick={()=> handleMenu('play')}>
            {isAnimating ? 
            <Pause width={23} height={23} />
            :
            <PlayIcon width={23} height={23} />}
          </span>
          <span className='mx-2 cursor-pointer' onClick={()=> handleMenu('effects')}>
            <EffectIcon width={23} height={23} /></span>
          <span className='mx-2 cursor-pointer' onClick={()=> handleMenu('layers')}>
            <LayerIcon width={23} height={23} /></span>
        </div>
        {/* transition-opacity ease-out duration-300 delay-500 */}
        <div style={isMenuOpened ? mountedStyle : unmountedStyle}>
          <div ref={menuContent} className={`origin-top-right absolute right-0 mt-2 w-64 shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none bg-gray-700 rounded-md z-50`} role="menu" aria-orientation="vertical"
            aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1 " role="none">
              {
              openedMenu === 'layers' ?
              <Layers />
              :openedMenu === 'play' ?
              <Play />
              :openedMenu === 'view' ?
              <View />
              :openedMenu === 'effects'?
              <Effects />
              : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

const Dialog = React.forwardRef((props, ref) => {
  const [ title, settitle ] = useState('')
  const [dUrl, setUrl] = useState('#') 

  const handlePostRecording = (
    // e?: FormEvent<HTMLFormElement>
    ) => {
    // e.preventDefault()
    sendPostRequest(title, router)
    // const formData = new FormData()
    // formData.append('title', title)
    // formData.append('fileName', `video-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`)
    // const blobs = getRecordedBlob()
    // const file = new File([blobs], title + '.mp4')
    // // console.log({blobs : blobs.size})
    
    // formData.append('video', file)
    // formData.append('blobs', `${blobs.toString()}`)
    // formData.append('blobSize', `${blobs.size}`)
    // formData.append('fileSize', file.size.toString()??'No size available')
    // const values = formData.values.toString()
    // // window.alert(`
    // //   fileName => ${file.name}
    // //   fileSize => ${file.size}, 
    // //   `)
    // router.post('/video', formData)
  }

  const download = () => {
    var blob = new Blob(recordedBlobs, {
      type: 'video/mp4'
  });
    var fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'motionlayer.mp4'; // Change this to the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <dialog
      className=' bg-gray-800 rounded-lg shadow-xl'
      // @ts-ignore
      ref={ref}
    >
      <div className='text-white flex justify-between'>
          <h1 className='font-semibold text-base p-4'>Video Recorded</h1>
          <span className='cursor-pointer p-4' onClick={() => {
          // @ts-ignore
          ref.current.close()
        }}>X</span>
        </div>
        <div className='flex flex-col my-16 ml-8'>
          <form>
            <h1 className='font-normal text-white text-xl my-3'>Video recorded successfully. Select the action</h1>
            <div className="mb-4 w-1/2">
              {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label> */}
              <input value={title} onChange={e => settitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter Video Title(Optional)" required/>
            </div>
            <div className='self-end px-10 mt-16 flex'>
              <button className='btn btn-primary  mx-10' onClick={() => downloadRecording(title)}>Download</button>
              <input type='submit' onClick={handlePostRecording}  className='btn btn-success' value="Post Video"/>
            </div>
          </form>
          <button onClick={download} className='my-2 btn btn-primary w-32'>Download Test</button>
        </div>
    </dialog>
  )
})

const Play = () => {
  const { isAnimating, isEditing, animationDuration, animationDelta, animationName } = useAppSelector(s => s.editorReducer)
  const dispatch = useAppDispatch()
  return ( <div className='p-2'>
  <h2 className='font-semibold text-base'>Play</h2>
  <div onClick={() => {
    if(isEditing)
    dispatch(isAnimating ? disableAnimating() : enableAnimating())
    }} className='p-4 rounded bg-gradient-to-l from-teal-700 via-teal-500 to-blue-400 mx-1 px-2 mt-4 h-20 flex-col-center cursor-pointer'>
    {isAnimating ?
      <Pause className='hover:scale-125' width={30} height={30} />
      :
      <PlayIcon className='hover:scale-125' width={30} height={30} />
    }
  </div>
  <div className='flex flex-col py-2 rounded bg-slate-600 m-1 px-3 mt-4'>
    <div className='flex flex-row justify-start'>
      <div onClick={() => {
        if(animationName == 'RotateClock' || animationName == 'RotateAntiClock')
        dispatch(setAnimationName('TranslateH'))
      }} className={`flex-row-center w-full mr-1 rounded ${animationName == 'TranslateH' || animationName == 'TranslateV' ? 'bg-teal-700 font-bold px-4 py-1 cursor-pointer' : 'btn'}`}>Linear</div>
      <div onClick={() => {
        if(animationName == 'TranslateH' || animationName == 'TranslateV')
        dispatch(setAnimationName('RotateClock'))
      }} className={`flex-row-center w-full mr-1 rounded ${animationName == 'RotateClock' || animationName == 'RotateAntiClock' ? 'bg-teal-700 font-bold px-4 py-1 cursor-pointer' : 'btn'}`}>Circle</div>
    </div>

    <div className='flex-row-between mt-2'>
      <div className='ml-1 font-semibold text-base mt-3 mb-2'>Axis</div>
      {animationName == 'TranslateH'
      || animationName == 'TranslateV'
      ?<div className='flex-row-center'>
        <div onClick={() => dispatch(setAnimationName('TranslateV'))} 
        className={`${animationName == 'TranslateV' ? 'bg-teal-700' : 'bg-teal-800 hover:bg-teal-700'} cursor-pointer py-2 px-3 rounded mr-1`}>
          <VerticalArrowIcon />
        </div>
        <div onClick={() => dispatch(setAnimationName('TranslateH'))} 
        className={`${animationName == 'TranslateH' ?  'bg-teal-700' : 'bg-teal-800 hover:bg-teal-700'} cursor-pointer py-2 px-3 rounded ml-1`}>
          <HorizontalArrowIcon />
        </div>
      </div>
      :
      <div className='flex-row-center'>
        <div onClick={() => dispatch(setAnimationName('RotateAntiClock'))} 
        className={`${animationName == 'RotateAntiClock' ? 'bg-teal-700' :  'bg-teal-800 hover:bg-teal-700'} cursor-pointer py-2 px-3 rounded mr-1`}>
          <RotateAnticlockIcon />
        </div>
        <div onClick={() => dispatch(setAnimationName('RotateClock'))} 
        className={`${animationName == 'RotateClock' ? 'bg-teal-700':'bg-teal-800 hover:bg-teal-700'} cursor-pointer py-2 px-3 rounded mr-1`}>
          <RotateClockIcon />
        </div>
      </div>}
    </div>

    <h2 className='font-semibold text-base mt-3 mb-2'>Ease Type</h2>
    <select onChange={(e) => dispatch(setEaseType(e.target.value))}>
      {easeTypes.map((ease, index) => <option key={index} value={ease}>{ease}</option>)}
    </select>
    <div>
      <div className='w-full bg-white rounded-full my-1' style={{height : '1px'}} />
      <label htmlFor="speed-range" className="block mt-2 text-sm font-medium text-white dark:text-gray-300 flex-row-between pr-2">Delay <span>{animationDuration} ms</span></label>
      <input value={animationDuration} onChange={(e) => dispatch(setAnimationDuration(parseInt(e.target.value)))} type="range" step={100} max={2000} min={400} className="w-full h-2 gradient rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      {/*  Line */}
      <div className='w-full bg-white rounded-full my-1' style={{height : '1px'}} />
      <label htmlFor="radius-range" className="block mt-2 text-sm font-medium text-white dark:text-gray-300 flex-row-between">Change <span>{animationDelta}</span></label>
      <input value={animationDelta} type="range" onChange={e => dispatch(setAnimationDelta(parseInt(e.target.value)))} step={5} max={100} min={20} className="w-full h-2 gradient rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      {/* Line */}
      <div className='w-full bg-white rounded-full my-2' style={{height : '1px'}} />
    </div>
  </div>
  
</div>)
}



export default TopMenuBar