import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BookProvider } from "./context/BookContext"
import Header from "./components/Header"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import BookDetails from "./pages/BookDetails"
import AddBook from "./pages/AddBook"

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/add-book" element={<AddBook />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookProvider>
  )
}

export default App
