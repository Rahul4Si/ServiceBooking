import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/Api";

const ReviewByAdId = ({ adId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found, user might not be authenticated.");
        return;
    }

    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/client/reviews/${adId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
            console.log(response.data);
          setReviews(response.data);
        } else {
          setError("Failed to fetch reviews.");
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [adId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200 mx-40 px-5 pb-5  my-8">
      <h3 className="text-2xl font-bold text-orange-600 mb-2">All Reviews</h3>
      <hr className="border-t-2 border-orange-200 mb-8" />
      {reviews.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No reviews found.</p>
      ) : (
        <ul className="space-y-4 px-5">
          {reviews.map((review) => (
            <li key={review._id} className="bg-orange-50 rounded-lg p-4 shadow flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-orange-500">{review.clientName || 'Anonymous'}</span>
                {review.rating && (
                  <span className="ml-2 text-yellow-500 font-bold">{'★'.repeat(review.rating)}<span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span></span>
                )}
              </div>
              <p className="text-gray-700 text-base">Re{review.review}</p>
              <span className="text-xs text-gray-400 mt-1">Posted On : {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : '-'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewByAdId;
