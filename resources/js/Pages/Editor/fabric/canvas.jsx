import React, { useEffect, useMemo, useState } from 'react'
import { fabric } from 'fabric'
import { useFabric } from '@/utils/hooks'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { animateLeftRight, animateOpacity, animateTopBottom, animateCircle,getObjectById } from './animations'
import { editorActions, setUtilLayers } from '@/state/store'
let tempArr = []

const Fabric = () => {
    const { canvas, objects } = useFabric('myCanvas')
    const [isReload, setRelaod] = useState(false)
    const dispatch = useAppDispatch()
    const { layers, bgColor, isAnimating, animationName, easeType,animationDelta,animationDuration,shadow, transformControls } = useAppSelector(state => state.editorReducer)
    const { layers : tmpLayers } = useAppSelector(s => s.utilReducer)

    useEffect(() => {
      if(canvas && layers)
      {
        canvas.clear()
        addLayers()
        setTimeout(() => {
          setRelaod(!isReload)
        },700)
      }
    },[canvas, layers])

    useMemo(() => {
      if(canvas){
        canvas.backgroundColor= bgColor;
        tmpLayers.map((layer, index) => {
          canvas.forEachObject(obj => {
            if(obj.layerId == layer.id){
              if(layer.stretch){
                obj.left = 0
                obj.top = 0
                obj.scaleX = canvas.width / obj.width
                obj.scaleY = canvas.height / obj.height
                obj.set('stretch', true)
              } else {
                obj.set('stretch', false)
              }
              obj.sendToBack()

              if(shadow.enabled){
                obj.shadow = new fabric.Shadow({color : `rgba(0,0,0,${layer.shadow})`, blur : 5, offsetX : -20, offsetY : 10})
              }else {
                obj.shadow = 0
              }
              obj.opacity = layer.opacity

              if(layer.animate){
                obj.isAnimate = true
              }else {
                obj.isAnimate = false
              }

              if(transformControls && index == 0){
                obj.selectable = true
                obj.hasControls = true
                canvas.setActiveObject(obj).renderAll();
              }else {
                obj.selectable = false
                obj.hasControls = false
                canvas.discardActiveObject().renderAll();
              }
            }
          })
        })  
  }
},[tmpLayers, bgColor, shadow, transformControls, isReload])
    useMemo(() => {
      fabric.runningAnimations.cancelAll()
      if(isAnimating){
        switch(animationName){
          case 'Fade':
            animateOpacity(objects(), canvas, easeType, animationDuration, animationDelta,tmpLayers)
            break;
          case 'TranslateH':
            animateLeftRight(objects(), canvas, easeType, animationDuration, animationDelta,tmpLayers,true)
            break;
          case 'TranslateV':
            animateTopBottom(objects(), canvas, easeType, animationDuration, animationDelta,tmpLayers, true)
            break;
          case 'RotateClock':
            animateCircle(objects(), canvas, easeType, animationDuration, animationDelta,tmpLayers, true)
            break;
          case 'RotateAntiClock':
            animateCircle(objects(), canvas, easeType, animationDuration,animationDelta,tmpLayers, false)
          default:
            return
        }
      }
    },[isAnimating, animationName, easeType, animationDelta, animationDuration]) 

  const addLayers = () => {
    tempArr = []
    const cw = canvas.width
    const ch = canvas.height
    layers.map((layer, _i) => {
      tempArr.push(
        {
          index : _i, name : 'layer_' + _i, id : 'layer-' + _i, 
          shadow : 0.8, url : layer.url, opacity : 1, 
          animate : true, stretch : false,
          rotation: layer.rotation,
          hasControls : layer.hasControls,
          isMirrored: layer.isMirrored
        })

      fabric.Image.fromURL(layer.url, (i) => {
        i.selectable = false
        i.hasControls = false
        const w = canvas.width/i.width
        const h = canvas.height/i.height
        const iw = i.width
        const ih = i.height
        const scale = w < h ? w : h
        i.scale(scale)
        // const setW = iw > cw ? (cw/2 - (iw*scale)/2) : cw/2 - (iw*scale)/2
        // const setH = ih > ch ? (ch/2 - (ih*scale)/2) : ch/2 - (ih*scale)/2

        i.set({ 
            left : cw/2, 
            top : ch/2,
            'l': cw/2,
            't': ch/2,
            originX : "center", 
            originY : "center"
        }).setCoords()
        // i.set({'iw' : setW, 'ih' : setH})

        i.set('layerId', 'layer-'+_i)
        i.set('stretch', false)
        i.set('isAnimate', true)
        i.on('moving', function(e){
          e.transform.target.set({
            'l' : e.transform.target.left,
            't' : e.transform.target.top
          })
        })
        canvas.add(i)
      })
    })
    dispatch(setUtilLayers(tempArr))
    dispatch(editorActions.setTransformControls(false))
  }

  return (
    <div className='flex-col-center h-screen' >
      <canvas id='myCanvas' style={{marginTop : "26px"}}></canvas>
    </div>
  )
}

export default Fabric