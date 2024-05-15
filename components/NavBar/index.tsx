import React from 'react'

const Navbar = () => {
    return (
        <div className='px-[16px] pt-[58px] flex justify-between'>
            <p className='font-bold text-[20px]'>Vegetables</p>
            <div>
                <button>
                    <img src="filter.svg" alt="" className='w-6' />
                </button>
                <button>
                    <img src="search.svg" alt="" className='w-6 mx-[9px]' />
                </button>
            </div>

        </div>
    )
}

export default Navbar
