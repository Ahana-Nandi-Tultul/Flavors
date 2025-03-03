import { useEffect, useState } from "react";

const useItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        fetch('https://flavors-server.vercel.app/allItems')
        .then(res => res.json())
        .then(data => {
            setItems(data);
            setLoading(false);
        })
    }, [])
    //console.log(items);
    return [items, loading, setItems];
};

export default useItems;