"use client";

import useProduct from "@/app/fetch/useProduct";
import { useState } from "react";
import { convertToDollar, convertToKg } from '../Calculator';

interface Product {
    imageUrl: string;
    name: string;
    price: number;
    weight: number;
}

export default function Home() {
    const [activeCategory, setActiveCategory] = useState<string>("");
    const { products, categories, productGroup } = useProduct();

    const finalProduct = products.filter((product) => {
        if (!activeCategory) return true;
        return product.category === activeCategory;
    });

    // function start
    const [countMap, setCountMap] = useState<{ [key: string]: number | null }>({});
    const [priceMap, setPriceMap] = useState<{ [key: string]: number | null }>({});

    const minHandleClick = (productName: string, weight: number, price: number, increment: number) => {
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

    const addHandleClick = (productName: string, weight: number, price: number, imageUrl: string, increment: number) => {
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
            const product = products.find(product => product.name === productName);
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
            const product = products.find(product => product.name === productName);
            if (product) {
                allProduct.push(product);
            }
        }
        return allProduct;
    }

    const [bottom, setBottom] = useState(false);

    const handleBottomOnClick = () => {
        setBottom(!bottom);
    };


    if (!products || products.length === 0) return <div>No Data</div>;

    // function end

    const allProducts = activeCategory || !productGroup ? null : categories.map((category) => (
        <div key={category} >
            {/* outer container */}
            <div className="my-5">
                <h1 className="font-bold text-[20px] mb-5">{category}</h1>
                <div className="grid grid-cols-[1fr,1fr] gap-3 lg:grid-cols-4 mb-[10px] ">
                    {/* product all list here */}
                    {productGroup[category].map((item, index) => (
                        <div className='bg-bgCard p-[11px] h-auto rounded-xl lg:rounded-2xl lg:p-5' key={index}>
                            <div className='flex justify-center'>
                                <img src={item.imageUrl} alt={item.name} className='w-full aspect-square top-0 object-cover mix-blend-multiply bg-transparent' />
                            </div>
                            <div>
                                <p className='text-[22px] font-semibold left-0'>${`${(item.weight * ((priceMap[item.name] <= 0.0001) ? item.price : (priceMap[item.name] ?? item.price))).toFixed(2)}`}</p>
                                <div className='text-[16px] '>{item.name}</div>
                                <div className='flex justify-between items-center mt-5'>
                                    <button onClick={() => minHandleClick(item.name, item.weight, item.price)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black text-white ease-in-out duration-200 ${countMap[item.name] !== undefined && countMap[item.name] > 0 ? '' : 'hidden'}`}>-</button>
                                    <p className={`text-[16px] ${countMap[item.name] !== undefined && countMap[item.name] > 0 ? 'text-black' : 'text-slate-500'}`}>
                                        {countMap[item.name] !== undefined ? convertToKg(countMap[item.name]) : convertToKg(0)}
                                    </p>
                                    <button onClick={() => addHandleClick(item.name, item.weight, item.price, item.imageUrl)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black  ease-in-out duration-200 ${countMap[item.name] !== undefined && countMap[item.name] > 0 ? 'text-white' : 'border border-slate-300 bg-transparent text-gray-950'}`}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* product end list */}
                </div>
                {/* outer container */}
            </div>
        </div>
    ));



    //buat muncul nenggelemin card
    return (
        <div className="p-3">

            <div className='lg:grid lg:grid-cols-[5fr,2fr] gap-5 my-5 w-full overflow-hidden'>
                <main >
                    {/* sort start */}
                    <div className="hover:overflow-x-auto pb-2">
                        <div className="flex gap-2">
                            <div onClick={() => setActiveCategory("")} className="px-4 text-nowrap">
                                <a href="#" className={activeCategory === "" ? "border-b-4 border-black font-bold" : ""}>All</a>
                            </div>
                            {categories.map((item, index) => (
                                <div onClick={() => setActiveCategory(item)} className="px-4 text-nowrap" key={index}>
                                    <a href="#" className={activeCategory === item ? "border-b-4 border-black font-bold" : ""}>{item}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* sort end */}

                    {activeCategory ? (
                        // here the content
                        <div className="py-5 ">
                            <div className="grid grid-cols-[1fr,1fr] gap-3 lg:grid-cols-4 mb-[100px] w-full">
                                {/* product here */}
                                {finalProduct.map((item, index) => (
                                    <div className='bg-bgCard p-[11px] h-auto rounded-xl lg:rounded-2xl lg:p-5' key={index}>
                                        <div className='flex justify-center'>
                                            <img src={item.imageUrl} alt={item.name} className='w-full aspect-square top-0 object-cover mix-blend-multiply bg-transparent' />
                                        </div>
                                        <div>
                                            <p className='text-[22px] font-semibold left-0'>${`${(item.weight * ((priceMap[item.name] <= 0.0001) ? item.price : (priceMap[item.name] ?? item.price))).toFixed(2)}`}</p>
                                            <div className='text-[16px]'>{item.name}</div>
                                            <div className='flex justify-between items-center mt-5'>
                                                <button onClick={() => minHandleClick(item.name, item.weight, item.price)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black text-white ease-in-out duration-200 ${countMap[item.name] !== undefined && countMap[item.name] > 0 ? '' : 'hidden'}`}>-</button>
                                                <p className={`text-[16px] ${countMap[item.name] !== undefined && countMap[item.name] > 0 ? 'text-black' : 'text-slate-500'}`}>
                                                    {countMap[item.name] !== undefined ? convertToKg(countMap[item.name]) : convertToKg(0)}
                                                </p>
                                                <button onClick={() => addHandleClick(item.name, item.weight, item.price, item.imageUrl)} className={`text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black  ease-in-out duration-200 ${countMap[item.name] !== undefined && countMap[item.name] > 0 ? 'text-white' : 'border border-slate-300 bg-transparent text-gray-950'}`}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* productend */}
                            </div>
                        </div>
                    ) : (
                        allProducts
                    )}
                </main>
                {/* footer start */}
                <div onClick={handleBottomOnClick} className=' lg:hidden fixed bottom-10 left-4 right-4  w-auto flex bg-black rounded-[43px] px-4 gap-4 justify-between items-center shadow-md'>
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
                {/* footer end */}
                {/* resume start */}
                {/* fixed top-5 right-2 left-2 */}
                <div className={`border rounded-xl p-4 h-screen lg:h-auto bg-white ${bottom ? "fixed top-5 right-2 left-2" : "hidden sm:block"}`}>

                    <div className="flex justify-between">
                        <img src="car.svg" alt="car" className='h-5 flex justify-start' />
                        <button onClick={handleBottomOnClick} className="lg:hidden">
                            <p className="flex font-bold bg-black text-white rounded-full text-center items-center p-3 m-2 w-8 h-8">x</p>
                        </button>
                    </div>
                    <p className='text-[16px]'>Before Free Shipping: <span className='font-bold mx-1'>${convertToDollar(calculateTotalPrice().toFixed(4))}</span></p>
                    <div className="bg-gray-200 h-2.5 rounded-full mb-5" style={{ width: '100%' }}>
                        <div className={`bg-gradient-to-r h-full rounded-full ${convertToDollar((calculateTotalPrice() / 0.15).toFixed(4)) > 100 ? 'bg-red-500' : ' from-blueGreen to-blue-300'}`} style={{ width: `${convertToDollar((calculateTotalPrice() / 0.15).toFixed(4)) > 100 ? 100 : convertToDollar((calculateTotalPrice() / 0.15).toFixed(4))}%` }}></div>
                    </div>

                    <div className=" overflow-y-scroll">
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
            </div>
        </div >
    );
}