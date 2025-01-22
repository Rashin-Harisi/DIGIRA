import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import fetchUserProfile from "../utils/fetchUserProfile";


const useUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserProfile();
      if (userInfo) {
        setUser(userInfo); 
      } else {
        navigate('/signin'); 
      }
    };

    getUserInfo();
  }, [navigate]); 
  return user;
};

export default useUser;
