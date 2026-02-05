import { Link, NavLink, useNavigate } from "react-router-dom";
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
        sessionStorage.clear();
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query); 

    if (query.trim().length >= 3) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else if (query.trim().length === 0) {
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-7 flex-1">
            <Link to="/" className="flex-shrink-0">
              <div className="flex gap-2 items-center">
                <img
                  src={'/logo.png'}
                  alt="MindGarden Logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 dark:invert"
                />
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap">
                  MindGarden
                </h1>
              </div>
            </Link>

            <div className="relative hidden lg:block flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Search (type 3+ letters...)"
                  className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-full pr-12"
                  value={searchTerm}
                  onChange={handleInputChange} 
                />
                <Button 
                  type="submit"
                  className="absolute right-0 top-0 h-full"
                  size="sm"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3 lg:gap-7">
            <ul className="hidden lg:flex gap-5 xl:gap-7 items-center text-base xl:text-xl font-semibold">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `block py-2 px-1 duration-200 transition-colors
                  ${isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  } hover:text-orange-700 dark:hover:text-orange-500`
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to={"/blogs"}
                className={({ isActive }) =>
                  `block py-2 px-1 duration-200 transition-colors
                  ${isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  } hover:text-orange-700 dark:hover:text-orange-500`
                }
              >
                <li>Blogs</li>
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `block py-2 px-1 duration-200 transition-colors
                  ${isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  } hover:text-orange-700 dark:hover:text-orange-500`
                }
              >
                <li>About</li>
              </NavLink>
            </ul>

            {/* Theme Toggle Button */}
            <Button 
              onClick={() => dispatch(toggleTheme())} 
              size="icon"
              variant="ghost"
              className="flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaSun className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10">
                      <AvatarImage src={user.profilePic} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="text-sm">
                        {user?.firstName[0] + user?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 dark:bg-gray-800" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/profile")}
                        className="cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/your-blog")}
                        className="cursor-pointer"
                      >
                        <ChartColumnBig className="mr-2 h-4 w-4" />
                        <span>Your Blog</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/comments")}
                        className="cursor-pointer"
                      >
                        <LiaCommentSolid className="mr-2 h-4 w-4" />
                        <span>Comments</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/write-blog")}
                        className="cursor-pointer"
                      >
                        <FaRegEdit className="mr-2 h-4 w-4" />
                        <span>Write Blog</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  className="hidden lg:block" 
                  onClick={logoutHandler}
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to={"/login"}>
                  <Button size="sm" className="text-xs sm:text-sm">
                    Login
                  </Button>
                </Link>
                <Link className="hidden sm:block" to={"/signup"}>
                  <Button size="sm" className="text-xs sm:text-sm">
                    Signup
                  </Button>
                </Link>
              </div>
            )}

            <button
              onClick={toggleNav}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {openNav ? (
                <HiMenuAlt3 className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <HiMenuAlt1 className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
            </button>
          </nav>
        </div>

        <div className="lg:hidden pb-3 pt-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-full pr-12"
              value={searchTerm}
              onChange={handleInputChange} 
            />
            <Button 
              type="submit"
              className="absolute right-0 top-0 h-full"
              size="sm"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <ResponsiveMenu
        openNav={openNav}
        setOpenNav={setOpenNav}
        logoutHandler={logoutHandler}
      />
    </div>
  );
};

export default Navbar;