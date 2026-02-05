import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBlog } from "@/store/blogSlice";

const TotalProperty = () => {
  const { blog } = useSelector((store) => store.blog);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem('token'))

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/get-own-blogs`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true 
        }
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/comment/your-blog/comments`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true 
        }
      );
      if (res.data.success) {
        setTotalComments(res.data.totalComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalLikes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/my-blogs/likes`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true 
        }
      );
      if (res.data.success) {
        setTotalLikes(res.data.totalLikes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getOwnBlog();
    getTotalComments();
    getTotalLikes();
  }, []);

  const stats = [
    {
      title: "Total Views",
      value: "24.8K", 
      icon: Eye,
      color: "text-blue-500",
    },
    {
      title: "Total Blogs",
      value: blog.length,
      icon: BarChart3,
      color: "text-purple-500",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: ThumbsUp,
      color: "text-red-500",
    },
  ];

  return (
    <div className="px-4 py-8 md:px-0 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TotalProperty;