import React from "react";
import "./Header.scss";

const Header = () => {
	return (
		<header className="header">
			<button className="header__left">add post</button>
			<div className="header__right">
				<input placeholder="search by name or id" type="search" />
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
