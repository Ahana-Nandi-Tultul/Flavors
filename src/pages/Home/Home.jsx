import AllItems from "./AllItems/AllItems";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Category></Category>
           <AllItems></AllItems>
        </div>
    );
};

export default Home;