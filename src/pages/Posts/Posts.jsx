import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_all_users,
  Get_saved_data,
  getPostsComment,
  get_all_posts,
  get_all_postss,
} from "../../reduxToolkit/extraReducer";
import UpdateIcon from "@mui/icons-material/Update";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Pagination } from "@mui/material";
import "./Post.scss";
import DeleteNotification from "../../components/notifications/DeleteNotification";
import Update from "../../components/Update/Update";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SavedNotification from "../../components/notifications/SavedNotification";
const Posts = () => {
  const { postsData, users, postCommentData, searchedvalue, savedPosts ,isSavedAction, loading} =
    useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [activeComment, setActiveComment] = useState(0);
  const [activeCommentModal, setActiveCommentModal] = useState(false);
  const [filtredUser, setFiltredUser] = useState([]);
  const [isInSaved, setIsInSaved] = useState(false);
  const [updatedData, setUpdatedData] = useState();
  const [updateActive, setUpdateActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeUpdatedData, setActiveUpdatedData] = useState(0);

  const [searchFiltred, setSearchFiltred] = useState([]);
  useEffect(() => {
    dispatch(Get_all_users());
    dispatch(get_all_postss());
    dispatch(Get_saved_data());
  }, [searchedvalue]);
  useEffect(() => {
    const arr = [];
    postsData?.forEach((el) => {
      const usersname = users?.find((i) => i.id == el.userId);
      const saveds = savedPosts?.find((item) => item.uid == el.id);
      arr.push({
        id: el.id,
        name: usersname?.name,
        body: el.body,
        userId: el.userId,
        isSaved: saveds?.uid,
      });
    });
    setFiltredUser(arr);
  }, [loading, users, savedPosts, isSavedAction]);
  console.log(postsData);
  const search = filtredUser.filter(
    (data) =>
      data.id?.toString().toLowerCase().includes(searchedvalue.toLowerCase()) ||
      data?.name?.toLowerCase().includes(searchedvalue.toLowerCase()) ||
      data?.body?.toLowerCase().includes(searchedvalue.toLowerCase())
  );
  useEffect(() => {
    if (!searchedvalue) {
      setSearchFiltred(filtredUser);
    } else {
      setSearchFiltred(search);
    }
  }, [searchedvalue, filtredUser, users]);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(searchFiltred?.length / itemsPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, [itemsPerPage]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = searchFiltred?.slice(startIndex, endIndex);
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  return (
    <div className="posts_main">
      <div className="cards">
        {paginatedData?.map((post) => (
          <>
            <div className="card" key={post.id}>
              <span>{post.id}</span>
              <span>{post?.name}</span>
              <p>{post.body}</p>
              <div className="actions">
                <button
                  className={` ${
                    activeComment === post.id && activeCommentModal
                      ? "activeBtn"
                      : "nonActiveBtn"
                  }`}
                  onClick={() =>
                    (dispatch(getPostsComment(post.id)) &&
                      setActiveComment(post.id)) ||
                    setActiveCommentModal(!activeCommentModal)
                  }
                >
                  Comment
                  <CommentIcon />
                </button>
                <button
                  className={`update_btn `}
                  onClick={() =>
                    setUpdateActive(!updateActive) ||
                    setUpdatedData(post) ||
                    setActiveUpdatedData(post.id)
                  }
                >
                  update <UpdateIcon />
                </button>
                <button class={"delete_btn"}>
                  <DeleteNotification deleteId={post.id} />
                </button>
                <button
                  className={`${
                    post.isSaved == post.id ? "activeSaved" : null
                  }`}
                >
                  <SavedNotification savedData={post} />
                </button>
              </div>
              <div class={"update"}>
                <p
                  className={`${
                    activeComment == post.id && activeCommentModal
                      ? "activeComment"
                      : "isActiveComment"
                  }`}
                >
                  {postCommentData?.map((comment) => (
                    <p>{comment.body}</p>
                  ))}
                </p>
              </div>
              <div
                className={`${
                  activeUpdatedData === post.id && updateActive
                    ? "activeModal"
                    : "nonActiveModal"
                }`}
              >
                {/* {updateActive ? ( */}
                <Update
                  posts={updatedData}
                  updateActive={updateActive}
                  setActiveUpdatedData={setActiveUpdatedData}
                  setUpdateActive={setUpdateActive}
                />
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="pagination">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </div>
    </div>
  );
};

export default Posts;
