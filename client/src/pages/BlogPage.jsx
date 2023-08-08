import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import DOMPurify from 'dompurify';
import CommentSection from '../components/CommentSection';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import moment from 'moment';


const BlogPage = () => {
  const { id } = useParams();
  const { getSingleBlog, fetchUserDetails } = useContext(BlogContext);
  const [blog, setBlog] = useState(null);
  const [userFullName, setUserFullName] = useState('');
  const formattedDate = moment(blog?.date).format('MMMM d, YYYY');

  useEffect(() => {
    if (blog) {
      fetchUserDetails(blog.user_id)
        .then((userDetails) => {
          setUserFullName(userDetails.fullName);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [fetchUserDetails,blog]);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const singleBlog = await getSingleBlog(id);
        if (singleBlog) {
          setBlog(singleBlog);
        }
      } catch (error) {
        console.error('Error fetching single blog:', error);
      }
    };

    fetchSingleBlog();
    // eslint-disable-next-line
  }, [id, getSingleBlog]);

  if (!blog) {
    return <Loader />;
  }

  const { title, content, imageUrl, comments } = blog;
  const sanitizedContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });

  return (
    <div className='min-h-screen'>
      <div className="max-w-screen-lg mx-auto container px-6">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {title}
              </h2>
              {/* <p className="py-2 text-green-700 inline-flex items-center justify-center mb-2">
                Cryptocurrency
              </p> */}
                <div className="flex items-center my-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-12 h-12">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                  </svg>
                  <div className='flex flex-col'>
                    <span className="text-md">by {userFullName}</span>
                    <span className="text-xs"> {formattedDate}&nbsp; • &nbsp;{blog.minsRead} min read</span>
                  </div>
                </div>
            </div>

            <img src={imageUrl} className="w-full object-cover rounded-md" alt='blog cover' style={{ height: '28em' }} />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
          </div>
        </main>
        <div className="mt-10">
          <CommentSection blogId={id} count={comments.length} />
          {comments?.map((comment) => (
            <Comment key={comment._id} user_id={comment.user_id} date={comment.date} commentText={comment.commentText} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
