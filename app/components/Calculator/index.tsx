export const convertToKg = (weight: number): string => {
    if (weight >= 1000) {
        return `${(weight / 1000).toFixed(2)} kg`;
    }
    return `${weight} gr`;
};

// className = `{text-[16px] ${countMap[product.name] == undefined && "text-slate-500"}}`


// const Card: React.FC = () => {
//     const { productList } = UseContext();
//     const [countMap, setCountMap] = useState<{ [key: string]: number | null }>({}); // Initialize count with an empty object

//     const minHandleClick = (productName: string, weight: number) => {
//         setCountMap(prevCountMap => ({
//             ...prevCountMap,
//             [productName]: prevCountMap[productName] != null ? prevCountMap[productName] - weight : weight
//         }));
//     };

//     const addHandleClick = (productName: string, weight: number) => {
//         setCountMap(prevCountMap => ({
//             ...prevCountMap,
//             [productName]: prevCountMap[productName] != null ? prevCountMap[productName] + weight : weight
//         }));
//     };

//     if (!productList || productList.length === 0) return <div>No Data</div>;

//     return (
//         <div>
//             {productList.map((product: Product) => (
//                 <div key={product.name} className='bg-bgCard p-[11px] h-auto rounded-md lg:rounded-lg lg:p-5'>
//                     <div className='flex justify-center'>
//                         <img src={product.imageUrl} alt={product.name} className='aspect-square top-0 object-cover mix-blend-multiply bg-transparent' />
//                     </div>
//                     <div className='bottom-0'>
//                         <p className='text-[22px] font-semibold left-0'>${product.price}</p>
//                         <p className='text-[16px] left-0'>{product.name}</p>
//                         <div className='flex justify-between items-center mt-5'>
//                             <button onClick={() => minHandleClick(product.name, product.weight)} className='text-[20px] rounded-full w-10 h-10 items-center flex justify-center bg-black text-white'>-</button>
//                             <p className='text-[16px]'>{countMap[product.name] !== null ? convertToKg(countMap[product.name]!) : convertToKg(product.weight)}</p> {/* Ternary to display count if not null, else display initial weight */}
//                             <button onClick={() => addHandleClick(product.name, product.weight)} className='text-[20px] rounded-full border w-10 h-10 items-center flex justify-center'>+</button>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Card;