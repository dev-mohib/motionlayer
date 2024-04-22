import React, { useRef, useEffect, useState } from 'react'
import { downloadCanvas, getSupportedMimeTypes } from '@/utils/canvas'

const Canvas = props => {
  const canvasRef = useRef(null)
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#006699'
    ctx.beginPath()
    // var r1 = 25 + 150 * Math.abs(Math.cos(frameCount));
    var r2 = 30*Math.sin(frameCount*0.05)**2
    ctx.arc(300, 200, r2, 0, 2*Math.PI)
    ctx.fill()
  }
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas id='myCanvas2' width={720} height={400} ref={canvasRef} {...props}/>
}


const Wrapper = () => {
    const [isRecording, setRecording] = useState(false)
    let mediaRecorder;
    let recordedBlobs;
    const startRecording = () => {
        recordedBlobs = [];
        var mainCanvas = document.querySelector("#myCanvas");
        var stream = mainCanvas.captureStream(30)
  var options = {mimeType: getSupportedMimeTypes()[0]};

    try {
        mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        //errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped:');
        downloadCanvas(recordedBlobs)
      };
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();

}


    const saveRecording = () => {
        try {
            mediaRecorder.stop()
        } catch (error) {
            console.error("Error while Stop recorder : " + error)
        }
    }
    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
          console.log("Pushing")
          recordedBlobs.push(event.data);
        }
      }
    return (
        <div>
            <Canvas />
            <div className='flex flex-row py-4'>
                <button onClick={startRecording} className='px-5 py-2 bg-purple-800 text-white mx-1 hover:bg-purple-900'>{!isRecording ? "Record" : "Stop"}</button>
                <button onClick={saveRecording} className='px-5 py-2 bg-purple-800 text-white mx-1 hover:bg-purple-900'>Save</button>
            </div>
        </div>
    )
}


export default Wrapper