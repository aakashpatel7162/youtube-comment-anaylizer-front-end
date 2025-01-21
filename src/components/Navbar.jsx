import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Check if the analyze button was clicked before navigating
    const isAnalyzed = localStorage.getItem("showResult") === "true";
    setShowResult(isAnalyzed);
  }, [location.pathname]);

  return (
    <div className="p-4 px-16 pt-5 outline-none  bg-black text-white">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {showResult && location.pathname === "/result" && (
            <>
              <BreadcrumbSeparator>{">"}</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/result">Result</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Navbar;
