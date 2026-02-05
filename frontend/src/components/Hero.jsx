import React from "react";
import heroImg from "../../public/blog2.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 py-8 md:py-12 lg:py-16 min-h-[500px] md:min-h-[600px]">
          <div className="flex-1 max-w-2xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Explore the Latest Tech & Web Trends
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-80 mb-6 md:mb-8 leading-relaxed">
              Stay ahead with in-depth articles, tutorials, and insights on web
              development, digital marketing, and tech innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link to={"/dashboard/write-blog"} className="w-full sm:w-auto">
                <Button className="text-base md:text-lg w-full sm:w-auto px-6 md:px-8 py-5 md:py-6">
                  Get Started
                </Button>
              </Link>
              <Link to={"/about"} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-6 md:px-8 py-5 md:py-6 text-base md:text-lg border-2"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center w-full">
            <img 
              src={heroImg} 
              alt="Blog illustration" 
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] h-auto object-contain" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;