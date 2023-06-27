import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePostReducer } from "../../reduxToolkit/PostsSlice/postsSlice";
import { useDispatch } from "react-redux";

const DeleteNotification = ({deleteId}) => {
  const dispatch = useDispatch()
  const handleConfirm = () => {
    // Logic to handle confirm action\
    toast.info({
      closeButton: true,
    });
    dispatch(deletePostReducer(deleteId))
    toast.success(deleteId);
  };

  const handleCancel = () => {
    window.location.reload()
    toast.info({
      closeButton: false,
    });
    toast.error("Cancelled!");
  };
  const openConfirmDialog = () => {
    toast.info(
      <div>
        <p>Are you sure you want to proceed?</p>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>,
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
    <div>
      <span onClick={openConfirmDialog}>Delete<DeleteIcon/></span>
      <ToastContainer />
    </div>
  );
};

export default DeleteNotification;
