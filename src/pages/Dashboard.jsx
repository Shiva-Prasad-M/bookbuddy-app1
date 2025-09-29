"use client"

import { useState } from "react"
import { useBooks } from "../context/BookContext"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const { books, requests, users, currentUser, updateRequestStatus } = useBooks()
  const [activeTab, setActiveTab] = useState("myBooks")

  const myBooks = books.filter((book) => book.ownerId === currentUser.id)
  const myRequests = requests.filter((request) => request.requesterId === currentUser.id)
  const incomingRequests = requests.filter((request) => request.ownerId === currentUser.id)

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-success text-white"
      case "Pending":
        return "bg-warning text-white"
      case "Approved":
        return "bg-primary text-white"
      case "Rejected":
        return "bg-destructive text-white"
      case "Shared":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleRequestAction = (requestId, action) => {
    updateRequestStatus(requestId, action)
  }

  const tabs = [
    { id: "myBooks", label: "📚 My Books", count: myBooks.length },
    { id: "myRequests", label: "📤 My Requests", count: myRequests.length },
    { id: "incoming", label: "📥 Incoming", count: incomingRequests.length },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {currentUser.name}! 👋</h1>
          <p className="text-muted-foreground">Manage your books and requests</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card rounded-2xl shadow-lg border border-border mb-8">
          <div className="flex flex-wrap border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground rounded-t-2xl"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* My Books Tab */}
            {activeTab === "myBooks" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Your Book Collection</h2>
                  <Link
                    to="/add-book"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    ➕ Add New Book
                  </Link>
                </div>

                {myBooks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No books yet</h3>
                    <p className="text-muted-foreground mb-4">Start sharing by adding your first book!</p>
                    <Link
                      to="/add-book"
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      Add Your First Book
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myBooks.map((book) => (
                      <div key={book.id} className="bg-muted rounded-lg p-4 border border-border">
                        <div className="flex items-start space-x-3">
                          <img
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-balance">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                              >
                                {book.status}
                              </span>
                              <Link
                                to={`/book/${book.id}`}
                                className="text-primary hover:text-primary/80 text-sm font-medium"
                              >
                                View →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* My Requests Tab */}
            {activeTab === "myRequests" && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Your Book Requests</h2>

                {myRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📤</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No requests sent</h3>
                    <p className="text-muted-foreground mb-4">Browse books and send your first request!</p>
                    <Link
                      to="/"
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      Browse Books
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myRequests.map((request) => {
                      const book = books.find((b) => b.id === request.bookId)
                      const owner = users.find((u) => u.id === request.ownerId)
                      const offeredBook = request.offeredBookId
                        ? books.find((b) => b.id === request.offeredBookId)
                        : null

                      return (
                        <div key={request.id} className="bg-muted rounded-lg p-4 border border-border">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <img
                                src={book?.coverImage || "/placeholder.svg"}
                                alt={book?.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div>
                                <h3 className="font-semibold text-foreground">{book?.title}</h3>
                                <p className="text-sm text-muted-foreground">by {book?.author}</p>
                                <p className="text-sm text-muted-foreground">Owner: {owner?.name}</p>
                                {offeredBook && (
                                  <p className="text-sm text-accent-foreground">Offering: {offeredBook.title}</p>
                                )}
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}
                            >
                              {request.status}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Incoming Requests Tab */}
            {activeTab === "incoming" && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Incoming Requests</h2>

                {incomingRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📥</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No incoming requests</h3>
                    <p className="text-muted-foreground">When others request your books, they'll appear here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incomingRequests.map((request) => {
                      const book = books.find((b) => b.id === request.bookId)
                      const requester = users.find((u) => u.id === request.requesterId)
                      const offeredBook = request.offeredBookId
                        ? books.find((b) => b.id === request.offeredBookId)
                        : null

                      return (
                        <div key={request.id} className="bg-muted rounded-lg p-4 border border-border">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-3">
                              <img
                                src={book?.coverImage || "/placeholder.svg"}
                                alt={book?.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div>
                                <h3 className="font-semibold text-foreground">{book?.title}</h3>
                                <p className="text-sm text-muted-foreground">Requested by: {requester?.name}</p>
                                <p className="text-sm text-muted-foreground">Type: {request.type}</p>
                                {offeredBook && (
                                  <p className="text-sm text-accent-foreground">
                                    Offered in exchange: {offeredBook.title}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}
                            >
                              {request.status}
                            </span>
                          </div>

                          {request.status === "Pending" && (
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleRequestAction(request.id, "Approved")}
                                className="flex-1 bg-success text-white py-2 rounded-full font-medium hover:bg-success/90 transition-colors"
                              >
                                ✅ Approve
                              </button>
                              <button
                                onClick={() => handleRequestAction(request.id, "Rejected")}
                                className="flex-1 bg-destructive text-destructive-foreground py-2 rounded-full font-medium hover:bg-destructive/90 transition-colors"
                              >
                                ❌ Reject
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
