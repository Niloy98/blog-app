import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../public/auth.jpg";
import { setLoading, setUser } from "@/store/authSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const {loading} = useSelector(store => store.auth)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      // console.log(response);
      
      if (response.data.success) {
        dispatch(setUser(response.data.loggedInUser))
        navigate('/')
        toast.success(response.data.message)
      }
    } catch (error) {
      // console.log(response.data.message);
        toast.error(error.message)
    } finally{
      dispatch(setLoading(false))
    }
    
    
  };
  return (
    <div className="flex items-center min-h-screen md:pt-14 md:h-[740px] overflow-y-hidden xl:h-screen">
      <div className="hidden lg:flex lg:w-1/2 lg:h-screen xl:w-3/5">
        <img src={auth} alt="" className='h-[700px]' />
      </div>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Login into your account</CardTitle>
          <p className='text-gray-600 dark:text-gray-300 mt-2 text-sm font-serif text-center'>Enter your details below to login your account</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="py-1">Email</Label>
              <Input type="email"
                placeholder="Email Address"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-900"
              />
            </div>

            <div className="relative">
              <Label className="py-1">Password</Label>
              <Input type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                name="password"
                value={input.password}
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
            
            <Button type="submit" className="w-full ">
              {
                loading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait</> : "Login"
              }
            </Button>
            <p className='text-center text-gray-600 dark:text-gray-300'>Don't have an account? <Link to={'/signup'}><span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign up</span></Link></p>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default Login