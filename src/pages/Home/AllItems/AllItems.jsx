import React, { useEffect, useState } from 'react';
import useItems from '../../../hooks/useItems';
import Item from '../../Shared/Item/item';
import SectionTitle from '../../../components/sectionTile/SectionTitle';
import { useLoaderData } from 'react-router-dom';

const AllItems = () => {
    const [itemsLoad] =  useItems();
    const allItemsCount = useLoaderData();
    const [items, setItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(allItemsCount.totalItems / itemsPerPage)
    const pageNumbers = [...Array(totalPages).keys()];
    const [currentPage, setCurrentPage] = useState(0);
    const options = [5, 10, 15, 20];
    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/itemsPerPage?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await res.json();
            setItems(data);
        };
        fetchData();
    }, [currentPage, itemsPerPage]);  // Ensure itemsPerPage is included

    const handleSearch = event => {
        event.preventDefault()
        const form = event.target;
        const search = form.search.value;

            fetch(`http://localhost:5000/items?search=${search}`)
            .then(res => res.json())
            .then(data => setItems(data))
        
    }
    return (
        <div>
            <SectionTitle
            heading={"Our Products"}
            subHeading={"Please choose as you like"}></SectionTitle>
            <div className="form-control m-10">
                <form onSubmit={handleSearch}>
                    <div className="input-group">
                        <input type="text" name="search" placeholder="Food Name" className="input input-bordered" />
                        <input className="btn" type="submit" value="Search" />
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10 justify-center">
                {
                    items.map(item => <Item
                    key={item._id}
                    item={item}
                    ></Item>)
                }
            </div>
            <div className='text-center mb-16'>
            {
                pageNumbers.map(number => <button className={`btn 
                ${currentPage === number ? 'bg-[#f5b48e] text-dark': ''}`}
                    onClick={() => setCurrentPage(number)}
                    key={number}>{number + 1}</button>)
            }
            <select value={itemsPerPage} onChange={handleSelectChange} className='select select-bordered'>
                {
                    options.map(op => <option key={op} value={op}>{op}</option>)
                }
            </select>
        </div>
        </div>
    );
};

export default AllItems;