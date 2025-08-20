import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log("Server error in register", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create account ",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email){
        return res.status(400).json({
          success: false,
          message: "email is required"
        })
      }
    if(!password){
        return res.status(400).json({
          success: false,
          message: "Password is required"
        })
      }
          
      const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!checkPasswordMatch)
      return res.status(400).json({
        success: false,
        message: "Incorrect password! Please try again",
      });

const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRY
      }
    );

    const loggedInUser = await User.findById(user._id).select("-password");

    return res
    .status(200)
    .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
    .json({
      success: true,
        message: `Welcome back ${user.firstName}`,
        loggedInUser,
        token
    })
  } catch (error) {
    console.log("Server error in register", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create account ",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log("Server error in register", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create account ",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.id;

    const {
      firstName,
      lastName,
      instagram,
      facebook,
      github,
      linkedin,
      bio,
      occupation,
    } = req.body;
    const file = req.file;

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (instagram) user.instagram = instagram;
    if (facebook) user.facebook = facebook;
    if (linkedin) user.linkedin = linkedin;
    if (github) user.github = github;
    if (bio) user.bio = bio;
    if (occupation) user.occupation = occupation;
    if (file) user.profilePic = cloudResponse.secure_url;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      user,
    });
  } catch (error) {
    console.log("Server error in register", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password field
    // console.log("users : ", users);
    
    return res.status(200).json({
      success: true,
      message: "User list fetched successfully",
      users,
    });
  } catch (error) {
    console.log("Server error in register", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create account ",
    });
  }
};

export { registerUser, loginUser, logoutUser, updateProfile, getAllUsers };
