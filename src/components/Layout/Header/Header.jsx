import React, { useState } from "react";
import "./Header.scss";
import { searchvalue } from "../../../reduxToolkit/PostsSlice/postsSlice";
import { useDispatch } from "react-redux";

const Header = () => {
	// const [searched, setSearched] = useState('')
	const dispacth = useDispatch();
  
	return (
		<header className="header">
			<button className="header__left">add post</button>
			<div className="header__right">
				<input placeholder="search by name or id" type="search" onChange={(e)=>dispacth(searchvalue(e.target.value))}/>
				<select name="" id="" className={"header__right__select"}>
					<option value="">almaz</option>
					<option value="">almaz</option>
					<option value="">almaz</option>
					<option value="">almaz</option>
				</select>
			</div>
		</header>
	);
};

export default Header;
