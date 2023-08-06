import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://blog-mern-app-c78l.onrender.com/api/blogs');
      const fetchedBlogs = response.data;

      // Sort blogs in descending order based on the "impressions" field
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.impressions - a.impressions);

      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`https://blog-mern-app-c78l.onrender.com/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user details for user ID ${userId}:`, error);
    }
  };

  const getSingleBlog = async (blogId) => {
    try {
      const response = await axios.get(`https://blog-mern-app-c78l.onrender.com/api/blogs/${blogId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching single blog:', error);
      return null;
    }
  };

  const handleBlogSubmit = async (title, content, summary, coverImage) => {
    if (!title || !content || !coverImage) {
      alert('Please fill in the title and content.');
      return;
    }

    try {
      let imageUrl = null;
      const formData = new FormData();
      formData.append('image', coverImage);

      // Use the `accessToken` in the request headers
      const response = await axios.post('https://blog-mern-app-c78l.onrender.com/api/upload', formData);
      imageUrl = response.data.imageUrl;

      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const minsRead = Math.ceil(wordCount / wordsPerMinute);

      const blogData = {
        title: title,
        content: content,
        summary: summary,
        imageUrl: imageUrl,
        minsRead: minsRead
      };

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found. User may not be logged in.');
        return;
      }

      // Use the `accessToken` in the request headers
      await axios.post('https://blog-mern-app-c78l.onrender.com/api/blogs', blogData, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      console.log('Blog created successfully!');
      await fetchData()
    } catch (error) {
      console.error('Error creating blog:', error);
      console.log('Failed to create blog. Please try again.');
    }
  };

  const getMyBlogs = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found. User may not be logged in.');
        return [];
      }

      const response = await axios.get('https://blog-mern-app-c78l.onrender.com/api/blogs/my-blogs', {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      return response.data.blogs;
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      return [];
    }
  };

  const deleteBlog = async (blogId) => {
    try {

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found. User may not be logged in.');
        return;
      }

      await axios.delete(`https://blog-mern-app-c78l.onrender.com/api/blogs/my-blogs/${blogId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      await fetchData();
      console.log('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      console.log('Failed to delete blog. Please try again.');
    }
  };

  const postComment = async (blogId, commentText) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found. User may not be logged in.');
        return;
      }

      const response = await axios.post(`https://blog-mern-app-c78l.onrender.com/api/comments/${blogId}/`, {
        commentText,
      }, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      // console.log(response.data)

      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === blogId) {
          return { ...blog, comments: [...blog.comments, response.data] };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const deleteComment = async (blogId, commentId) => {
    try {
      await axios.delete(`https://blog-mern-app-c78l.onrender.com/api/comments/${commentId}`);
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === blogId) {
          const updatedComments = blog.comments.filter((comment) => comment._id !== commentId);
          return { ...blog, comments: updatedComments };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const contextValue = {
    blogs,
    getSingleBlog,
    handleBlogSubmit,
    getMyBlogs,
    deleteBlog,
    fetchUserDetails,
    postComment,
    deleteComment,
  };

  return <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>;
};

export { BlogContext, BlogProvider };