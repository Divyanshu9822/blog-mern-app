import React, { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ blogId , count}) => {
  const { postComment } = useContext(BlogContext); 
  const{isLoggedIn} = useContext(AuthContext)
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await postComment(blogId, commentText); 
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
          <button type="submit"
            className="py-2.5 px-4 text-md text-center text-white bg-green-700 rounded-lg hover:bg-green-800">
            Post comment
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
