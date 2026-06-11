import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/"
        element={
          token ? <Dashboard /> : <Navigate to="/auth" replace />
        }
      />

      <Route
        path="/history"
        element={
          token ? <HistoryPage /> : <Navigate to="/auth" replace />
        }
      />

      <Route
        path="/analysis"
        element={
          token ? <AnalysisPage /> : <Navigate to="/auth" replace />
        }
      />
    </Routes>
  );
}

export default App;