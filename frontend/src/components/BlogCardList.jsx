import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCardList = ({ blog }) => {
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
      className="bg-gray-700/50 dark:bg-gray-700/80 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer group"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-800">
        <img
          src={blog?.thumbnail || "/placeholder-blog.jpg"}
          alt={blog?.title || "Blog post"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5 md:p-6 space-y-3 md:space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {blog?.title || "Untitled Blog"}
        </h3>

        <p className="text-sm md:text-base text-gray-300 line-clamp-2">
          {blog?.subtitle || blog?.description || "No description available"}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm text-gray-400 pt-2">
          <span className="truncate">
            By {blog?.author?.firstName || "Unknown"} | {blog?.category || "Uncategorized"}
          </span>
          <span className="flex-shrink-0">{formatDate(blog?.createdAt) || "Date N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCardList;