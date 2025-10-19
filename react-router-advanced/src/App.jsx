import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home           from "./pages/Home";
import Login          from "./pages/Login";
import Profile        from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
return (
<BrowserRouter><nav><Link to="/"> | <Link to="/login"> | <Link to="/profile">

<Routes><Home /><Login /><ProtectedRoute><Profile />
}>
<Route index element={<Navigate to="details" replace /><ProfileDetails /><ProfileSettings />
<Route path="/post/:id" element={<h2><PostId />} />
<Route path="*" element={<h2>} />


);
}
function PostId() {
const { id } = require("react-router-dom").useParams();
return id;
}
export default App;
