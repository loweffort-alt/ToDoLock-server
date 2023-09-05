import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AllTasks from "./pages/AllTaskPage";
import Profile from "./pages/ProfilePage";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              {/*Public Paths*/}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/*Only Users Loged*/}
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<AllTasks />} />
                <Route path="/new-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
