// import "./App.css
import { React } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount"
import ForgetRequest from "./pages/ForgetRequest";
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import AnimationLogin from "./components/Login/AnimationLogin";
import AnimationLogoff from "./components/Login/AnimationLogoff";

/// Incident Management
import NewSecurityGroupPage from "./pages/NewSecurityGroupPage";
import ViewSecurityGroupPage from "./pages/ViewSecurityGroupPage";
import Incident from "./pages/Incident";
import NewIncident from "./pages/NewIncident";
import IncidentList from "./pages/IncidentList";
import OpenIncidentTicketList from"./pages/OpenIncidentList";
import ResolvedIncidentTicketList from "./pages/ResolvedIncidentList";
import EditIncidentPage from "./pages/EditIncidentPage";
import EditSecurityGroupPage from "./pages/EditSecurityGroupPage";

/// Problem Management
import ViewProblem from "./pages/Problem";
import NewProblem from "./pages/NewProblem";
import ProblemList from "./pages/ProblemList";
import EditProblemPage from "./pages/EditProblemPage";
import OpenProblemPage from "./pages/OpenProblemPage";
import ResolvedProblemPage from "./pages/ResolvedProblemPage";

// Asset Management
import NewAsset from "./pages/NewAsset"; 
import AssetList from "./pages/AssetList";
import ViewAssetPage from "./pages/ViewAssetPage";
import EditAssetPage from "./pages/EditAssetPage";


/// Change Management
import NewRequestPage from "./pages/NewRequestPage";
import RequestList from "./pages/RequestList";
import ViewRequestPage from "./pages/ViewRequestPage";
import EditRequestPage from "./pages/EditRequestPage";

/// User Management
import NewUser from "./pages/NewUser";
import NewSection from "./pages/NewSection";
import UserList from "./pages/UserList";
import ClassList from "./pages/ClassList";
import ViewUserPage from "./pages/ViewUserPage";
import EditUserPage from "./pages/EditUserPage";
import AccountApprovalList from "./pages/AccountApprovalList";
import AccountApprovalReview from "./components/User/AccountApprovalReviewForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create/account" element={<CreateAccount />}/>
        <Route path="/forget/request" element={<ForgetRequest />}/>
        <Route path="/forget/password" element={<ForgetPassword />}/>

        <Route path="/dash" element={<Dashboard />} />
        <Route path="/login.success" element={<AnimationLogin />} />
        <Route path="/logoff.success" element={<AnimationLogoff />} />

        {/* Incident Management */}
        <Route path="/incident/securitygroup/new" element={<NewSecurityGroupPage />} />
        <Route path="/incident/securitygroup/view" element={<ViewSecurityGroupPage />} />
        <Route path="/incident/securitygroup/edit" element={<EditSecurityGroupPage />} />
        <Route path="/incident/all" element={<IncidentList />} />
        <Route path="/incident/new" element={<NewIncident />} />
        <Route path="/incident/view" element={<Incident />} />
        <Route path="/incident/edit" element={<EditIncidentPage />} />
        <Route path="/incident/open" element={<OpenIncidentTicketList />} />
        <Route path="/incident/resolved" element={<ResolvedIncidentTicketList />} />

        {/* Problem Management */}
        <Route path="/problem/new" element={<NewProblem />} />
        <Route path="/problem/all" element={<ProblemList />} />
        <Route path="/problem/view" element={<ViewProblem />} /> {/* Change to ViewProblemPage */}
        <Route path="/problem/edit" element={<EditProblemPage />} />
        <Route path="/problem/open" element={<OpenProblemPage />} />
        <Route path="/problem/resolved" element={<ResolvedProblemPage />} />

        {/* Asset Management */}
        <Route path="/asset/new" element={<NewAsset />} />
        <Route path="/asset/all" element={<AssetList />} />
        <Route path="/asset/view" element={<ViewAssetPage />} />
        <Route path="/asset/edit" element={<EditAssetPage />} />

        {/* Change Management */}
        <Route path="/change/new" element={<NewRequestPage />} />
        <Route path="/change/all" element={<RequestList />} />
        <Route path="/change/view" element={<ViewRequestPage />} />
        <Route path="/change/edit" element={<EditRequestPage />} />

        {/* User Management */}
        <Route path="/user/new" element={<NewUser />} />
        <Route path="/section/new" element={<NewSection />} />
        <Route path="/user/all" element={<UserList />} />
        <Route path="/user/view" element={<ViewUserPage />} />
        <Route path="/user/edit" element={<EditUserPage />} />
        <Route path="/user/class-all" element={<ClassList />} />
        <Route path="/user/approval" element={<AccountApprovalList />} />
        <Route path="/user/review" element={<AccountApprovalReview />} />
      </Routes>
    </div>
  );
}

export default App;
