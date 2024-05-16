import React from 'react';

const Label = () => {
    return (
        <div className='flex bg-black rounded-[43px] px-4 gap-4 justify-between items-center'>
            <p className='text-[16px] h-10 items-center flex justify-center bg-black text-white'>Cart</p>
            <div className='bg-bgCard w-5 h-5 z-30 rounded-full flex justify-center items-center'>
                <img src="products/cucumber.png" alt="" className='w-4 object-cover mix-blend-multiply bg-transparent' />
            </div>
            <p className='text-[16px] rounded-[43px] h-10 items-center flex justify-center bg-black text-white'>Total Price: $</p>
        </div>
    )
}

export default Label;


