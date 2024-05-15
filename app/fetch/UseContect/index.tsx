'use client'
import axios from "axios";
import { useEffect, useState } from "react";


const UserContext = () => {
    const [productList, setProductList] = useState([]);

    const fetchProductList = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/products");
            setProductList(data)
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    return { productList, fetchProductList };
};

export default UserContext;
