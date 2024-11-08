import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Header";
import Home from "./pages/Home";
import UniversityDashboard from "./pages/UniversityDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import ExamControllerDashboard from "./pages/ExamControllerDashboard";
import useAuth from "./hooks/useAuth.js";
import Admin from "./pages/Admin.js";
import Login from "./pages/Login.js";

function App() {
  const { isConnected, user, role } = useAuth();

  const getDashboardComponent = () => {
    switch (role) {
      case "admin":
        return <UniversityDashboard />;
      case "student":
        return <StudentDashboard />;
      case "faculty":
        return <FacultyDashboard />;
      case "examController":
        return <ExamControllerDashboard />;
      default:
        return <Home />; // Default to Home if no valid role
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* If the user is not connected, redirect them to the login page */}
        {!isConnected ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <>
            {/* Default dashboard route based on the user's role */}
            <Route path="/dashboard" element={getDashboardComponent()} />

            {/* Admin-specific routes */}
            {role === "admin" && (
              <>
                <Route
                  path="/university-dashboard"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/faculty-list"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/exam-controller-list"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/student-list"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/pending-approvals"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/email-creation"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/generated-certificate"
                  element={<UniversityDashboard />}
                />
                <Route
                  path="/university-dashboard/grade-records"
                  element={<UniversityDashboard />}
                />
              </>
            )}

            {/* Student-specific routes */}
            {role === "student" && (
              <>
                <Route
                  path="/student-dashboard"
                  element={<StudentDashboard />}
                />
                <Route
                  path="/student-dashboard/grade-history"
                  element={<StudentDashboard />}
                />
                <Route
                  path="/student-dashboard/generate-certificate"
                  element={<StudentDashboard />}
                />
              </>
            )}

            {/* Faculty-specific routes */}
            {role === "faculty" && (
              <>
                <Route
                  path="/faculty-dashboard"
                  element={<FacultyDashboard />}
                />
                <Route
                  path="/faculty-dashboard/grade-submission"
                  element={<FacultyDashboard />}
                />
                <Route
                  path="/faculty-dashboard/student-list"
                  element={<FacultyDashboard />}
                />
              </>
            )}

            {/* Exam Controller-specific routes */}
            {role === "examController" && (
              <>
                <Route
                  path="/exam-controller-dashboard"
                  element={<ExamControllerDashboard />}
                />
                <Route
                  path="/exam-controller-dashboard/student-list"
                  element={<ExamControllerDashboard />}
                />
                <Route
                  path="/exam-controller-dashboard/faculty-list"
                  element={<ExamControllerDashboard />}
                />
                <Route
                  path="/exam-controller-dashboard/grade-approval"
                  element={<ExamControllerDashboard />}
                />
              </>
            )}
          </>
        )}

        {/* Default route for non-authenticated or invalid role users */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
