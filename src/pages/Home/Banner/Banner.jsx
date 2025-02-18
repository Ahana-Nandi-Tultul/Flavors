import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/banner/banner_1.jpg";
import img2 from "../../../assets/banner/banner_2.jpg";
import img3 from "../../../assets/banner/banner_3.jpg";
import img4 from "../../../assets/banner/banner_4.jpg";
import useTitle from "../../../hooks/useTitle";
const Banner = () => {
    useTitle("Home")
    return (
        <div>
            <Carousel>
                <div>
                    <img src={img1} />
                    <p className="legend text-white">Eat Healthy Stay Healthy</p>
                </div>
                <div>
                    <img src={img2} />
                    <p className="legend text-white">Health is Wealth</p>
                </div>
                <div>
                    <img src={img3} />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={img4} />
                    <p className="legend">Legend 4</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;