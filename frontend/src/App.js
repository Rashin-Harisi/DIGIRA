import { useEffect } from "react";
import useUserStore from "./store/userStore";
import fetchUserProfile from "./utils/fetchUserProfile";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  
  useEffect(()=>{
    const user = (async()=>{ 
      const userInfo = await fetchUserProfile()
      if(userInfo){
        setUser(userInfo)
        console.log(userInfo);
      }else{
        navigate('/signin')
      }
    })
    user();
  },[])
  
  return (
      <p>Hi {user?.name}</p>
  );
}

export default App;
