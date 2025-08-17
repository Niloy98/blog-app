import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Blog title and category is required.",
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog Created Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId).populate("author");
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found!",
      });
    }
    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }

    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
      thumbnail: thumbnail?.secure_url,
    };
    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

const getOwnBlogs = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName profilePic",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName profilePic",
      },
    });

    // console.log(blogs);

    if (!blogs) {
      return res.status(404).json({
        message: "No blogs found.",
        blogs: [],
        success: false,
      });
    }

    return res.status(200).json({
      blogs,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    // console.log("blogId : ",blogId);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (blog.author.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this blog",
      });
    }

    // Delete blog
    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};

const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName profilePic",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "userId",
          select: "firstName lastName profilePic",
        },
      });
    if (!blogs) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get published blogs",
    });
  }
};

const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { publish } = req.query;
    // console.log(req.query);

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found!",
      });
    }
    // publish status based on the query paramter
    blog.isPublished = !blog.isPublished;
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};

const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeUsersId = req.id;
    const blog = await Blog.findById(blogId).populate({ path: "likes" });
    if (!blog)
      return res
        .status(404)
        .json({ 
          message: "Blog not found", 
          success: false 
        });

    //like logic started
    await blog.updateOne({ 
      $addToSet: { likes: likeUsersId } 
    });
    await blog.save();

    return res.status(200).json({ 
      message: "Blog liked", 
      blog, 
      success: true 
    });
  } catch (error) {
    console.log(error);
  }
};

const dislikeBlog = async (req, res) => {
  try {
    const likeUsersId = req.id;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res
        .status(404)
        .json({ message: "post not found", success: false });

    //dislike logic started
    await blog.updateOne({ 
      $pull: { likes: likeUsersId } 
    });
    await blog.save();

    return res
      .status(200)
      .json({ message: "Blog disliked", blog, success: true });
  } catch (error) {
    console.log(error);
  }
};

const getMyTotalBlogLikes = async (req, res) => {
  try {
    const userId = req.id; 

    // Step 1: Find all blogs authored by the logged-in user
    const myBlogs = await Blog.find({ author: userId }).select("likes");

    // Step 2: Sum up the total likes
    const totalLikes = myBlogs.reduce(
      (acc, blog) => acc + (blog.likes?.length || 0),
      0
    );

    res.status(200).json({
      success: true,
      totalBlogs: myBlogs.length,
      totalLikes,
    });
  } catch (error) {
    console.error("Error getting total blog likes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total blog likes",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName profilrPic",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "userId",
          select: "firstName lastName profilrPic",
        },
      });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

export {
  createBlog,
  updateBlog,
  getOwnBlogs,
  deleteBlog,
  getPublishedBlog,
  togglePublishBlog,
  likeBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
};
