
import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import Home from "./pages/Home"
import UserProfile from "./features/users/UserProfile"
import Layout from "./utils/layout"
import LeaderBoard from "./pages/LeaderBoard"
import Activity from "./pages/Activity"
import Rewards from "./pages/Rewards"
import AdminDashboard from "./features/admin/AdminDashboard"
import ProtectRoutes from "./components/ProtectRoute"
import ManageActivities from "./features/admin/ManageActivities"
import ManageRewards from "./features/admin/ManageRewards"
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
      <Route path="/admin-dashboard" element={<ProtectRoutes children={<AdminDashboard/>}/>}/>
      <Route path="/admin-dashboard/manage-activity" element={<ProtectRoutes children={<ManageActivities/>}/>}/>
      <Route path="/admin-dashboard/manage-rewards" element={<ProtectRoutes children={<ManageRewards/>}/>}/>


    </Routes>
    </Layout>

    </>
  )
}

export default App
