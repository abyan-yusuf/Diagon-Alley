import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/signin", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <Circles />
      <h2 className="text-center text-xl">Redirecting in {count} seconds</h2>
    </div>
  );
};

export default Spinner;
