import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlipBookLayout from "@/components/layout/FlipBookLayout";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlipBookLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
