import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={RegisterPage()} />
        <Route path="/task" element={<h1>All Tasks</h1>} />
        <Route path="/add-task" element={<h1>Add Tasks</h1>} />
        <Route path="/tasks/:id" element={<h1>Task Nº x</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
