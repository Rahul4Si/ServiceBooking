import React, { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/Api";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import UpdateDialog from "./UpdateDialog";

const AllAds = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [adId, setAdId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openUpdateAdd, setOpenUpdateAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/client/ads`);
        if (response.status === 200) {
          setAllAds(response.data);
          setAds(response.data);
        } else {
          setError("Failed to fetch ads.");
        }
      } catch (err) {
        setError("Failed to fetch ads.");
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [userId]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setAds(allAds);
      return;
    }
    const filteredAds = allAds.filter((ad) =>
      ad.serviceName.toLowerCase().includes(value)
    );
    setAds(filteredAds);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="px-40 py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Ads</h1>
          <input
            type="text"
            placeholder="Search ads..."
            className="border border-gray-300 rounded px-4 py-2 mb-6 w-full max-w-md"
            onChange={handleChange}
          />
        </div>
        <hr className="border-t-2 border-orange-200 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="rounded-xl overflow-hidden shadow-md bg-slate-50 flex flex-col transition-shadow duration-200 hover:shadow-orange-300 hover:shadow-2xl"
            >
              <img
                src={
                  ad.returnedImg
                    ? `data:image/jpeg;base64,${ad.returnedImg}`
                    : "https://via.placeholder.com/200x200?text=No+Image"
                }
                alt={ad.serviceName}
                className="w-48 h-48 object-cover mx-auto"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-md font-semibold text-gray-900">
                  {ad.serviceName}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-semibold">4.9 ★</span>{" "}
                  <span className="text-gray-500">(798)</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">{ad.companyName}</p>
                <p className="text-sm text-gray-700 mt-2">
                  From{" "}
                  <span className="text-orange-600 font-semibold line-through">
                    ₹{Math.round(ad.price * 1.1)}
                  </span>{" "}
                  <span className="text-gray-900 font-semibold">
                    ₹{ad.price}
                  </span>
                </p>
                <Link to={`/booking/${ad.id}`} className="bg-orange-500 text-white shadow-md hover:bg-orange-600 font-medium transition-colors mt-2 px-6 py-2 text-center rounded">
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAds;
