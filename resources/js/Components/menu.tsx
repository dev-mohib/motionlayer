import React, { useRef } from 'react'
import {  EyeIcon, EffectIcon, RotateClockIcon, RotateAnticlockIcon, 
  VerticalArrowIcon, HorizontalArrowIcon, PlayIcon, Pause, LayerIcon} from './icons'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { hideMenu,showMenu, enableAnimating, disableAnimating, setAnimationName, enableRecording, setEaseType, setAnimationDuration, setAnimationDelta, setTempLayers, setVideoLength } from '../state/store'
import { easeTypes } from '@/utils/animation'
import Effects from './Effects'
import View from './View'
import Layers from './Layers'
const mountedStyle = {
  animation: "inAnimation 250ms ease-in"
};
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards"
};

const TopMenuBar = () => {
  const menuContent = useRef(null)

  const dispatch = useAppDispatch()
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
return (
  <div className='fixed top-0 left-0 right-0 z-50'>
  <div className='w-full bg-gray-800 h-12 flex flex-row justify-between items-center p-0'>
    <img src='/logo_3.png' className="h-16 -mb-1" />
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