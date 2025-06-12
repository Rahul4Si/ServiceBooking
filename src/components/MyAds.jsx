import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/Api";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import UpdateDialog from "./UpdateDialog";

const MyAds = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [adId,setAdId] = useState(1)
  const [loading, setLoading] = useState(true);
  const [openUpdateAdd, setOpenUpdateAdd] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/company/ad/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
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

  const handleDelete = async (adId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("You must be logged in to delete an ad.");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/company/ad/${adId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
      } else {
        setError("Failed to delete ad.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to delete ad.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="px-40 py-10">
        <h1 className="text-3xl font-bold mb-8 ">My Ads</h1>
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
                  <hr className="my-4 border-t border-gray-300" />
                  <div className="flex justify-between gap-4 mt-2">
                    <Button
                      onClick={() => {setOpenUpdateAdd(true),setAdId(ad.id)}}
                      size="large"
                      fullWidth
                      sx={{
                        backgroundColor: "#fb923c",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 18,
                        mr: 2,
                        "&:hover": { backgroundColor: "#f97316" },
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(ad.id)}
                      size="large"
                      fullWidth
                      color="secondary"
                      sx={{
                        fontWeight: 600,
                        fontSize: 18,
                        mr: 2,
                        "&:hover": {
                          border: "1px solid",
                          borderColor: "#f44336",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
      {
        openUpdateAdd && <UpdateDialog open={openUpdateAdd} setOpen={setOpenUpdateAdd} adId={adId} />
      }
      
    </>
  );
};

export default MyAds;
