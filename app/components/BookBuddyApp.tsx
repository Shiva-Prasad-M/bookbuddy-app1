"use client"

import { useBooks } from "../context/BookContext"
import Header from "./Header"
import Home from "./Home"
import Dashboard from "./Dashboard"
import AddBook from "./AddBook"
import BookDetails from "./BookDetails"

export default function BookBuddyApp() {
  const { currentView, selectedBookId } = useBooks()

  const renderCurrentView = () => {
    if (selectedBookId) {
      return <BookDetails />
    }

    switch (currentView) {
      case "dashboard":
        return <Dashboard />
      case "add-book":
        return <AddBook />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{renderCurrentView()}</main>
    </div>
  )
}
