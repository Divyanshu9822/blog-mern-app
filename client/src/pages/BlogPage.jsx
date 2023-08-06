import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import DOMPurify from 'dompurify';
import CommentSection from '../components/CommentSection';
import Comment from '../components/Comment';
import Loader from '../components/Loader';

const BlogPage = () => {
  const { id } = useParams();
  const { getSingleBlog } = useContext(BlogContext);
  const [blog, setBlog] = useState(null);

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
  }, [id, getSingleBlog]);

  if (!blog) {
    return <Loader/>;
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
              <p className="py-2 text-green-700 inline-flex items-center justify-center mb-2">
                Cryptocurrency
              </p>
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
