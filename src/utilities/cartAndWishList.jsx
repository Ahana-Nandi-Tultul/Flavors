import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useCartUtilities = () => {
    const [instance] = useAxiosSecure(); 
    const addToCart = (product) => {
        const savedCart = localStorage.getItem("cart");
        let cart = savedCart ? JSON.parse(savedCart) : [];
    
        const existingProduct = cart.find((item) => item._id === product._id);
        if (existingProduct) {
            
            existingProduct.quantity += product.quantity;
            existingProduct.totalPrice += product.totalPrice;
    
            cart = cart.filter((item) => item._id !== product._id);
    
            // Add updated product
            cart.push(existingProduct);
        } else {
            cart.push(product);
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
    };
    

    const removeItemFromCart = async (productId, user) => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart){
            const cart = JSON.parse(savedCart).filter((item) => item._id !== productId);
            localStorage.setItem("cart", JSON.stringify(cart));    
        }
        if (user?.email) {
            try {
                console.log(productId);
                const response = await instance.delete(`/carts/${productId}`);

                if (response.status === 200) {
                    Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your product is deleted from the cart',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          navigate('/');
                } else {
                    console.error("Failed to remove item from DB");
                }
            } catch (error) {
                console.error("Error removing item from DB:", error);
            }
        }
        return;
    };

    const mergeCarts = (dbCart, localCart, userEmail) => {
        const mergedCart = [...dbCart];

        localCart.forEach((localItem) => {
            const existingItem = mergedCart.find((dbItem) => dbItem.id === localItem.id);

            if (existingItem) {
                existingItem.quantity += localItem.quantity;
                existingItem.totalPrice += localItem.totalPrice;
            } else {
                mergedCart.push({ ...localItem, userEmail });
            }
        });

        return mergedCart;
    };

    const getCartItems = async (user) => {
        if (user?.email) {
            try {
                const response = await instance.get(`/carts/${user.email}`);
                if (response.status === 200) {
                    const dbCart = response.data;
                    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                    return mergeCarts(dbCart, localCart, user.email);
                } else {
                    console.error("Failed to fetch cart from DB.");
                    return JSON.parse(localStorage.getItem("cart")) || [];
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                return JSON.parse(localStorage.getItem("cart")) || [];
            }
        } else {
            return JSON.parse(localStorage.getItem("cart")) || [];
        }
    };

    const syncLocalStorageWithDB = async (user) => {
        if (!user) return;
    
        const savedCart = localStorage.getItem("cart");
        let cart = savedCart ? JSON.parse(savedCart) : [];
        if (!cart.length) return;
    
        // Correct mapping of cart items
        const userCart = cart.map((item) => ({
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            productId: item._id, // Fix: Ensure correct key (_id instead of id)
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
        }));
    
        try {
            const response = await instance.post(`/carts`, {userCart}); // Fix: Send array directly
            if (response.status === 200 || response.status === 201) {
                console.log("Cart successfully synced to DB");
                localStorage.removeItem("cart");
            } else {
                console.error("Failed to sync cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error syncing cart:", error);
        }
    };
    

    return {
        addToCart,
        removeItemFromCart,
        getCartItems,
        syncLocalStorageWithDB,
    };
};

export default useCartUtilities;

/*
const addToWishlist = (product) => {
        const savedWishlist = localStorage.getItem("wishlist");
        let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

        if (!wishlist.find((item) => item.id === product.id)) {
            wishlist.push(product);
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    };

    const removeFromWishlist = (productId) => {
        const savedWishlist = localStorage.getItem("wishlist");
        if (!savedWishlist) return;

        const wishlist = JSON.parse(savedWishlist).filter((item) => item.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    };

    const getWishlistItems = () => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    };

    addToWishlist,
    removeFromWishlist,
    getWishlistItems,
*/
