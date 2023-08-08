import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BlogContext } from '../context/BlogContext';

const FeaturedBlog = (props) => {
  const { fetchUserDetails } = useContext(BlogContext);
  const [userFullName, setUserFullName] = useState('');
  const formattedDate = moment(props.blog.date).format('MMMM d, YYYY');

  useEffect(() => {
    if (props.blog) {
      fetchUserDetails(props.blog.user_id)
        .then((userDetails) => {
          setUserFullName(userDetails.fullName);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [fetchUserDetails, props.blog]);

  if (!props.blog) {
    return <div>Loading...</div>;
  }
  return (

    <section className="container p-6 mx-auto space-y-6 sm:space-y-12 my-6">
      <div className="mb-6 text-left">
        <h2 className="text-3xl font-bold">Featured Blog</h2>
      </div>
      <Link key={props.blog._id} to={`/blogs/${props.blog._id}`}>
        <div className="block gap-3 mx-auto sm:max-w-full group lg:grid lg:grid-cols-12">
          <img src={props.blog?.imageUrl} alt="" className="object-cover w-full h-64 rounded-lg sm:h-96 lg:col-span-7" />
          <div className="p-6 space-y-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold sm:text-4xl">{props.blog.title}</h3>
              <span className="text-xs">{formattedDate}</span>
              <p className="my-3">{props.blog.summary}</p>
            </div>
            <div className="flex items-center justify-start pt-2">
              <div className="flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                </svg>
                <span className="self-center text-sm">by {userFullName}</span>
              </div>
              &nbsp; • &nbsp;
              <span className="text-xs">{props.blog.minsRead} min read</span>
              <span className="text-xs ml-auto"><i class="fa-regular fa-eye"></i> {props.blog.impressions}</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FeaturedBlog;
