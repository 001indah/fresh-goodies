import { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '@/constants/url'
import { Product } from '@/types/product';

interface ProductGroup {
    // category name: Multiple products
    // Hashmap category as its key
    // Array of product as its value

    [key: string]: Product[];
}


const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [productGroup, setProductGroup] = useState<ProductGroup>()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/products");
                const productData = response.data as Product[];
                // setProducts(productData);

                const uniqueCategories = Array.from(new Set(productData.map(product => product.category)));
                // setCategories(uniqueCategories); 

                const groupData: ProductGroup = {};

                uniqueCategories.forEach(category => {
                    const currentCategoryProducts = productData.filter(product => product.category === category);
                    groupData[category] = currentCategoryProducts;
                });

                setProductGroup(groupData);
                setCategories(uniqueCategories);
                setProducts(productData);

            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }

        };

        fetchProducts();
    }, []);
    // empty dependency array so it won't be called every render
    // [] means that it'll be only called once


    return { products, categories, productGroup, loading, error };
};

export default useProducts;