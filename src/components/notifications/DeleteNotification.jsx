import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePostReducer } from "../../reduxToolkit/PostsSlice/postsSlice";
import { useDispatch } from "react-redux";
import './DeleteNotification.scss'
const DeleteNotification = ({ deleteId }) => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(deletePostReducer(deleteId));
    toast.dismiss();  
  };

  const handleCancel = () => {
    toast.error("Cancelled!");
  };
  const openConfirmDialog = () => {
    toast.info(
      <div className="confirm_main">
        <p>Are you sure you want to Delete</p>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        closeButton: false,
        className: "custom-confirm-dialog",
        bodyClassName: "custom-confirm-dialog-body",
      }
    );
  };
  return (
    <div>
      <span onClick={openConfirmDialog}>
        Delete
        <DeleteIcon />
      </span>
      <ToastContainer />
    </div>
  );
};

export default DeleteNotification;
