import React from 'react'

const File = () => {
    return (
     <div className='px-2 py-2'>
       <div>
         <h2 className='font-semibold text-base'>File</h2>
         <p className='text-sm font-extralight'>Save the composition on your device as a .json format so that you can open it again in future</p>
       </div>
   
       <div className='p-4 rounded bg-slate-600 m-1 px-2 mt-4'>
         <span>Name</span>
         <input
           type="text"
           name="password"
           placeholder="Untitled"
           className="text-black w-full px-4 my-2 py-1 rounded text-base border-b-2 border-gray-400 focus:outline-none focus:border-green-400"
     />
         <input type='button' className='btn w-full rounded' value={'save .json file'}/>
       </div>
       <div className='mx-1 my-3'>
       <input type='button' className='btn w-full rounded' value={'Upload .json file'}/>
       </div>
   
   </div>)
   }
   
export default File