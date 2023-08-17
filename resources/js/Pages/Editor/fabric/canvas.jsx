import React, { useEffect, useMemo } from 'react'
import { fabric } from 'fabric'
import { useFabric } from '@/utils/hooks'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { animateLeftRight, animateOpacity, animateTopBottom, animateCircle,getObjectById } from './animations'
import { setUtilLayers } from '@/state/store'
let tempArr = []

const Fabric = () => {
    const { canvas, objects } = useFabric('myCanvas')

    const dispatch = useAppDispatch()
    const { layers, bgColor, isAnimating, animationName, easeType,animationDelta,animationDuration,shadow, skew } = useAppSelector(state => state.editorReducer)
    const { layers : tmpLayers, isDesktop } = useAppSelector(s => s.utilReducer)

    useEffect(() => {
      if(canvas && layers)
      {
        canvas.clear()
        addLayers()
        }
    },[canvas, layers])

    useMemo(() => {
      if(canvas){
        canvas.backgroundColor= bgColor;
        tmpLayers.map(layer => {
          // console.log(layer);
          canvas.forEachObject(obj => {
            if(obj.layerId == layer.id){
              if(layer.stretch){
                obj.left = 0
                obj.top = 0
                obj.scaleX = canvas.width / obj.width
                obj.scaleY = canvas.height / obj.height
                obj.set('stretch', true)
              } else {
                const w = canvas.width /obj.width
                const  h = canvas.height/obj.height
                obj.scale(w < h ? w : h)
                obj.set('stretch', false)
                canvas.centerObject(obj)
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
              // console.log({obj});
            }
          })
        })  
  }
},[tmpLayers, bgColor, shadow])
    useMemo(() => {
      if(canvas){
        if(skew.enabled){
          objects().map(i => {
            i.skewX = skew.skewX
            i.skewY = skew.skewY
          })
        }else {
          objects().map(i => {
            i.skewX = 0
            i.skewY = 0
          })
        }
        canvas.renderAll()
      }
    },[skew])

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
          animate : true, stretch : false
        })

      fabric.Image.fromURL(layer.url, (i) => {
        i.selectable = false
        const w = canvas.width/i.width
        const h = canvas.height/i.height
        const iw = i.width
        const ih = i.height
        const scale = w < h ? w : h
        i.scale(scale)
        const setW = iw > cw ? (cw/2 - (iw*scale)/2) : cw/2 - (iw*scale)/2
        const setH = ih > ch ? (ch/2 - (ih*scale)/2) : ch/2 - (ih*scale)/2

        i.set({ left : setW, top : setH}).setCoords()
        i.set({'iw' : setW, 'ih' : setH})
        i.set('layerId', 'layer-'+_i)
        i.set('stretch', false)
        i.set('isAnimate', true)
        
        canvas.add(i)
      })
    })
    dispatch(setUtilLayers(tempArr))
  }


  return (
    <div className='flex-col-center h-screen' >
      <canvas id='myCanvas' style={{marginTop : "26px"}}></canvas>
    </div>
  )
}

export default Fabric