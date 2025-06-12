import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../api/Api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const UpdateDialog = ({ open, setOpen, adId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    file: null,
    serviceName: "",
    price: "",
    description: "",
  });

  React.useEffect(() => {
    const fetchAd = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/company/ad/company/${adId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const ad = response.data;
          console.log(response.data);
          setFormValues({
            file: ad.returnedImg
              ? `data:image/jpeg;base64,${ad.returnedImg}`
              : "https://via.placeholder.com/200x200?text=No+Image", // File input is always null initially
            serviceName: ad.serviceName || "",
            price: ad.price || "",
            description: ad.description || "",
            // You can add other fields if needed
          });
        } else {
          setError("Failed to fetch ads.");
        }
      } catch (err) {
        setError("Failed to fetch ads.");
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormValues((prev) => ({
        ...prev,
        file, // keep the File object for upload
        filePreview: previewUrl, // add a preview URL for display
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { file, serviceName, price, description } = formValues;
    const token = localStorage.getItem("token");
    if (!file || !serviceName || !price || !description) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    try {
      // Use FormData to send file and fields as multipart/form-data
      const formData = new FormData();
      // Only append if file is a File object (user selected a new image)
      if (file && typeof file !== "string") {
      formData.append("img", file);
    }
      formData.append("serviceName", serviceName);
      formData.append("price", price);
      formData.append("description", description);

      console.log("update component",adId);
      const response = await axios.put(
        `${BASE_URL}/api/company/ad/${adId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Ad Updated successfully!");
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create ad. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 6,
            minWidth: 600,
            maxWidth: 700,
            background: "#f9fafb",
            boxShadow: 24,
          },
        }}
      >
        <form onSubmit={handleUpdate} className="bg-white rounded-xl p-6">
          <DialogTitle>
            <Typography align="center" className="font-bold text-gray-800">
              Update Ad
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={4}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <div className="flex-shrink-0">
                  {!formValues.file && (
                    <Box mb={2}>
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 8,
                          background: "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                          fontSize: 14,
                          border: "1px dashed #d1d5db",
                        }}
                      >
                        No Image
                      </div>
                    </Box>
                  )}
                  {formValues.file && (
                    <Box mb={2}>
                      <img
                        src={formValues.filePreview || formValues.file}
                        alt="Selected"
                        style={{
                          maxWidth: 100,
                          maxHeight: 100,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <label
                    htmlFor="file-upload"
                    className="w-[100px] h-[100px] border border-gray-300 rounded bg-gray-50 text-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <span className="text-center">Choose Image</span>
                    <input
                      id="file-upload"
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </Box>
              <TextField
                name="serviceName"
                label="Service Name"
                variant="outlined"
                value={formValues.serviceName}
                fullWidth
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#374151" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d1d5db" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#6b7280" },
                  },
                }}
              />
              <TextField
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                value={formValues.price}
                fullWidth
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#374151" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d1d5db" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#6b7280" },
                  },
                }}
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                onChange={handleChange}
                value={formValues.description}
                InputLabelProps={{ style: { color: "#374151" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d1d5db" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#6b7280" },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              className="bg-orange-500 w-5/6 text-white font-semibold px-8 py-2 rounded hover:bg-orange-600 transition text-lg"
              sx={{
                backgroundColor: "#fb923c",
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                "&:hover": { background: "#f97316" },
              }}
            >
              Update now
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateDialog;
