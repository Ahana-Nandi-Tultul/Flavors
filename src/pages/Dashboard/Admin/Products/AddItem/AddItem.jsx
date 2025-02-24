import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const AddItem = () => {
    const [instance] = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset
      } = useForm();
    const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    

    const onSubmit = async(data) =>{
        // console.log(data)

        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            // console.log(imgResponse);
            const imgURL = imgResponse.data.display_url;
            const {name, price, quantity, category, rating} = data

        const newItem = {
            name, 
            price : parseInt(price), 
            quantity : parseInt(quantity), 
            image: imgURL, 
            category, 
            rating : parseFloat(rating)};

         instance.post('/item', {newItem})
         .then(res => {
            // console.log(res?.data);
            if(res?.data?.insertedId){
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/dashboard/adminAllItems');
            }
         })

        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: `${error?.message}`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    }
    
    return (
        <div className={`w-full p-4`}>
            <h2 className="text-center text-3xl my-10 font-semibold">Add Item</h2>
            <hr />
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className={`label-text`}>Item Name*</span>
                            </label>
                            <input type="text" {...register('name', {required: true})} placeholder="Item Name"
                             className={`input input-bordered`} required/>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className={`label-text `}>Price*</span>
                            </label>
                            <input type="number" {...register('price', {required: true})} placeholder="Item Price"
                            className={`input input-bordered `} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className={`label-text`}>Quantity*</span>
                            </label>
                            <input type="text" placeholder="Available Quantity" {...register('quantity', {required: true})}
                             className={`input input-bordered `} required />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className={`label-text`}>Category*</span>
                            </label>
                            <input type="text" placeholder="Category" 
                            {...register('category', {required: true})}
                            className={`input input-bordered`} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        <div className="form-control w-full">
                            <label className="label"> 
                                <span className={`label-text`}>Rating*</span>
                            </label>
                            <input type="text" placeholder="Rating" {...register('rating', {required: true})}
                            className={`input input-bordered`} required/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className={`label-text `}>Item Image*</span>
                            </label>
                            <input type="file" 
                            {...register('image', {required: true})}
                            className = {`file-input file-input-bordered w-full`} required/>
                        </div>
                    </div>
                    <input type="submit" value="Add Item" className="btn btn-active bg-[#2ccf31] text-white w-full"/>
                </form>
            </div>
        </div>
    );
};

export default AddItem;