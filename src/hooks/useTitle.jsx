import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(()=> {
        document.title = `Flavour || ${title}`
}, [title])    
};

export default useTitle;