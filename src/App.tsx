import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FloatingNav } from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";
import CustomCursor from "./components/ui/cursor";
import ScrollToTop from "./components/ui/ScrollToTop";
import RouteMetadata from "./components/RouteMetadata";

function App() {
  const navItems = [
    { name: "Inicio", link: "/" },
    { name: "Proyectos", link: "#projects" },
    { name: "Contacto", link: "#contact" },
  ];

  return (
    <Router>
      <RouteMetadata />
      <ScrollToTop />
      <CustomCursor />
      <FloatingNav navItems={navItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
