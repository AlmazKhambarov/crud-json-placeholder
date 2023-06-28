import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
Get_saved_data
} from "../../reduxToolkit/extraReducer";
const Favourites = () => {
  const { savedPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  console.log(savedPosts)
  useEffect(() => {
    dispatch(Get_saved_data());
  }, []);
  return;
  <div></div>;
};

export default Favourites;
