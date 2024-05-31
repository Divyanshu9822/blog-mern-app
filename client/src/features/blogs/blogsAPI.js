import axios from "axios";

const API_URL = "http://localhost:8000/api/blogs";

export const fetchBlogs = () => axios.get(API_URL);
export const fetchSingleBlog = (blogId) => axios.get(`${API_URL}/${blogId}`);
export const deleteBlog = (blogId) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.delete(`${API_URL}/${blogId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const fetchComments = (blogId) =>
  axios.get(`${API_URL}/${blogId}/comments`);

export const postComment = ({ blogId, content }) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(
    `${API_URL}/${blogId}/comments`,
    {
      content,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const updateBlog = (blog) =>
  axios.put(`${API_URL}/${blog.blogId}`, blog);

export const fetchMyBlogs = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.get(`${API_URL}/my-blogs`, {
    headers: {
      Authorization: accessToken,
    },
  });
};
