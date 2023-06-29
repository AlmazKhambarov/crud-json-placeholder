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
import { selectedPosts } from "../../reduxToolkit/PostsSlice/postsSlice";
const Posts = () => {
  const {
    postsData,
    users,
    postCommentData,
    searchedvalue,
    savedPosts,
    isSavedAction,
    loading,
    selectedPostsData,
  } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
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
      const selected = selectedPostsData?.find((l) => l == el.id);
      arr.push({
        id: el.id,
        name: usersname?.name,
        body: el.body,
        userId: el.userId,
        isSaved: saveds?.uid,
        isSavedId: saveds?.id,
        isChecked: selected,
      });
    });
    setFiltredUser(arr);
  }, [postsData, users, savedPosts, isSavedAction, selectedItems]);
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
  console.log(selectedPostsData);
  return (
    <div className="posts_main">
      <div className="selected_main">
        {selectedPostsData.length > 0 ? (
          <div>
            <button class={"delete_btn"}>
              <DeleteNotification deleteSelecteds={selectedPostsData} />
            </button>
            <button>
              <SavedNotification savedSelects={selectedPostsData} />
            </button>
          </div>
        ) : null}
      </div>
      <div className="cards">
        {paginatedData?.map((post) => (
          <>
            <div
              className={`${
                post.id === post.isChecked ? "avtiveSelect" : null
              } card`}
              key={post.id}
            >
              <div className="card__texts">
                <div className="card_text">
                  <span>{post.id}</span>
                  <h4>{post.name}</h4>
                </div>
                <div className="card_select">
                  <h3>Select</h3>
                  <input
                    value={post.id}
                    type="checkbox"
                    onChange={(event) =>
                      dispatch(
                        selectedPosts({
                          id: post.id,
                          name: post.name,
                          checked: event.target.checked,
                          body: post.body,
                        })
                      )
                    }
                  />
                </div>
              </div>
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
                    <div className="comments_card">
                      <h4>{comment.email}</h4>
                      <p>{comment.body}</p>
                    </div>
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
