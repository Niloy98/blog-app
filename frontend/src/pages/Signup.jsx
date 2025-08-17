import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import auth from "../assets/auth.jpg";
import { setLoading } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading } = useSelector((store) => store.auth);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)

    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center min-h-screen md:pt-14 md:h-[740px] overflow-y-hidden xl:h-screen">
      <div className="hidden lg:flex lg:w-1/2 lg:h-screen xl:w-3/5">
        <img src={auth} alt="" className="h-[700px]" />
      </div>
      <div className="flex justify-center items-center flex-1 px-3 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create an account
              </h1>
            </CardTitle>
            <p className=" mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div>
                  <Label className="py-1">First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <Label className="py-1">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div>
                <Label className="py-1">Email</Label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
              </div>

              <div className="relative">
                <Label className="py-1">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
                <button
                  type="button"
                  className="absolute right-3 top-7 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type="submit" className="w-full">
              {
                loading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait</> : "Create Account"
              }
                
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
