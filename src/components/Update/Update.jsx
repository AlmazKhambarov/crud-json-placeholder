import React, { useEffect, useState } from "react";
import "./Update.scss";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../reduxToolkit/PostsSlice/postsSlice";
const Update = ({ posts }) => {
	const dispatch = useDispatch();
	console.log(posts.userId);
	const [data, setData] = useState({
		userId: posts.userId,
		id: posts.id,
		username: "",
		body: "",
	});
	useEffect(() => {
		if (posts) {
			setData(posts);
		}
	}, [posts]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updatePosts(data));
	};
	return (
		<div className={"update"}>
			<form onSubmit={handleSubmit}>
				<input
					onChange={(e) =>
						setData((prev) => ({ ...prev, username: e.target.value }))
					}
					value={data?.username}
					type="text"
					placeholder="name"
				/>
				<textarea
					onChange={(e) =>
						setData((prev) => ({ ...prev, body: e.target.value }))
					}
					value={data?.body}
					placeholder="title"
				></textarea>
				<div className="update__btn">
					<button className="update__btn__submit" type="submit">
						Submit
					</button>
					<button onClick={() => {}} className={"update__btn__cancel"}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default Update;
