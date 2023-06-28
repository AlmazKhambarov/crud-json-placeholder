import React, { useEffect, useState } from "react";
import "./Header.scss";
import { searchvalue } from "../../../reduxToolkit/PostsSlice/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Get_all_users } from "../../../reduxToolkit/extraReducer";

const Header = () => {
  // const [searched, setSearched] = useState('')
  const { users } = useSelector((state) => state.posts);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(Get_all_users());
  }, []);
  return (
    <header className="header">
      <button className="header__left">add post</button>
      <div className="header__right">
        <input
          placeholder="search by name or id"
          type="search"
          onChange={(e) => dispacth(searchvalue(e.target.value))}
        />FIlter by
        <select name="" id="" className={"header__right__select"}>
          {users?.map((e) => (
            <option value="">{e.name}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
