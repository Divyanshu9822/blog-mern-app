import FeaturedBlog from '../components/FeaturedBlog';
import TrendingBlogs from '../components/TrendingBlogs';
import { BlogContext } from '../context/BlogContext';
import { useContext } from 'react';
import Loader from '../components/Loader'

const HomePage = () => {
  const { blogs } = useContext(BlogContext);

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const trendingBlogs = blogs.length > 1 ? blogs.slice(1, 5) : [];

  if (blogs.length === 0) {
    return <Loader/>
  }

  return (
    <div className='min-h-screen'>
      <FeaturedBlog blog={featuredBlog} />
      <TrendingBlogs blogs={trendingBlogs} />
    </div>
  );
};

export default HomePage;
