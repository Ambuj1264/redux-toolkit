"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getMovies from "../movies/hook";

interface NewPostData {
  title: string;
  content: string;
}

async function createPost(newPostData: NewPostData): Promise<any> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: "21",
      title: newPostData.title,
      body: newPostData.content,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

const PostForm: React.FC = () => {
  const [formData, setFormData] = useState<NewPostData>({
    title: "",
    content: "",
  });

  const queryClient = useQueryClient()
  const { data, isError, isLoading } = useQuery({
    queryFn: getMovies,
    queryKey: ["movies"], // Ensure the key is relevant to the data being fetched
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess:async () => {
      console.log("Post created successfully");
      queryClient.invalidateQueries()
      setFormData({ title: "", content: "" });
    },
    onError: (error: Error) => {
      console.error("Error creating post:", error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title || !formData.content) {
      console.error("Title and content are required");
      return;
    }

    mutation.mutate(formData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleInputChange}
        />
        <button type="submit">Create Post</button>
      </form>
      <div className="flex justify-center items-center">
        <ul>
          {data &&
            data.map((post: any) => {
              return (
                <li key={post.id}> {/* Assuming each post has a unique 'id' */}
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default PostForm;
