import React from 'react';
import useItems from '../../hooks/useItems';
import Item from '../../Shared/Item/item';
import SectionTitle from '../../../components/sectionTile/SectionTitle';

const AllItems = () => {
    const [items] =  useItems();
    return (
        <div>
            <SectionTitle
            heading={"Our Products"}
            subHeading={"Please choose as you like"}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10 justify-center">
                {
                    items.map(item => <Item
                    key={item._id}
                    item={item}
                    ></Item>)
                }
            </div>
        </div>
    );
};

export default AllItems;