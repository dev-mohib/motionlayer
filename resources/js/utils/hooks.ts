import { fabric } from 'fabric'
import { useEffect, useRef, useState } from 'react';

export const useFabric = (id : any) => {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState<any>(null)

  const animate = (name : any) => {
    console.log(canvas)
  
  }

  const toJSON = () => canvas?.toJSON()
  useEffect(() => {
    const _canvas = new fabric.Canvas(id, {
      width: window.innerWidth, 
      height: window.innerHeight - 54,
      backgroundColor : '#374151',
    })
    setCanvas(_canvas)
  }, [])

  const loadFromJSON = (json : any) => {
    // canvas.loadFromJSON(json)
    // @ts-ignore
    fabric.loadFromJSON(json, () => {
      canvas.renderAll()
    },(options : any, o : any) => {
      console.log({options, o})
    }) 
  }

  const objects = () => canvas.getObjects()
    

  const getClone = () => canvas.clone()
  

  return {canvas, canvasRef, loadFromJSON, toJSON, objects, getClone}

}