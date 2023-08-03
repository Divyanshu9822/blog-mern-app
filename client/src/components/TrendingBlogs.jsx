import React from 'react';
import BlogCard from './BlogCard';

const TrendingBlogs = ({ blogs }) => {
  return (
    <section className="py-6 sm:py-12">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-left">
          <h2 className="text-3xl font-bold">Trending Blogs</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingBlogs;
