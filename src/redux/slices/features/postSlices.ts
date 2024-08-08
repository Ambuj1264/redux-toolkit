// features/postSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw error;
  }

});

export const createPost = createAsyncThunk('posts/mypost', async (newPost: Post, thunkAPI) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    // Refetch the posts after successful creation of a new post
    await thunkAPI.dispatch(fetchPosts());
    return response.data;
  } catch (error: any) {
    console.log(error.response.data,"===============error==============");
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to create post';
      });
  },
});

export default postSlice.reducer;
