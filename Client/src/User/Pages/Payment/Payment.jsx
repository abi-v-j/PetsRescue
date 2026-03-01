import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const API = "http://localhost:5000";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [referenceNo, setReferenceNo] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBooking = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/booking/${bookingId}`);
      if (res.data.success) setBooking(res.data.data);
      else setBooking(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) loadBooking();
    // eslint-disable-next-line
  }, [bookingId]);

  const submitPayment = async () => {
    try {
      const res = await axios.put(`${API}/booking/payment/${bookingId}`, {
        paymentMethod,
        referenceNo,
      });

      alert(res.data.message || "Payment success");
      navigate("/mycart"); // or navigate to success page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>No booking found</p>;

  return (
    <div>
      <h2>Payment Page</h2>
      <p><b>Booking ID:</b> {booking._id}</p>
      <p><b>Status:</b> {booking.bookingStatus}</p>
      <p><b>Amount:</b> {booking.bookingAmount}</p>

      <div>
        <label>Payment Method</label>
        <br />
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
      </div>

      <div>
        <label>Reference No (optional)</label>
        <br />
        <input value={referenceNo} onChange={(e) => setReferenceNo(e.target.value)} />
      </div>

      <br />
      <button onClick={submitPayment}>Submit Payment</button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
        Back
      </button>
    </div>
  );
};

export default Payment;