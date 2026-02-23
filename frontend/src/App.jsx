import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AdminDashboard from "./pages/adminDashBoard";

function App() {
  return (
    <>
    <h1 className="text-5xl text-red-500">Test</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;