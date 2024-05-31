import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  fetchSingleBlog,
  fetchComments,
  updateBlog,
  fetchMyBlogs,
  postComment,
} from "./blogsAPI";

const initialState = {
  blogs: [],
  blog: null,
  comments: [],
  myBlogs: [],
  status: "idle",
  error: null,
};

export const getAllBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetchBlogs();
  return response.data;
});

export const getSingleBlog = createAsyncThunk(
  "blogs/fetchSingleBlog",
  async (blogId) => {
    const response = await fetchSingleBlog(blogId);
    return response.data;
  }
);

export const getBlogComments = createAsyncThunk(
  "blogs/fetchComments",
  async (blogId) => {
    const response = await fetchComments(blogId);
    return response.data;
  }
);

export const addCommentInBlog = createAsyncThunk(
  "blogs/postComment",
  async ({ blogId, content }) => {
    const response = await postComment({ blogId, content });
    console.log(response);
    return response.data;
  }
);

export const updateBlogPost = createAsyncThunk(
  "blogs/updateBlog",
  async (blog) => {
    const response = await updateBlog(blog);
    return response.data;
  }
);

export const getMyBlogs = createAsyncThunk("blogs/fetchMyBlogs", async () => {
  const response = await fetchMyBlogs();
  return response.data;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.status = "succeeded";
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBlogComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = "succeeded";
      })
      .addCase(getBlogComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.myBlogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommentInBlog.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
        state.status = "succeeded";
      })
      .addCase(addCommentInBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommentInBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
