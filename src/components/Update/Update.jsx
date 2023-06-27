import React, { useEffect, useState } from "react";
import "./Update.scss";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../reduxToolkit/PostsSlice/postsSlice";
const Update = ({ posts }) => {
    const dispatch = useDispatch()
    console.log(posts.userId);
  const [data, setData] = useState({
    userId:posts.userId,
    id:posts.id,
    username: "",
    body: "",
  });
  useEffect(() => {
    if (posts) {
      setData(posts);
    }
  }, [posts]);
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(updatePosts(data))
  }
  return (
    <div style={{ position: "absolute" }}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e.target.value }))
          }
          value={data?.username}
          type="text"
          placeholder="name"
        />
        <textarea onChange={(e)=>setData((prev)=>({...prev, body:e.target.value}))} value={data?.body} placeholder="title"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
