import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/state/hooks';
import { editorActions } from '@/state/store';


const UploadView = () => {
  const dragRef = useRef(null)
  const hiddenFileInput = useRef(null)
  const dispatch = useAppDispatch()
  const [images, setImages] = useState<any[]>([])

  const handleDrag = (e :any ) => {
      e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement> ) => {
    e.preventDefault() 
    const dataFiles = e.dataTransfer.files
      for(var i=0;i<dataFiles.length;i++){
        if(dataFiles[i].type !== "image/png"){
          alert("Please upload only images files with png format")
          setImages([])
          return
        }
        setImages((img:any) => [...img, dataFiles[i]])
        const url = URL.createObjectURL(dataFiles[i])
        dispatch(editorActions.addLayer({index : i,name : dataFiles[i].name, url, hasControls : false, rotation : 0}))
      }
      e.dataTransfer.clearData()
      dispatch(editorActions.enableEditing())
  } 

  
  const handleUpload = (e : ChangeEvent<HTMLInputElement>) => {
    if(e.target.files)
    {
      for(var i=0; i < e.target.files.length; i++){
        const url = URL.createObjectURL(e.target.files[i])
        dispatch(editorActions.addLayer({index : i,name : e.target.files[i].name,url, hasControls : false, rotation : 0}))
    }
    dispatch(editorActions.enableEditing())
  }
}
  useEffect(() => {

      let div : any = dragRef.current
      div.addEventListener('dragover', handleDrag)
      div.addEventListener('drop', handleDrop)

      return () => {
          div.removeEventListener('dragover', handleDrag)
          div.removeEventListener('drop', handleDrop)
      }
  },[])
  return (
    <div className='flex-row-center'>
          <div 
          draggable ref={dragRef}
          onClick={() => {
            const r : any = hiddenFileInput.current;
            r.click();
          }}
          className=' border-gray-400 rounded w-full mx-32 mt-16 border-dashed border-2 flex-row-center cursor-pointer hover:border-white drag-area' style={{height : '70vh'}}>
            <div className='flex-col-center'>
                <img src="/image-placeholder.svg" className="h-24 my-1" />
                <div className='text-base font-bold my-1 text-gray-400' >Drop Image or Click to upload</div>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleUpload}
                    multiple
                    accept='image/png'
                    style={{display: 'none'}}
                  />
                <div className='text-sm my-1 text-gray-400 text-center'>PNG layers with transparent background. For movements, add upto 8 layers with maximum resolution of 1600px</div>
            </div>
        </div>
      </div>
  )
}

export default UploadView