import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://localhost:5000";

const MyCart = () => {
    const uid = sessionStorage.getItem("uid");
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCart = async () => {
        if (!uid) {
            alert("Please login first");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.get(`${API}/bookingWithCart/${uid}`);
            if (res.data.success) setBookings(res.data.data || []);
            else setBookings([]);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to load cart");
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
        // eslint-disable-next-line
    }, [uid]);

    const updateQty = async (itemId, newQty) => {
        if (newQty < 1) return;
        try {
            await axios.put(`${API}/cart/${itemId}`, { quantity: newQty });
            loadCart();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update failed");
        }
    };

    const removeItem = async (itemId) => {
        if (!window.confirm("Remove this item?")) return;
        try {
            await axios.delete(`${API}/cart/${itemId}`);
            loadCart();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const placeOrder = async (bookingId) => {
        try {
            const res = await axios.put(`${API}/booking/placeorder/${bookingId}`);
            alert(res.data.message || "Order placed");
            navigate(`/user/payment/${bookingId}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Place order failed");
        }
    };

    return (
        <div>
            <h2>My Cart</h2>
            {loading && <p>Loading...</p>}

            {bookings.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                bookings.map((b) => {
                    const total = (b.cartItems || []).reduce((s, it) => s + (Number(it.cartTotal) || 0), 0);

                    return (
                        <div key={b._id} style={{ marginBottom: 30 }}>
                            <h3>Booking: {b._id}</h3>
                            <p>Status: {b.bookingStatus}</p>

                            <table border="1" cellPadding="10" cellSpacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(b.cartItems || []).length === 0 ? (
                                        <tr>
                                            <td colSpan="6" align="center">
                                                No items
                                            </td>
                                        </tr>
                                    ) : (
                                        b.cartItems.map((it) => {
                                            const qty = Number(it.cartQuantity || 1);
                                            const price = Number(it.product?.productPrice || 0);
                                            const subtotal = Number(it.cartTotal || price * qty);

                                            return (
                                                <tr key={it._id}>
                                                    <td>
                                                        {it.product?.productPhoto ? (
                                                            <img
                                                                src={`${API}/public/uploads/${it.product.productPhoto}`}
                                                                alt="p"
                                                                width="70"
                                                            />
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        <b>{it.product?.productName}</b>
                                                        <div>{it.product?.productDetails}</div>
                                                    </td>
                                                    <td>{price}</td>
                                                    <td>
                                                        <button onClick={() => updateQty(it._id, qty - 1)} disabled={qty <= 1}>
                                                            -
                                                        </button>
                                                        <span style={{ margin: "0 10px" }}>{qty}</span>
                                                        <button onClick={() => updateQty(it._id, qty + 1)}>+</button>
                                                    </td>
                                                    <td>{subtotal}</td>
                                                    <td>
                                                        <button onClick={() => removeItem(it._id)}>Remove</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}

                                    <tr>
                                        <td colSpan="4" align="right">
                                            <b>Total</b>
                                        </td>
                                        <td colSpan="2">
                                            <b>{total}</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <br />
                            <button onClick={() => placeOrder(b._id)}>Place Order</button>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MyCart;