import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "sonner";
import { setBlog } from "@/store/blogSlice";
import { CommentBox } from "@/components";

const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const selectedBlog = blog.find((blog) => blog._id === blogId);
  
  const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length || 0);
  const { comment } = useSelector((store) => store.comment);
  const [liked, setLiked] = useState(
    selectedBlog?.likes?.includes(user?._id) || false
  );

  const dispatch = useDispatch();

  const likeOrDislikeHandler = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'))
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/${selectedBlog?._id}/${action}`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true 
        }
      );
      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes);
        setLiked(!liked);

        const updatedBlogData = blog.map((p) =>
          p._id === selectedBlog._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        toast.success(res.data.message);
        dispatch(setBlog(updatedBlogData));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const changeTimeFormat = (isDate) => {
    const date = new Date(isDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;

    if (navigator.share) {
      navigator
        .share({
          title: selectedBlog?.title || "Check out this blog!",
          text: "Read this amazing blog post.",
          url: blogUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  if (!selectedBlog) {
      return <div className="pt-20 text-center">Loading or Blog not found...</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-6 md:p-10">
        
        <div className="overflow-x-auto pb-2">
            <Breadcrumb>
            <BreadcrumbList className="flex-nowrap whitespace-nowrap">
                <BreadcrumbItem>
                <Link to="/">
                    <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                <Link to={"/blogs"}>
                    <BreadcrumbLink>Blogs</BreadcrumbLink>
                </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage className="truncate max-w-[150px] md:max-w-xs block">
                    {selectedBlog.title}
                </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div className="my-6 md:my-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
            {selectedBlog.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 md:h-12 md:w-12">
                <AvatarImage
                  src={selectedBlog.author.profilePic}
                  alt="Author"
                />
                <AvatarFallback>{user?.firstName?.[0]} {user?.lastName?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedBlog.author.firstName} {selectedBlog.author.lastName}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {selectedBlog.author.occupation || "Author"}
                </p>
              </div>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Published on {changeTimeFormat(selectedBlog.createdAt)}
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
          {selectedBlog?.thumbnail && (
            <img
              src={selectedBlog.thumbnail}
              alt={selectedBlog.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          )}
          {selectedBlog.subtitle && (
             <p className="text-sm text-muted-foreground mt-2 italic px-1">
                {selectedBlog.subtitle}
             </p>
          )}
        </div>

        <div
          className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-300 leading-relaxed [&>img]:max-w-full [&>img]:h-auto [&>iframe]:max-w-full"
          dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
        />

        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Web Development</Badge>
            <Badge variant="secondary">JavaScript</Badge>
          </div>

          <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-200 py-4 mb-8">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                onClick={likeOrDislikeHandler}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-2 md:px-4"
              >
                {liked ? (
                  <FaHeart
                    size={"20"}
                    className="cursor-pointer text-red-600"
                  />
                ) : (
                  <FaRegHeart
                    size={"20"}
                    className="cursor-pointer text-gray-600 dark:text-gray-300"
                  />
                )}
                <span className="text-sm">{blogLike}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-2 md:px-4"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm">{comment?.length || 0} <span className="hidden sm:inline">Comments</span></span>
              </Button>
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
              <Button variant="ghost" size="sm" className="px-2 md:px-3">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
                size="sm"
                className="px-2 md:px-3"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Discussion</h3>
            <CommentBox selectedBlog={selectedBlog} />
        </div>
      </div>
    </div>
  );
};

export default BlogView;