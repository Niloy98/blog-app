import axios from "axios";
import React, { useEffect, useState } from "react";
import userLogo from "../../public/user.jpg";

const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);
  
  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/all-users`
      );
      // console.log(res);
      
      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="py-10 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-3 md:space-y-4 items-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
            Popular Authors
          </h1>
          <hr className="w-20 sm:w-24 text-center border-2 border-red-500 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-items-center">
          {popularUser?.slice(0, 3)?.map((user, index) => {
            return (
              <div 
                key={index} 
                className="flex flex-col gap-3 md:gap-4 items-center group cursor-pointer transition-transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={user.profilePic || userLogo}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover border-4 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors shadow-lg"
                  />
                </div>

                <p className="font-semibold text-sm sm:text-base md:text-lg text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            );
          })}
        </div>

        {popularUser?.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <p className="text-lg">No authors available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularAuthors;