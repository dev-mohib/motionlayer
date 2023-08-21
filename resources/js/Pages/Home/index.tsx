import { GalleryVideo, GalleryVideoPagination, PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { RefObject, useRef, useState } from 'react'
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
    <div className='flex-c-c w-full bg-gray-600 min-h-screen'>
        <div className='h-20 bg-gray-700 flex justify-between items-center px-4'>
            <div className={'text-white font-extrabold text-2xl'}>
                Motion Layer
            </div>
            <Link href={route('motionlayer.editor')}>
                <div className='btn btn-primary'>Create New</div>
            </Link>
        </div>
        <Head title='Home'/>
        <div className='md:px-10 sm:px-4 lg:px-36 xl:px-64 mt-10'>
            <h1 className={'text-white font-extrabold px-4 my-3 text-2xl'}>Latest Videos</h1>
            <div className='mt-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 '>
                {videos.data.map(((video, i) => <div key={video.id} onClick={() => handleViewVideo(video)}><Card video={video} /></div>))}
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
             <video className='' controls>
                <source src={`/storage/videos/`+selectedVideo.source} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1 className='my-3 font-bold text-2xl'>{selectedVideo.title}</h1>
            <div className='w-full flex justify-end'>
                <button className='btn btn-primary' onClick={handleDownload}>Download</button>
            </div>
            <a ref={aRef} className='hidden' href={`/storage/videos/`+selectedVideo.source} download={selectedVideo.title + '.mp4'}></a>
          </div>
        )}
      </Modal>
    </div>
  )
}


const Card = ({video}:{video : GalleryVideo}) => {
    return (
        <div
            className=' shadow-lg rounded border-4 border-gray-700'
         >
            <div className='w-full  rounded hover:bg-gray-600 cursor-pointer hover:shadow-lg'>
                <div className={`w-full ${getColor()}`}>
                    <img className='object-cover w-full' src={`/storage/thumbnails/`+video.thumbnail}/>
                </div>
                <div className='h-20 mt-3 bg-gray-500 pt-4 px-2'>
                    <h1 className='text-white font-bold'>{video.title}</h1>
                </div>
            </div>
        </div>
    )
}

export default Index