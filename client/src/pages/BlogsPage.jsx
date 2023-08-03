import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import Blog from '../components/Blog';
import SearchBox from '../components/SearchBox';

const BlogsPage = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <div className='min-h-screen'>
      <SearchBox />
      <div className='container mx-auto p-6 grid grid-cols-1'>
        {blogs.map((blog) => (
          
            <Blog blog={blog} key={blog._id}/>
          
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
