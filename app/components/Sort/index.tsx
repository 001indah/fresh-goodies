import React from 'react'

const Short = () => {
    return (
        <div className='bg-white p-3 shadow-md border-slate-200 border m-4 rounded-xl'>
            <a href="" className='font-bold flex justify-end'>x</a>
            <p className='border-2 border-black rounded-lg px-2 my-2' aria-placeholder=''>Search...</p>
            <div className='bg-bgCard rounded-xl p-2'>
                <p className='font-bold text-base'>Sort by</p>
                <p className='text-base'>List</p>
                <p className='text-base'>List</p>
                <p className='text-base'>List</p>
            </div>
            <p className='bg-black text-white rounded-[12px] p-1 flex justify-center my-2'>Apply</p>
        </div>
    )
}

export default Short
