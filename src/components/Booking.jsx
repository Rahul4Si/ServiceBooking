import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../api/Api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, Box } from "@mui/material";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import ReviewByAdId from "./ReviewByAdId";

const Booking = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { adId } = params;
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(dayjs());

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token) {
          toast.warning("You must be logged in to view this ad.");
          navigate("/login");
          return;
        }
        const response = await axios.get(`${BASE_URL}/api/client/ad/${adId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAd(response.data.adDto);
        } else {
          setError("Failed to fetch ads.");
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch ads.");
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [adId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      toast.warning("You must be logged in to book a service.");
      navigate("/login");
      return;
    }

    try {
      console.log("date:", value.toISOString());
      const response = await axios.post(
        `${BASE_URL}/api/client/book-service`,
        {
          userId,
          adId,
          bookDate: value.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        toast.success("Service booked successfully!");
      } else {
        toast.error("Failed to book service. Please try again later.");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      toast.error("Failed to book service. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex w-full h-full px-40 py-10 gap-20">
        <div className="w-[60%] bg-gray-100 shadow-md rounded-md p-4">
          <img
            src={
              ad.returnedImg
                ? `data:image/jpeg;base64,${ad.returnedImg}`
                : "https://via.placeholder.com/200x200?text=No+Image"
            }
            alt="Changing door locks"
            className="rounded-md mb-4 mx-auto"
          ></img>
          <h2 className="text-xl font-semibold text-blue-600">
            {ad.serviceName}
          </h2>
          <p className="mt-2">
            <span className="font-semibold">Price :</span> {ad.price}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Description :</span>
            <span>{ad.description}</span>
          </p>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Company Name :</span>{" "}
            {ad.companyName}
          </p>
        </div>
        <div className="w-[40%] bg-white shadow-md rounded-md p-8 flex flex-col justify-between items-center border border-orange-200">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold text-orange-500 mb-4 tracking-tight">
              Book Service
            </h2>
            <hr className="border-t-2  w-full border-orange-200 mb-8" />
          </div>
          <div className="w-full text-center mb-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ p: 0, width: "100%" }} className="mb-6 ">
                <DateTimePicker
                  label="Select date & time"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        "& label": { color: "#fb923c" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#fb923c" },
                          "&:hover fieldset": { borderColor: "#f97316" },
                          "&.Mui-focused fieldset": { borderColor: "#f97316" },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </LocalizationProvider>
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={handleBooking}
            sx={{
              background: "linear-gradient(90deg, #fb923c 0%, #f97316 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              borderRadius: "0.75rem",
              textTransform: "none",
              letterSpacing: 1,
              boxShadow: "0 4px 14px 0 rgba(251,146,60,0.15)",
              transition: "all 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #f97316 0%, #fb923c 100%)",
                boxShadow: "0 6px 20px 0 rgba(251,146,60,0.25)",
              },
            }}
            className="mt-2"
          >
            Book Now
          </Button>
        </div>
      </div>
      <ReviewByAdId adId={adId} />
    </>
  );
};

export default Booking;
