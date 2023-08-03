import React from 'react'
import moment from 'moment'
import { useState, useEffect, useContext } from 'react'
import { BlogContext } from '../context/BlogContext'

const Comment = ({ user_id, date, commentText }) => {
    const formattedDate = moment(date).format("MMMM d, YYYY");
    const { fetchUserDetails } = useContext(BlogContext);
    const [userFullName, setUserFullName] = useState('');

    useEffect(() => {
        fetchUserDetails(user_id)
            .then((userDetails) => {
                setUserFullName(userDetails.fullName);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    }, [fetchUserDetails, user_id]);
    return (
        <div className="p-6 mb-2 border text-base bg-white rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 text-xs flex items-center justify-center text-white font-bold uppercase rounded-full cursor-pointer bg-gray-500" >
                        {userFullName.substring(0, 1)}
                    </div>
                    <p >
                        {userFullName}
                    </p>
                    <p className="text-sm text-gray-600 m-auto">{formattedDate}</p>
                </div>
            </div>
            <p className="text-gray-500">{commentText}</p>
        </div>
    )
}

export default Comment