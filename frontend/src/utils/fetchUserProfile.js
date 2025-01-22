var email;


const fetchUserProfile = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return console.log("Login is required");
  } else {
    const response = await fetch("http://localhost:5000/userProfile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include token
      },
    });

    if (response.ok) {
      const userProfile = await response.json();
       email = userProfile.email;
    } else {
      console.error("Failed to fetch profile");
    }
  }


  if(email){
    try {
      const res = await fetch("http://localhost:5000/getUser", {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const info = await res.json();
      if(info.success){
        return info.data
      }
    } catch (error) {
      console.error(error)
    }
    
  }
};



export default fetchUserProfile;
