import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/store/blogSlice";
import { BlogCard } from "@/components";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
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
    <div className="pt-16">
      <div className="max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-bold text-center pt-10 ">Our Blogs</h1>
        <hr className=" w-24 text-center border-2 border-red-500 rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0">
        {blog?.map((blog, index) => {
          return <BlogCard blog={blog} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
