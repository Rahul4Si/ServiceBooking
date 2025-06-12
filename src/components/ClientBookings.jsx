import { Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios from "axios";
import Chip from '@mui/material/Chip';
import { BASE_URL } from "../api/Api";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import ReviewDialog from "./ReviewDialog";

const ClientBookings = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/client/my-bookings/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
            console.log(response.data);
          setAds(response.data);
        } else {
          setError("Failed to fetch ads.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ads.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userId]);

  const handleBookingAgain = async (adId) => {
    navigate(`/booking/${adId}`); 
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 ">
      {ads.length === 0 ? (
        <div className="text-center text-orange-400 text-lg font-semibold">No bookings found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((booking, idx) => (
            <div key={booking.id || idx} className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="font-semibold text-orange-600">{new Date(booking.bookDate).toLocaleDateString()}</p>
                      <p className="text-xs text-orange-400">{new Date(booking.bookDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">Status:</span>
                    {booking.reservationStatus === 'APPROVED' ? (
                      <Chip label="Approved" color="success" />
                    ) : booking.reservationStatus === 'REJECTED' ? (
                      <Chip label="Rejected" sx={{ background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: 13 }} />
                    ) : (
                      <Chip label="Pending" color="success" variant="outlined" />
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-orange-700">{booking.serviceName}</p>
                  <p className="text-sm text-orange-400">{booking.companyName}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => handleBookingAgain(booking.adId)} className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full py-2 font-semibold shadow hover:from-orange-500 hover:to-orange-600 transition">
                  Book Again
                </button>
                {
                    booking.reviewStatus === "FALSE" && (booking.reservationStatus !== "PENDING") && (
                        <button onClick={() => {setBookingId(booking.id),setOpenReviewDialog(true)}} className="flex-1 border-2 border-orange-400 text-orange-500 rounded-full py-2 font-semibold hover:bg-orange-50 transition">
                          Review
                        </button>
                    )
                  }
                  {
                    booking.reviewStatus === "FALSE" && (booking.reservationStatus === "PENDING") && (
                        <button disabled onClick={() => {setBookingId(booking.id),setOpenReviewDialog(true)}} className="flex-1 border-2 text-gray-600 rounded-full py-2 font-semibold bg-gray-100 hover:bg-gray-200 transition">
                          Review Pending
                        </button>
                    )
                  }
              </div>
            </div>
          ))}
          <ReviewDialog
            openReviewDialog={openReviewDialog}
            setOpenReviewDialog={setOpenReviewDialog}
            bookId={bookingId}
          />
        </div>
      )}
    </div>
  );
};

export default ClientBookings;
