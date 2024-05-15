'use client'
import React, { useState } from 'react';
import UseContext from '@/app/fetch/UseContect';
import { convertToKg } from '../Calculator';

interface Product {
    imageUrl: string;
    name: string;
    price: number;
    weight: number;
}

const Card: React.FC = () => {
    const { productList } = UseContext();
    const [countMap, setCountMap] = useState<{ [key: string]: number | null }>({});
    const [priceMap, setPriceMap] = useState<{ [key: string]: number | null }>({});

    const minHandleClick = (productName: string, weight: number, price: number) => {
        setCountMap(prevCountMap => ({
            ...prevCountMap,
            [productName]: Math.max(0, (prevCountMap[productName] ?? 0) - weight)
        }));


        const newPrice = countMap[productName] === 1 ? product.price : (priceMap[productName] ?? 0) - price;

        setPriceMap(prevPriceMap => ({
            ...prevPriceMap,
            [productName]: newPrice
        }));
    };

    const addHandleClick = (productName: string, weight: number, price: number, imageUrl: string) => {
        setCountMap(prevCountMap => ({
            ...prevCountMap,
            [productName]: prevCountMap[productName] != null ? prevCountMap[productName] + weight : weight
        }));

        setPriceMap(prevPriceMap => ({
            ...prevPriceMap,
            [productName]: (prevPriceMap[productName] ?? 0) + price
        }));

    };

    const calculateTotalPrice = (): number => {
        let totalPrice = 0;
        for (const productName in countMap) {
            if (countMap[productName] && countMap[productName] !== 0) {
                const price = priceMap[productName] ?? 0;
                totalPrice += price;
            }
        }
        return totalPrice;
    };

    const getBoughtProducts = (): string[] => {
        return Object.keys(countMap).filter(productName => countMap[productName] && countMap[productName] > 0);
    };
    const getFirstFiveProducts = (): Product[] => {
        const boughtProducts = getBoughtProducts();
        const firstFiveProducts: Product[] = [];
        for (let i = 0; i < Math.min(5, boughtProducts.length); i++) {
            const productName = boughtProducts[i];
            const product = productList.find(product => product.name === productName);
            if (product) {
                firstFiveProducts.push(product);
            }
        }
        return firstFiveProducts;
    };


    if (!productList || productList.length === 0) return <div>No Data</div>;

    return (
        <div>

            <div className="grid grid-cols-[1fr,1fr] gap-3 lg:grid-cols-4 mb-3">
                {productList.map((product: Product, index) => (
                    <div key={index} className='bg-bgCard p-[11px] h-auto rounded-md lg:rounded-lg lg:p-5'>
                        <div className='flex justify-center'>
                            <img src={product.imageUrl} alt={product.name} className='aspect-square top-0 object-cover mix-blend-multiply bg-transparent' />
                        </div>
                        <div className='bottom-0'>
                            <p className='text-[22px] font-semibold left-0'>{`${(priceMap[product.name] <= 0.0001) ? product.price : (priceMap[product.name] ?? product.price).toFixed(4)}`}</p>

                            <p className='text-[16px] left-0'>{product.name}</p>
                            <div className='flex justify-between items-center mt-5'>
                                <button onClick={() => minHandleClick(product.name, product.weight, product.price)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black text-white ease-in-out duration-200 ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? '' : 'hidden'}`}>-</button>
                                <p className={`text-[16px] ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? 'text-black' : 'text-slate-500'}`}>
                                    {countMap[product.name] !== undefined ? convertToKg(countMap[product.name]) : convertToKg(0)}
                                </p>
                                <button onClick={() => addHandleClick(product.name, product.weight, product.price)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black text-white ease-in-out duration-200 ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? '' : 'border bg-transparent text-slate-950'}`}>+</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            <div className='flex bg-black rounded-[43px] px-4 gap-4 justify-between items-center'>
                <p className='text-[16px] h-10 items-center flex justify-center bg-black text-white'>Cart</p>
                <div className='bg-bgCard w-5 h-5 z-30 rounded-full flex justify-center items-center'>
                    <div className=' flex justify-center items-center'>
                        {getFirstFiveProducts().map((product, index) => (
                            <img key={index} src={product.imageUrl} alt={product.name} className='bg-bgCard w-5 h-5 z-30 rounded-full object-cover mix-blend-multiply' />
                        ))}
                    </div>
                </div>
                <p className='text-[16px] rounded-[43px] h-10 items-center flex justify-center bg-black text-white'>Total Price: ${calculateTotalPrice().toFixed(4)}</p>
            </div>
        </div>
    );
};

export default Card
