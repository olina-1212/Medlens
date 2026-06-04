import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analysis" element={<AnalysisPage />} />
    </Routes>
  );
}

export default App;