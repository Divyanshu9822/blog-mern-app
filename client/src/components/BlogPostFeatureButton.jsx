import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const BlogPostFeatureButton = ({ creator_id, blog_id }) => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const { user } = useContext(AuthContext)
    const { deleteBlog } = useContext(BlogContext)

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    const handleDelete = async (blogId) => {
        if (!user) {
            console.error('User not logged in. Cannot delete blog.');
            return;
        }

        await deleteBlog(blogId);
    };

    const handleCopyLink = () => {
        const blogLink = `${window.location.origin}/blogs/${blog_id}`;
        navigator.clipboard.writeText(blogLink)
            .then(() => console.log('Blog link copied to clipboard!'))
            .catch((error) => console.error('Failed to copy blog link:', error));
    };

    return (
        <div className='relative'>
            <div
                id="avatarButton"
                type="button"
                onClick={toggleDropdown}
                className="h-10 w-10 text-md flex items-center justify-center text-white font-bold rounded-full cursor-pointer bg-gray-500"
            >
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>

            {isDropdownVisible && (
                <div id="userDropdown" className="z-10 absolute right-0 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
                        <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleCopyLink}>
                            <i class="fa-solid fa-link"></i> &nbsp; Copy Blog Link
                        </li>
                        {user?.id === creator_id && (
                            <>
                                <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <Link to={`/edit-blog/${blog_id}`} ><i class="fa-solid fa-pencil"></i> &nbsp; Edit</Link>
                                </li>
                                <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(blog_id)}>
                                    <i class="fa-solid fa-trash"></i> &nbsp; Delete
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default BlogPostFeatureButton

