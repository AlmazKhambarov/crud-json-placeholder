import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Get_all_users,
	getPostsComment,
	get_all_posts,
	get_all_postss,
} from "../../reduxToolkit/extraReducer";
import UpdateIcon from "@mui/icons-material/Update";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Pagination } from "@mui/material";
import "./Post.scss";
import { deletePostReducer } from "../../reduxToolkit/PostsSlice/postsSlice";
import DeleteNotification from "../../components/notifications/DeleteNotification";
import Update from "../../components/Update/Update";
const Posts = () => {
	const { postsData, users, deletedAction, postCommentData } = useSelector(
		(state) => state.posts
	);
	const dispatch = useDispatch();
	const [activeComment, setActiveComment] = useState(0);
	const [filtredUser, setFiltredUser] = useState([]);
	const [updatedData, setUpdatedData] = useState();
	const [updateActive, setUpdateAvtive] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeUpdatedData, setActiveUpdatedData] = useState(0);
	useEffect(() => {
		dispatch(Get_all_users());
		dispatch(get_all_postss());
	}, []);
	useEffect(() => {
		const arr = [];
		postsData?.forEach((el) => {
			const usersname = users?.find((i) => i.id == el.userId);
			arr.push({
				id: el.id,
				username: usersname?.username,
				body: el.body,
				userId: el.userId,
			});
		});
		setFiltredUser(arr);
	}, [postsData]);
	console.log(postsData);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(postsData?.length / itemsPerPage);
	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};
	useEffect(() => {
		const savedPage = localStorage.getItem("currentPage");
		if (savedPage) {
			setCurrentPage(parseInt(savedPage, 10));
		}
	}, []);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData = filtredUser?.slice(startIndex, endIndex);
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
							<span>{post.username}</span>
							<p>{post.body}</p>
							<div className="actions">
								<span
									className="comment_btn"
									onClick={() =>
										dispatch(getPostsComment(post.id)) &&
										setActiveComment(post.id)
									}
								>
									Comment
								</span>
								<span
									className="update_btn"
									onClick={() =>
										setUpdateAvtive(!updateActive) || setUpdatedData(post)
									}
								>
									update <UpdateIcon />
								</span>
								<DeleteNotification deleteId={post.id} />
							</div>
							<div>
								<p
									className={`${
										activeComment == post.id
											? "activeComment"
											: "isActiveComment"
									}`}
								>
									{postCommentData?.map((comment) => (
										<p>{comment.body}</p>
									))}
								</p>
							</div>
							<div className={``}>
								{updateActive ? <Update posts={updatedData} /> : null}
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
