import { BlogCard } from "@/components";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || ""; 
  const { blog } = useSelector((store) => store.blog);

  // console.log(blog);

  const filteredBlogs = blog.filter(
    (blog) =>
      String(blog.title || "").toLowerCase().includes(query.toLowerCase()) ||
      String(blog.subtitle || "").toLowerCase().includes(query.toLowerCase()) ||
      String(blog.category || "").toLowerCase() === query.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]); 

  return (
    <div className="pt-32 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <h2 className="mb-5 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Search Results for: "<span className="text-blue-600">{query}</span>"
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10 pb-10">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => {
              return <BlogCard key={index} blog={blog} />;
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-500">No results found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;