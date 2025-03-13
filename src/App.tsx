import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FloatingNav } from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

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
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
