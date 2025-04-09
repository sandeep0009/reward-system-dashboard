
import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import Home from "./pages/Home"
import UserProfile from "./features/users/UserProfile"
import Layout from "./utils/layout"
import LeaderBoard from "./pages/LeaderBoard"
import Activity from "./pages/Activity"
import Rewards from "./pages/Rewards"
function App() {


  return (
    <>

<Layout>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/leaderBoard" element={<LeaderBoard/>}/>
      <Route path="/activities" element={<Activity/>}/>
      <Route path="/rewards" element={<Rewards/>}/>
    </Routes>
    </Layout>

    </>
  )
}

export default App
