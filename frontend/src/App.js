import useUserStore from "./store/userStore";


function App() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
      <p>Hi {user.name}</p>
  );
}

export default App;
