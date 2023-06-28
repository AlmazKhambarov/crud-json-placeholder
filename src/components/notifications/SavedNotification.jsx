import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../../reduxToolkit/PostsSlice/postsSlice";
import { savedDatas } from "../../reduxToolkit/extraReducer";

const SavedNotification = ({ savedData }) => {
  const dispatch = useDispatch();
  const [isInSaved, setIsInSaved] = useState(false);
  const { savedPosts,isSavedAction} = useSelector((state) => state.posts);
  const handleConfirm = () => {
    // console.log(savedData);
    var data = { ...savedData, uid:savedData.id};
    dispatch(savedDatas(data));
    toast.dismiss();
    toast.success("SuccsessFully saved");
    setTimeout(()=>{window.location.reload()}, 1000)
  };
  const handleCancel = () => {
    toast.dismiss();
    toast.error("Cancelled!");
  };

  const openConfirmDialog = () => {
    toast.info(
      <>
        <p>Are you sure you want to Save?</p>
        <div className="confirmButtons">
          <button onClick={handleConfirm} className="confirmBtn">
            Confirm
          </button>
          <button onClick={handleCancel} className="cancelBtn">
            Cancel
          </button>
        </div>
      </>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: "custom-confirm-dialog",
        bodyClassName: "custom-confirm-dialog-body",
      }
    );
  };
  return (
    <div className="notification">
      <span onClick={openConfirmDialog}>
        <BookmarkBorderIcon />
      </span>
      <ToastContainer />
    </div>
  );
};

export default SavedNotification;
