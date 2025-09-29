"use client"

import { useBooks } from "../context/BookContext"

export default function Header() {
  const { currentView, setCurrentView, setSelectedBook, currentUser } = useBooks()

  const handleNavigation = (view: string) => {
    setSelectedBook(null)
    setCurrentView(view)
  }

  return (
    <header className="bg-card shadow-lg border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => handleNavigation("home")} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">📚</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BookBuddy
            </span>
          </button>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavigation("home")}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                currentView === "home" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleNavigation("dashboard")}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                currentView === "dashboard" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => handleNavigation("add-book")}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                currentView === "add-book" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              ➕ Add Book
            </button>
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
