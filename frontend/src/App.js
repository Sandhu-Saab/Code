import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Login
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/Signup/CreateAccount";
import ForgetRequest from "./pages/ForgotPassword/ForgetRequest"
import ForgetPassword from "./pages/ForgotPassword/ForgetPassword"
import Dashboard from "./pages/Homepage/Dashboard/Dashboard";
import AnimationLogin from "./pages/AnimationLogIn&LogOut/AnimationLogin";
import AnimationLogoff from "./pages/AnimationLogIn&LogOut/AnimationLogoff";
import IncidentList from "./pages/Homepage/IncidentManagement/IncidentList"

// Incident Management
import Incident from "./pages/Homepage/IncidentManagement/Incident"; 
import NewIncident from "./pages/Homepage/IncidentManagement/NewIncident";
import IncidentTicketList from "./pages/Homepage/IncidentManagement/IncidentList";
import OpenIncidentTicketList from "./pages/Homepage/IncidentManagement/OpenIncidentList"
import ResolvedIncidentTicketList from "./pages/Homepage/IncidentManagement/ResolvedIncidentList"
import EditIncidentPage from "./pages/Homepage/IncidentManagement/EditIncidentPage";
import NewSecurityGroupPage from "./pages/Homepage/IncidentManagement/NewSecurityGroupPage";
import ViewSecurityGroupPage from "./pages/Homepage/IncidentManagement/ViewSecurityGroupPage";
import EditSecurityGroupPage from "./pages/Homepage/IncidentManagement/EditSecurityGroupPage";

// Problem Management
import ViewProblem from "./pages/Homepage/ProblemManagement/Problem";
import NewProblem from "./pages/Homepage/ProblemManagement/NewProblem";
import ProblemList from "./pages/Homepage/ProblemManagement/ProblemList";
import EditProblemPage from "./pages/Homepage/ProblemManagement/EditProblemPage";
import OpenProblemPage from "./pages/Homepage/ProblemManagement/OpenProblemPage";
import ResolvedProblemPage from "./pages/Homepage/ProblemManagement/ResolvedProblemPage";

// Asset Management
import NewAsset from "./pages/Homepage/AssetManagement/NewAsset";
import AssetList from "./pages/Homepage/AssetManagement/AssetList";
import ViewAssetPage from "./pages/Homepage/AssetManagement/ViewAssetPage";
import EditAssetPage from "./pages/Homepage/AssetManagement/EditAssetPage";

// Change Management
import NewRequestPage from "./pages/Homepage/ChangeManagement/NewRequestPage";
import RequestList from "./pages/Homepage/ChangeManagement/RequestList";
import ViewRequestPage from "./pages/Homepage/ChangeManagement/ViewRequestPage";
import EditRequestPage from "./pages/Homepage/ChangeManagement/EditRequestPage";

// User Management
import NewUser from "./pages/Homepage/UserManagement/NewUser";
import NewSection from "./pages/Homepage/UserManagement/NewSection";
import UserList from "./pages/Homepage/UserManagement/UserList";
import ClassList from "./pages/Homepage/UserManagement/ClassList";
import ViewUserPage from "./pages/Homepage/UserManagement/ViewUserPage";
import EditUserPage from "./pages/Homepage/UserManagement/EditUserPage";
import AccountApprovalList from "./pages/Homepage/UserManagement/AccountApprovalList";
import AccountApprovalReviewPage from "./pages/Homepage/UserManagement/AccountApprovalReview";
import SectionList from "./pages/Homepage/UserManagement/SectionList";
import EditSectionPage from "./pages/Homepage/UserManagement/EditSectionPage";
import ViewSectionPage from "./pages/Homepage/UserManagement/ViewSectionPage";
import ExportData from "./pages/Homepage/ExportData/ExportData"



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* Login / Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/create/account" element={<CreateAccount />}/>
          <Route path="/forget/request" element={<ForgetRequest />}/>
          <Route path="/forget/password/:hashed_user_id/:token" element={<ForgetPassword />}/>

          <Route path="/dash" element={<Dashboard />} />
          <Route path="/login.success" element={<AnimationLogin />} />
          <Route path="/logoff.success" element={<AnimationLogoff />} />

          {/* Incident Management */}
          <Route path="/incident/securitygroup/new" element={<NewSecurityGroupPage />} />
          <Route path="/incident/securitygroup/view" element={<ViewSecurityGroupPage />} />
          <Route path="/incident/securitygroup/edit" element={<EditSecurityGroupPage />} />
          <Route path="/incident/all" element={<IncidentTicketList />} />
          <Route path="/incident/new" element={<NewIncident />} />
          <Route path="/incident/view" element={<Incident />} />
          <Route path="/incident/edit" element={<EditIncidentPage />} />
          <Route path="/incident/open" element={<OpenIncidentTicketList />} />
          <Route path="/incident/resolved" element={<ResolvedIncidentTicketList />} />

          {/* Problem Management */}
          <Route path="/problem/new" element={<NewProblem />} />
          <Route path="/problem/all" element={<ProblemList />} />
          <Route path="/problem/view" element={<ViewProblem />} />
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
          <Route path="/section/all" element={<SectionList />} />

           {/* Export Data */}
           <Route path="/export/new" element={<ExportData />} />
         

          {/* Newly Added  */}
          <Route path="/section/view" element={<ViewSectionPage />} />
          <Route path="/section/edit" element={<EditSectionPage />} />

          <Route path="/user/all" element={<UserList />} />
          <Route path="/user/view" element={<ViewUserPage />} />
          <Route path="/user/edit" element={<EditUserPage />} />
          <Route path="/user/class-all" element={<ClassList />} />
          <Route path="/user/approval" element={<AccountApprovalList />} />
          <Route path="/user/review" element={<AccountApprovalReviewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
