import FeaturedBlog from '../components/FeaturedBlog';
import TrendingBlogs from '../components/TrendingBlogs';
import { BlogContext } from '../context/BlogContext';
import { useContext } from 'react';

const HomePage = () => {
  const { blogs } = useContext(BlogContext);

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const trendingBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  if (blogs.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className='min-h-screen'>
      {featuredBlog && <FeaturedBlog blog={featuredBlog} />}
      <TrendingBlogs blogs={trendingBlogs} />
    </div>
  );
};

export default HomePage;
