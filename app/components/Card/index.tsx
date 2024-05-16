'use client'
import React, { useState } from 'react';
import UseContext from '@/app/fetch/UseContect';
import { convertToDollar, convertToKg } from '../Calculator';

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


        const newPrice = countMap[productName] === 1 ? price : (priceMap[productName] ?? 0) - price;

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

    //show product bought
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
    const getAllProduct = (): Product[] => {
        const allBoughtProduct = getBoughtProducts();
        const allProduct: Product[] = [];
        for (let i = 0; i < allBoughtProduct.length; i++) {
            const productName = allBoughtProduct[i];
            const product = productList.find(product => product.name === productName);
            if (product) {
                allProduct.push(product);
            }
        }
        return allProduct;
    }


    if (!productList || productList.length === 0) return <div>No Data</div>;

    return (
        <div className='lg:grid lg:grid-cols-[5fr,2fr] gap-5'>

            <div className="grid grid-cols-[1fr,1fr] gap-3 lg:grid-cols-4 mb-[100px]">
                {productList.map((product: Product, index) => (
                    <div key={index} className='bg-bgCard p-[11px] h-auto rounded-xl lg:rounded-2xl lg:p-5'>
                        <div className='flex justify-center'>
                            <img src={product.imageUrl} alt={product.name} className='w-full aspect-square top-0 object-cover mix-blend-multiply bg-transparent' />
                        </div>
                        <div className='bottom-0'>
                            {/* show price update */}

                            <p className='text-[22px] font-semibold left-0'>${`${(product.weight * ((priceMap[product.name] <= 0.0001) ? product.price : (priceMap[product.name] ?? product.price))).toFixed(2)}`}</p>

                            <p className='text-[16px] left-0'>{product.name}</p>
                            <div className='flex justify-between items-center mt-5'>
                                <button onClick={() => minHandleClick(product.name, product.weight, product.price)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black text-white ease-in-out duration-200 ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? '' : 'hidden'}`}>-</button>
                                <p className={`text-[16px] ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? 'text-black' : 'text-slate-500'}`}>
                                    {countMap[product.name] !== undefined ? convertToKg(countMap[product.name]) : convertToKg(0)}
                                </p>
                                <button onClick={() => addHandleClick(product.name, product.weight, product.price, product.imageUrl)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black  ease-in-out duration-200 ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? 'text-white' : 'border border-slate-300 bg-transparent text-gray-950'}`}>+</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <div className=' lg:hidden fixed bottom-10 left-4 right-4  w-auto flex bg-black rounded-[43px] px-4 gap-4 justify-between items-center shadow-md'>
                <p className='text-[16px] h-12 items-center flex justify-center text-white'>Cart</p>
                <div className='w-6 h-6 z-30 rounded-full flex justify-center items-center'>
                    <div className=' flex justify-center items-center'>
                        {getFirstFiveProducts().map((product, index) => (
                            <img key={index} src={product.imageUrl} alt={product.name} className='bg-bgCard w-6 h-6 z-30 rounded-full object-cover mix-blend-multiply' />
                        ))}
                    </div>
                </div>
                <p className='text-[16px] rounded-[43px] h-10 items-center flex justify-center bg-black text-white'>Total Price: ${convertToDollar(calculateTotalPrice().toFixed(4))}</p>
            </div>
            <div className='border rounded-xl p-4'>
                <img src="car.svg" alt="car" className='h-5 flex justify-start' />
                <p className='text-[16px]'>Before Free Shipping: <span className='font-bold mx-1'>${convertToDollar(calculateTotalPrice().toFixed(4))}</span></p>
                <div className="bg-gray-200 h-2.5 rounded-full mb-5" style={{ width: '100%' }}>
                    <div className={`bg-gradient-to-r h-full rounded-full ${convertToDollar((calculateTotalPrice() / 0.15).toFixed(4)) > 100 ? 'bg-red-500' : ' from-blueGreen to-blue-300'}`} style={{ width: `${convertToDollar((calculateTotalPrice() / 0.15).toFixed(4)) > 100 ? 100 : convertToDollar((calculateTotalPrice() / 0.15).toFixed(4))}%` }}></div>
                </div>

                {getAllProduct().map((product, index) => (
                    <div key={index} className='grid grid-cols-[3fr,4fr]'>
                        <img src={product.imageUrl} alt={product.name} />
                        <div>
                            <p className='text-[16px] font-bold'>{product.name}</p>
                            <p className='text-[16px]'>
                                ${`${(product.weight * ((priceMap[product.name] <= 0.0001) ? product.price : (priceMap[product.name] ?? product.price))).toFixed(2)}`}
                            </p>
                            {/* button start */}
                            <div className='flex justify-between items-center mt-5'>
                                <button onClick={() => minHandleClick(product.name, product.weight, product.price)} className={`text-[20px] rounded-full w-7 h-7 items-center flex justify-center bg-slate-300 text-black ease-in-out duration-200 ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? '' : 'hidden'}`}>-</button>
                                <p className={`text-[16px] ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? 'text-black' : 'text-slate-500'}`}>
                                    {countMap[product.name] !== undefined ? convertToKg(countMap[product.name]) : convertToKg(0)}
                                </p>
                                <button onClick={() => addHandleClick(product.name, product.weight, product.price, product.imageUrl)} className={`text-[20px] text-black bg-slate-300 rounded-full w-7 h-7 items-center flex justify-center ease-in-out duration-200 ${countMap[product.name] !== undefined && countMap[product.name] > 0 ? 'text-black' : 'border border-slate-300 bg-transparent text-black'}`}>+</button>
                            </div>
                            {/* button end */}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Card
