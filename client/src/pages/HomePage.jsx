import FeaturedBlog from '../components/FeaturedBlog';
import TrendingBlogs from '../components/TrendingBlogs';
import { BlogContext } from '../context/BlogContext';
import { useContext } from 'react';
import Loader from '../components/Loader'
import WriteButton from '../components/WriteButton';

const HomePage = () => {
  const { blogs } = useContext(BlogContext);
  const sortedBlogs = blogs.sort((a, b) => b.impressions - a.impressions);

  const featuredBlog = sortedBlogs.length > 0 ? blogs[0] : null;
  const trendingBlogs = sortedBlogs.length > 1 ? blogs.slice(1, 5) : [];

  if (sortedBlogs.length === 0) {
    return <Loader/>
  }

  return (
    <div className='min-h-screen'>
      <FeaturedBlog blog={featuredBlog} />
      <TrendingBlogs blogs={trendingBlogs} />
      <WriteButton/>
    </div>
  );
};

export default HomePage;
