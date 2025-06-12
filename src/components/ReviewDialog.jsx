import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import axios from "axios";
import { BASE_URL } from "../api/Api";

const ReviewDialog = ({ openReviewDialog, setOpenReviewDialog, bookId }) => {
  const [text, setText] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const handleClose = () => setOpenReviewDialog(false);

  React.useEffect(() => {
    setText("");
    setRating(0);
  }, [openReviewDialog]);

  const handlePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You must be logged in to post a review.");
      return;
    }

    if (text.length === 0 || rating === 0) {
      alert("Please write a review and give a rating.");
      return;
    }

    try {
      const responst = await axios.post(
        `${BASE_URL}/api/client/review`,
        {
          bookId,
          userId,
          review: text,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      if (responst.status === 200) {
        alert("Review posted successfully!");
        setOpenReviewDialog(false);
        setText("");
        setRating(0);
      } else {
        alert("Failed to post review. Please try again.");
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  }

  return (
    <Dialog
      open={openReviewDialog}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 6,
          minWidth: 400,
          maxWidth: 500,
          background: "#f9fafb",
          boxShadow: 24,
        },
      }}
    >
      <form onSubmit={handlePost} className="bg-white rounded-xl p-6">
        <DialogTitle>
          <Typography
            align="center"
            className="font-bold text-gray-800 text-2xl"
          >
            <b>Post Your Review</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            name="review"
            label="Write a review here"
            placeholder="Write a review here"
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={4}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fb923c" },
                "&:hover fieldset": { borderColor: "#f97316" },
                "&.Mui-focused fieldset": { borderColor: "#f97316" },
              },
            }}
          />
          <div className="flex justify-center my-4">
            <Rating
              name="no-value"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              sx={{
                color: '#fb923c',
                fontSize: 32,
              }}
            />
          </div>
        </DialogContent>
        <button
        type="submit"
          className={`w-full py-2 rounded font-semibold text-lg mt-2 shadow transition 
            ${text.length === 0 || rating === 0
              ? 'bg-orange-200 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'}
          `}
          disabled={text.length === 0 || rating === 0}
        >
          Post
        </button>
      </form>
    </Dialog>
  );
};

export default ReviewDialog;
