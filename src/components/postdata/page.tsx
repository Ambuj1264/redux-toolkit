// components/PostList.tsx
"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, fetchPosts } from "@/redux/slices/features/postSlices";
import { AppDispatch } from "@/redux/store";

const PostList: React.FC = () => {
  const { posts, status, error } = useSelector((state: any) => state.posts);
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    dispatch(createPost({ userId: 1, title, body, id: posts.length + 1 }));
    setTitle("");
    setBody("");
  };
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>

      

    </div>
  );
};

export default PostList;
