import React, { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import Blog from '../components/Blog';
import SearchBox from '../components/SearchBox';

const BlogsPage = () => {
  const { blogs } = useContext(BlogContext);

  // Sort the blogs array in ascending order by date (assuming each blog has a "date" field)
  const sortedBlogs = blogs.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className='min-h-screen'>
      <SearchBox />
      <div className='container mx-auto p-6 grid grid-cols-1'>
        {sortedBlogs.map((blog) => (
          <Blog blog={blog} key={blog._id}/>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
