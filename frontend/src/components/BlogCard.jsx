import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleCardClick = () => {
    navigate(`/blogs/${blog?._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-700 dark:to-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-600/50 hover:border-blue-500 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={blog?.thumbnail || "/placeholder-blog.jpg"}
          alt={blog?.title || "Blog post"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 md:p-8 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {blog?.title || "Untitled Blog"}
        </h3>

        <p className="text-base md:text-lg text-gray-300 line-clamp-2 leading-relaxed">
          {blog?.subtitle || "Explore this amazing content"}
        </p>

        <div className="text-sm md:text-base text-gray-400 border-t border-gray-600 pt-4">
          <p className="flex flex-wrap gap-1">
            By <span className="text-gray-200 font-medium">{blog?.author?.firstName || "Unknown"}</span> 
            <span>|</span> 
            <span>{blog?.category || "Uncategorized"}</span> 
            <span>|</span> 
            <span>{formatDate(blog?.createdAt)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;