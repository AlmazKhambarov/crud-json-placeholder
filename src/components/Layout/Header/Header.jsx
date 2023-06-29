import React, { useEffect, useState } from "react";
import "./Header.scss";
import { searchvalue } from "../../../reduxToolkit/PostsSlice/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Get_all_users } from "../../../reduxToolkit/extraReducer";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: "40vw",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const Header = () => {
	const [open, setOpen] = React.useState(false);
	const { pathname } = useLocation();
	const { users } = useSelector((state) => state.posts);
	const dispacth = useDispatch();
	useEffect(() => {
		dispacth(Get_all_users());
	}, []);

	const handleSubmit = () => {
		dispacth();
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<header className="header">
			<button className="header__left" onClick={handleOpen}>
				add post
			</button>
			<div className="header__right">
				<input
					placeholder="search by name or id"
					type="search"
					onChange={(e) => dispacth(searchvalue(e.target.value))}
				/>
				FIlter by
				<select defaultChecked className={"header__right__select"}>
					{pathname === "/todos" ? (
						<>
							<option>default</option>
							<option>Completed</option>
							<option>IsCompleted</option>
						</>
					) : (
						users?.map((el) => <option>{el.name}</option>)
					)}
				</select>
			</div>
			<div>
				<Button onClick={handleOpen}></Button>
				<Modal open={open} onClose={handleClose}>
					<Box sx={style}>
						<form onSubmit={handleSubmit}>
							<div className="submit_post">
								<input type="text" placeholder="Title" />
								<select>
									{users.map((el) => (
										<option value="">{el.name}</option>
									))}
								</select>
								<div>
									<button type="submit">cancel</button>
									<button type="submit">Submit</button>
								</div>
							</div>
						</form>
					</Box>
				</Modal>
			</div>
		</header>
	);
};

export default Header;
