import React from 'react'

const Navbar = () => {
    return (
        <div >
            <div className='px-[16px] pt-[58px] flex justify-between bg-white'>
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
        </div>
    )
}

export default Navbar
