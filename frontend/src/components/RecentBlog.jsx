import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setBlog } from "@/store/blogSlice";
import { BlogCardList, Newsletter } from ".";

const RecentBlog = () => {
  const { blog } = useSelector((store) => store.blog);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(blog);

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/blog/get-published-blogs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublsihedBlogs();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-10 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col space-y-4 items-center px-4 mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Recent Blogs
        </h1>
        <hr className="w-20 sm:w-24 text-center border-2 border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-8">
          {blog?.slice(0, 12)?.map((blog, index) => {
            return <BlogCardList key={index} blog={blog} />;
          })}
        </div>

        {blog?.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <p className="text-lg">No blogs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBlog;