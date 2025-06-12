import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/Api";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CompanyDashBoard = () => {
  const { userId } = useParams();
  const [reservationStatus, setReservationStatus] = useState("");
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [adId, setAdId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openUpdateAdd, setOpenUpdateAdd] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/company/bookings/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setAds(response.data);
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
    fetchAds();
  }, [userId]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString(); // e.g., "6/12/2025"
    const formattedTime = date.toLocaleTimeString(); // e.g., "5:03:28 PM"

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

const handleUpdateStatus = async (id, status) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated.");
    return;
  }

  try {
    console.log(`Updating booking ${id} to ${status}`);
    const response = await axios.get(
      `${BASE_URL}/api/company/booking/${id}/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success(`Booking ${status.toLowerCase()} successfully!`);
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === id ? { ...ad, reservationStatus: status } : ad
        )
      );
    } else {
      toast.error(`Failed to ${status.toLowerCase()} booking.`);
    }
  } catch (error) {
    console.error( error);
    toast.error(`An error occurred while ${status.toLowerCase()}ing booking.`);
  }
};



  return (
    <div className=" bg-gradient-to-br from-orange-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-10 px-4 tracking-tight drop-shadow-lg">
          Company Dashboard
        </h1>
        <TableContainer
          component={Paper}
          className="rounded-2xl shadow-2xl border border-orange-200 bg-white px-4 py-10"
        >
          <Table sx={{ minWidth: 650 }} aria-label="company bookings table">
            <TableHead>
              <TableRow className="bg-orange-100">
                <TableCell className="text-orange-600 font-bold text-lg">
                  Client Name
                </TableCell>
                <TableCell
                  align="right"
                  className="text-orange-600 font-bold text-lg"
                >
                  Service
                </TableCell>
                <TableCell
                  align="right"
                  className="text-orange-600 font-bold text-lg"
                >
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  className="text-orange-600 font-bold text-lg"
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  className="text-orange-600 font-bold text-lg"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads.map((row, idx) => (
                <TableRow
                  key={row.id || idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="hover:bg-orange-50 transition duration-200"
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="font-semibold text-gray-800 text-base"
                  >
                    {row.userName || row.client_name || "N/A"}
                  </TableCell>
                  <TableCell align="right" className="text-gray-700 text-base">
                    {row.serviceName || row.service_name || "N/A"}
                  </TableCell>
                  <TableCell align="right" className="text-gray-700 text-base">
                    {formatDateTime(row.bookDate).date}{" "}
                    <span className="text-gray-400">-</span>{" "}
                    {formatDateTime(row.bookDate).time}
                  </TableCell>
                  <TableCell align="right" className="text-base">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-xs ${
                        row.reservationStatus === "Approved"
                          ? "bg-green-100 text-green-700"
                          : row.reservationStatus === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {row.reservationStatus || "PENDING"}
                    </span>
                  </TableCell>
                  {row.reservationStatus === "PENDING" && (
                    <TableCell align="right" className="space-x-2">
                      <Button
                        onClick={() => handleUpdateStatus(row.id, "Approved")}
                        size="small"
                        variant="contained"
                        sx={{
                          background: "#22c55e",
                          color: "#fff",
                          fontWeight: 600,
                          borderRadius: "0.5rem",
                          "&:hover": { background: "#16a34a" },
                          textTransform: "none",
                          fontSize: 14,
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleUpdateStatus(row.id, "Rejected")}
                        size="small"
                        variant="contained"
                        sx={{
                          background: "#ef4444",
                          color: "#fff",
                          fontWeight: 600,
                          borderRadius: "0.5rem",
                          "&:hover": { background: "#b91c1c" },
                          textTransform: "none",
                          fontSize: 14,
                        }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CompanyDashBoard;
