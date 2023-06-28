import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePostReducer } from "../../reduxToolkit/PostsSlice/postsSlice";
import { useDispatch } from "react-redux";
import "./DeleteNotification.scss";

const DeleteNotification = ({ deleteId }) => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
	toast.dismiss();  
    dispatch(deletePostReducer(deleteId));
    toast.success('SuccsessFully Deleted');
  };

  const handleCancel = () => {
	toast.dismiss();  
    toast.error("Cancelled!");
  };
  const openConfirmDialog = () => {
    toast.info(
      <>
        <p>Are you sure you want to proceed?</p>
        <div className="confirmButtons">
          <button onClick={handleConfirm} className="confirmBtn">Confirm</button>
          <button onClick={handleCancel} className="cancelBtn">Cancel</button>
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
        Delete
      </span>
      <ToastContainer />
    </div>
  );
};

export default DeleteNotification;
