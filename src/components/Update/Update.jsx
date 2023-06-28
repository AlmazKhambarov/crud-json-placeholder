import React, { useEffect, useState } from "react";
import "./Update.scss";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../reduxToolkit/PostsSlice/postsSlice";
const Update = ({
  posts,
  updateActive,
  setActiveUpdatedData,
  setUpdateActive,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    userId: posts?.userId,
    id: posts?.id,
    name: "",
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
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={data?.name}
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
          <button
            onClick={() =>
              setUpdateActive(!updateActive) || setActiveUpdatedData(posts.id)
            }
            className={"update__btn__cancel"}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
