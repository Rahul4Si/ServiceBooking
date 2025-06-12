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

const PostAddDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({
    file: null,
    serviceName: "",
    price: "",
    description: "",
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      toast.warning("You must be logged in to create an ad.");
      navigate("/login");
    }
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { file, serviceName, price, description } = formValues;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!file || !serviceName || !price || !description) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    try {
      // Use FormData to send file and fields as multipart/form-data
      const formData = new FormData();
      formData.append('img', file); // 'img' matches the field in AdDto
      formData.append('serviceName', serviceName);
      formData.append('price', price);
      formData.append('description', description);

      const response = await axios.post(
        `${BASE_URL}/api/company/ad/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Ad created successfully!");
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create ad. Please try again.");
    }
  };

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
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6">
          <DialogTitle>
            <Typography align="center" className="font-bold text-gray-800">
              Create Ad
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
                        src={URL.createObjectURL(formValues.file)}
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
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default PostAddDialog;
