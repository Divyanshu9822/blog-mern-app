import React, { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import Blog from '../components/Blog';
// import SearchBox from '../components/SearchBox';
import Loader from '../components/Loader'
import WriteButton from '../components/WriteButton'

const BlogsPage = () => {
  const { blogs } = useContext(BlogContext);
  if (blogs.length === 0) {
    return <Loader />
  }

  // Sort the blogs array in ascending order by date (assuming each blog has a "date" field)
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className='min-h-screen'>
      {/* <SearchBox /> */}
      <div className='container mx-auto p-6 grid grid-cols-1'>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog blog={blog} key={blog._id} />
          ))
        ) : (
          <div>No blogs found.</div>
        )}
        <WriteButton/>
      </div>
    </div>
  );
};

export default BlogsPage;
