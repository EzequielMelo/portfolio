import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FloatingNav } from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  const navItems = [
    { name: "Inicio", link: "/" },
    { name: "Proyectos", link: "/projects" },
    { name: "Contacto", link: "/contact" },
  ];

  return (
    <Router>
      <FloatingNav navItems={navItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
