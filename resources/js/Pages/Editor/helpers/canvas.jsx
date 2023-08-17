import React, { useEffect, useRef, useState } from 'react'

const Canvas = () => {
    const canvasRef = useRef(null)
    const [context, setContext] = useState(null)

    useEffect(() => {
        const renderCtx = canvasRef.current.getContext('2d');
        if(renderCtx)
        setContext(renderCtx)
    },[context])
  return (
    <div>Canvas</div>
  )
}

export default Canvas