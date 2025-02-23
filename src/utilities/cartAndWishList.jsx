import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const useCartUtilities = () => {
    const [instance] = useAxiosSecure(); // Move inside a hook-safe function

    const addToCart = (product) => {
        const savedCart = localStorage.getItem("cart");
        let cart = savedCart ? JSON.parse(savedCart) : [];

        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const removeItemFromCart = async (productId, user) => {
        const savedCart = localStorage.getItem("cart");
        if (!savedCart) return;

        const cart = JSON.parse(savedCart).filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));

        if (user?.email) {
            try {
                const response = await instance.delete(`/carts/${productId}`);

                if (response.status === 200) {
                    console.log("Item removed from DB successfully");
                } else {
                    console.error("Failed to remove item from DB");
                }
            } catch (error) {
                console.error("Error removing item from DB:", error);
            }
        }
    };

    const mergeCarts = async (dbCart, localCart, userEmail) => {
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
        console.log(mergedCart);
        try {
            const res = await instance.post(`/carts/email=${userEmail}`, mergedCart);
            if (res?.data?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cart Synced Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            localStorage.removeItem("cart");
        } catch (error) {
            console.error("Error merging carts:", error);
        }

        return mergedCart;
    };

    const getCartItems = async (user) => {
        if (user?.email) {
            try {
                const response = await instance.get(`/carts/${user.email}`);
                if (response.status === 200) {
                    const dbCart = response.data;
                    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                    return await mergeCarts(dbCart, localCart, user.email);
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

        const userCart = cart.map((item) => ({
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            totalQuantity: item.totalQuantity,
        }));

        try {
            const response = await instance.post(`/carts`, { userCart });
            if (response.status === 200) {
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
