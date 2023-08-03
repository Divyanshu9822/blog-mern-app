import React, { useState, useEffect, useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import Blog from '../components/Blog';
import { AuthContext } from '../context/AuthContext';

const MyBlogsPage = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { getMyBlogs } = useContext(BlogContext);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const blogs = await getMyBlogs();
        setMyBlogs(blogs);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    if (isLoggedIn) {
      fetchMyBlogs();
    }
  }, [getMyBlogs, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className='min-h-screen text-5xl flex items-center justify-center'>
        Login to view your blogs
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {myBlogs.length > 0 ? (
        <div className='container mx-auto p-6 grid grid-cols-1'>
          <h1 className='text-3xl font-bold'>My Blogs</h1>
          {myBlogs.map((myBlog) => (
            <Blog blog={myBlog} key={myBlog._id} />
          ))}
        </div>
      ) : (
        <div className='min-h-screen flex items-center justify-center text-2xl'>
          No blogs
        </div>
      )}
    </div>
  );
};

export default MyBlogsPage;
