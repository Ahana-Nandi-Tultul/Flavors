
const UpdateItemModal = ({ itemUpdate, handleItemUpdate, openUpdateItemModal, setOpenUpdateItemModal }) => {
    return (
        <>
            <div className={`fixed inset-0  items-center justify-center z-50 bg-black bg-opacity-50
          ${openUpdateItemModal ? 'flex' : 'hidden'}`}>
                <div className={` p-6 rounded-lg shadow-lg md:w-1/2 w-3/4 relative`}>
                    <button
                        onClick={() => setOpenUpdateItemModal(false)}
                        className={`btn btn-circle btn-outline absolute top-1 right-1`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className={`modal-box max-w-none w-full`}>
                        <h2 className="text-xl font-bold mb-4">Update {itemUpdate.name}</h2>
                        <hr />
                        <form onSubmit={() => handleItemUpdate(itemUpdate)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className={`label-text`}>Name*</span>
                                    </label>
                                    <input type="text" defaultValue={itemUpdate?.name} name="name"
                                        className={`input input-bordered`} required />
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className={`label-text`}>Price*</span>
                                    </label>
                                    <input type="number" defaultValue={itemUpdate?.price} name="price"
                                        className={`input input-bordered`} required />
                                </div>
                            </div>
                            <div className="form-control w-full mb-7">
                                <label className="label">
                                    <span className={`label-text`}>Available Quantity*</span>
                                </label>
                                <input type="text" defaultValue={itemUpdate?.quantity} name="quantity"
                                    className={`input input-bordered`} required />
                            </div>
                            <input type='submit' value="Submit" className="btn bg-[#2ccf31] text-white" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateItemModal;