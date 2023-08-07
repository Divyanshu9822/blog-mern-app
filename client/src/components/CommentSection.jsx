import React, { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ blogId , count}) => {
  const { postComment } = useContext(BlogContext); 
  const{isLoggedIn} = useContext(AuthContext)
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    await postComment(blogId, commentText); 
    setIsSubmitting(false)
    setCommentText(''); 
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Comments ({count})</h2>
      </div>
      <form onSubmit={handleSubmit} className="mb-6  relative">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label htmlFor="comment" className="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="6"
            style={{ height: '150px', resize: 'none' }} 
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="text-right">
        <button type="submit" class={`inline-flex items-center px-5 py-3 font-semibold leading-6 text-md shadow rounded-md text-white bg-green-600 transition ease-in-out duration-150 ${isSubmitting ? 'cursor-not-allowed hover:bg-green-700' : 'hover:bg-green-600'}`} >
            {isSubmitting && <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
        {isLoggedIn ? '' : (<div class="absolute scale-[1.1] h-full w-full top-0 backdrop-blur-sm rounded-lg text-3xl flex items-center justify-center font-bold">
            Login to comment
        </div>)}
      </form>

    </div>
  );
}

export default CommentSection;
