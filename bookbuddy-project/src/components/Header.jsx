import { Link, useLocation } from "react-router-dom"
import { useBooks } from "../context/BookContext"

export default function Header() {
  const location = useLocation()
  const { currentUser } = useBooks()

  return (
    <header className="bg-card shadow-lg border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">📚</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BookBuddy
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === "/" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              🏠 Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === "/dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/add-book"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === "/add-book"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              ➕ Add Book
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border-2 border-primary"
              />
              <span className="hidden sm:block text-sm font-medium text-foreground">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
