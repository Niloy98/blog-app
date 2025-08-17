import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChartColumnBig, LogOut, Search, User } from "lucide-react";
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/store/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LiaCommentSolid } from "react-icons/lia";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { ResponsiveMenu } from ".";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async (e) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  // console.log(user);

  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <img
                src={Logo}
                alt=""
                className="w-7 h-7 md:w-10 md:h-10 dark:invert"
              />
              <h1 className="font-bold text-3xl md:text-4xl">Blog</h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search"
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="absolute right-0 top-0" onClick={handleSearch}>
              <Search />
            </Button>
          </div>
        </div>
        {/* nav section */}
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 
                ${ isActive
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-500"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/blogs"}
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 
                ${ isActive
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-500"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              <li>Blogs</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 
                ${ isActive
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-500"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              <li>About</li>
            </NavLink>
          </ul>
          <div className="flex">
            <Button onClick={() => dispatch(toggleTheme())} className="">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </Button>
            {user ? (
              <div className="ml-7 flex gap-3 items-center">
                <DropdownMenu className="">
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.profilePic} />
                      <AvatarFallback>
                        {user?.firstName[0] + user?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-50 dark:bg-gray-800">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/profile")}
                      >
                        <User />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/your-blog")}
                      >
                        <ChartColumnBig />
                        <span>Your Blog</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/comments")}
                      >
                        <LiaCommentSolid />
                        <span>Comments</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/write-blog")}
                      >
                        <FaRegEdit />
                        <span>Write Blog</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* </Link> */}
                <Button className="hidden md:block" onClick={logoutHandler}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="ml-7 md:flex gap-2 ">
                <Link to={"/login"}>
                  <Button>Login</Button>
                </Link>
                <Link className="hidden md:block" to={"/signup"}>
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </div>
          {openNav ? (
            <HiMenuAlt3 onClick={toggleNav} className="w-7 h-7 md:hidden" />
          ) : (
            <HiMenuAlt1 onClick={toggleNav} className="w-7 h-7 md:hidden" />
          )}
        </nav>
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
