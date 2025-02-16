import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import slide1 from "../../../assets/category/vegetables.jpg";
import slide2 from "../../../assets/category/fruits.jpg";
import slide3 from "../../../assets/category/wheat.jpg";
import slide4 from "../../../assets/category/meat.jpg";
import slide5 from "../../../assets/category/fish.jpg";
import slide6 from "../../../assets/category/rice.jpg";
import SectionTitle from '../../../components/sectionTile/SectionTitle';


const Category = () => {
    return (
        <section>
            <SectionTitle
            heading={"Our Category"}
            subHeading={"Please choose as you like"}></SectionTitle>
            <div className='mb-20'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={slide1} alt="" style={{ height: "250px", width: "100%" }} />
                        <h4 className='text-4xl uppercase text-center -mt-12 text-white'>Vegetables</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide2} alt="" style={{ height: "250px", width: "100%" }} />
                        <h4 className='text-4xl uppercase text-center -mt-12 text-white'>Fruits</h4>

                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide3} alt="" style={{ height: "250px", width: "100%" }} />
                        <h4 className='text-4xl uppercase text-center -mt-12 text-white'>Wheat</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide4} alt="" style={{ height: "250px", width: "100%" }} />
                        <h4 className='text-4xl uppercase text-center -mt-12 text-white'>Meat</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide5} alt="" style={{ height: "250px", width: "100%" }} />
                        <h4 className='text-4xl uppercase text-center -mt-12 text-white'>Fish</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide6} alt="" style={{ height: "250px", width: "100%" }} />
                        <h4 className='text-4xl uppercase text-center -mt-12 text-white'>Rice</h4>
                    </SwiperSlide>
                </Swiper>
            </div>

        </section>

    );
};

export default Category;