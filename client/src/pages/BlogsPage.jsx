import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogsSlice";
import Blog from "../components/Blog";
// import SearchBox from '../components/SearchBox';
import Loader from "../components/Loader";
import WriteButton from "../components/WriteButton";
import { useEffect } from "react";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, status } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllBlogs());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error loading blogs. Please try again.</div>;
  }


  return (
    <div className="min-h-screen">
      {/* <SearchBox /> */}
      <div className="container mx-auto p-6 grid grid-cols-1">
        {blogs.length > 0 ? (
          blogs.map((blog) => <Blog blog={blog} key={blog._id} />)
        ) : (
          <div>No blogs found.</div>
        )}
        <WriteButton />
      </div>
    </div>
  );
};

export default BlogsPage;
