import { Dashboard } from "@/constant/routs";
import { verifyToken } from "@/service/pageProtection";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    verifyToken().then((data) => {
        console.log(data, "this is the data from auth verification")
        setLoading(false)
        if(data != null){
          console.log("what the fuck")
          navigate(Dashboard)}else{
            console.log('what is going to the dashboard then')
          }
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="font-bold text-2xl animate-bounce">Loading ...</p>
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
