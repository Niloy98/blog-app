import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Edit, Eye, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setYourBlog } from "@/store/blogSlice";
import { Badge } from "@/components/ui/badge"; 

const YourBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { yourBlog } = useSelector((store) => store.blog);
  
  const [loading, setLoading] = useState(true);

  const getOwnBlog = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(sessionStorage.getItem('token'));
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/get-own-blogs`,
        { 
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true 
        }
      );
      if (res.data.success) {
        dispatch(setYourBlog(res.data.blogs));
      } else {
        dispatch(setYourBlog([]));
      }
    } catch (error) {
      console.log(error);
      dispatch(setYourBlog([]));
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/delete/${id}`,
        { 
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true 
        }
      );
      if (res.data.success) {
        const updatedBlogData = yourBlog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setYourBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (loading) {
    return (
        <div className="pb-10 pt-20 md:ml-[320px] h-screen flex justify-center items-center">
             <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
        </div>
    )
  }

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8 ">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader className="overflow-x-auto">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead> 
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-auto ">
              {yourBlog?.length > 0 ? (
                  yourBlog.map((item, index) => (
                    <TableRow key={item._id || index}>
                      <TableCell className="flex gap-4 items-center">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-20 rounded-md hidden md:block"
                        />
                        <h1
                          className="hover:underline cursor-pointer"
                          onClick={() => navigate(`/blogs/${item._id}`)}
                        >
                          {item.title}
                        </h1>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      
                      <TableCell>
                        {item.isPublished ? (
                          <Badge className="bg-green-600 hover:bg-green-700">Published</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Draft</Badge>
                        )}
                      </TableCell>

                      <TableCell className="">{formatDate(item.createdAt)}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[180px]">
                            <DropdownMenuItem
                              onClick={() => navigate(`/blogs/${item._id}`)}
                            >
                              <Eye />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/dashboard/write-blog/${item._id}`)
                              }
                            >
                              <Edit />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => deleteBlog(item._id)}
                            >
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                          No blogs found. Start writing!
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;