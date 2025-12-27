import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import SearchForm from "./components/SearchForm/SearchForm";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="page">
      <Header />
      <Navigation />
      <SearchForm />

      <Routes>
        <Route path="/" element={<div>Main Page</div>} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
