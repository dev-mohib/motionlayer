import { GalleryVideo, GalleryVideoPagination, PageProps } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import React, { RefObject, useRef, useState } from 'react'
import {  DownloadIcon, DeleteIcon } from '@/Components/icons'
import Modal from 'react-modal'
const getColor = () => {
    const colors = [
        "bg-red-400",
        "bg-red-500",
        "bg-orange-600",
        "bg-red-600",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-600"    
    ]
    return colors[Math.floor(Math.random()*colors.length)];
}
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const Index = () => {
    const { videos } = usePage<PageProps<{videos : GalleryVideoPagination}>>().props
    const [selectedVideo, setSelectedVideo] = useState<null | GalleryVideo>(null)
    const [isLoading, setLoading] = useState(true)
    const aRef = useRef(null)

    const handleDownload = () =>{ 
        // @ts-ignore
        aRef.current.click()
    }
    const handleViewVideo = (video :GalleryVideo) => {
    setSelectedVideo(video)

  }
  const closeModal = () => {
    setSelectedVideo(null)
  }
  return (
    <div className='flex-c-c w-full bg-white min-h-screen'>
        <div className='h-20 bg-gray-700 flex justify-between items-center px-4'>
            <div className={'text-white font-extrabold text-2xl'}>
                Motion Layer
            </div>
            <Link href={route('motionlayer.editor')}>
                <div className='btn text-2xl font-bold bg-gradient-to-tl from-gray-700 to-green-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'>Create New</div>
            </Link>
        </div>
        <Head title='Home'/>
        <div className='md:px-10 sm:px-4 lg:px-36 xl:px-64 mt-10'>
            <h1 className={'text-black font-extrabold px-4 my-3 text-2xl'}>Latest Videos</h1>
            <div className='mt-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 '>
                {videos.data.map(((video, i) => <div key={video.id}><Card onClick={() => handleViewVideo(video)} video={video} /></div>))}
            </div>
        </div>
        <Modal isOpen={!!selectedVideo} onRequestClose={closeModal} 
        // style={customStyles}
        contentLabel="Example Modal">
        <div className='flex justify-between'>
            <h1 className='font-semibold text-base p-4'>Animation Video</h1>
            <button onClick={closeModal} className='cursor-pointer p-4'>X</button>
        </div>
        {selectedVideo && (
          <div className='h-56'>
             <video className='' autoPlay loop style={{
                width: '90vw',
                height: '80vh'
             }}
            //  onLoadStart={}
                poster="/loading.gif" preload="auto"
             >
                <source src={`/storage/`+selectedVideo.source} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1 className='my-3 font-bold text-2xl'>{selectedVideo.title}</h1>
            {/* <div className='w-full flex justify-end'>
                <button className='btn btn-primary' onClick={handleDownload}>Download</button>
            </div> */}
            {/* <a ref={aRef} className='hidden' href={`/storage/videos/`+selectedVideo.source} download={selectedVideo.title + '.mp4'}></a> */}
          </div>
        )}
      </Modal>
    </div>
  )
}


const Card = ({video, onClick}:{video : GalleryVideo, onClick : any}) => {
    const { auth } = usePage<PageProps>().props
    const aRef = useRef<HTMLAnchorElement>(null)
    const { delete  : destroy } = useForm()
    const handleVideoDelete = () => {
        const confirm = window.confirm("Do you really want to delete this video?")
        if(confirm){
            router.delete('/video/'+video.id)
        }
    }
    const handleDownload = () => {
        aRef.current?.click()
    }
    return (
        <div
            className=' shadow-lg rounded border-4 border-gray-700'
        >
            <a ref={aRef}  href={'/storage/'+ video.source}  hidden download={video.source}></a>
            <div className='w-full rounded cursor-pointer hover:shadow-lg'>
                <div onClick={onClick}  className={`w-full ${getColor()}`}>
                    <img className='object-cover w-full' src={`/storage/` + video.thumbnail}/>
                </div>
                <div className='flex justify-between '>
                    <div className='mt-3'>
                        <h1 className='text-black font-bold text-lg'>{video.title}</h1>
                    </div>
                    {/* <label htmlFor="dropdown" className="block text-gray-700 font-semibold mb-2">:</label> */}
                    {/* <select id="dropdown" className="block  p-0.5 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                        <option value="option1">Download</option>
                        <option value="option2">Delete</option>
                    </select> */}
                    <div className='flex p-4'>
                        <DownloadIcon className='text-green-500 mx-1 hover:text-green-400' onClick={handleDownload}/>
                        {
                            auth.user &&
                            <div className='mx-1' onClick={handleVideoDelete}><DeleteIcon className='text-red-500 hover:text-red-400' /></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index