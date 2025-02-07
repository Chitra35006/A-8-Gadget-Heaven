import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Statistics = () => {
    document.title = "Stats | Gadget Heaven";

    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('products.json')
            .then(data => {
                const productData = data.data;
                const productWithDemoData = productData.map(product => {
                    const obj = {
                        name: product.title.split(" ")[0],  
                        nameFull: product.title,    
                        price: product.price
                    };
                    return obj;
                });
                setProducts(productWithDemoData);
            });
    }, []);
    return (
        <div className="">
        <div className="bg-[#9538E2]">
            <div className="text-center py-10 md:w-3/5 w-4/5 mx-auto space-y-4">
                <h3 className="font-bold text-white md:text-2xl text-xl">Statistics</h3>
                <p className="text-white">Discover the cutting-edge gadgets that redefine innovation and convenience. From advanced smart devices to must-have tech accessories, find everything you need to elevate your lifestyle</p>
            </div>
        </div>
        {/* graph */}
        <div className="md:w-4/5  mx-auto mt-10 ">
            <BarChart width={1000} height={500} data={products}>
                <Bar dataKey="price" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                    formatter={(value, name, props) => [
                        `${value} $`,
                        // eslint-disable-next-line react/prop-types
                        props.payload.nameFull 
                    ]}
                />
            </BarChart>
        </div>
    </div>
    );
};

export default Statistics;