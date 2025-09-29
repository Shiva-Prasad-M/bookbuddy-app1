"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useBooks } from "../context/BookContext"

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { books, users, currentUser, addRequest } = useBooks()
  const [selectedBookForExchange, setSelectedBookForExchange] = useState("")
  const [showRequestForm, setShowRequestForm] = useState(false)

  const book = books.find((b) => b.id === Number.parseInt(id))
  const owner = users.find((u) => u.id === book?.ownerId)
  const userBooks = books.filter((b) => b.ownerId === currentUser.id && b.status === "Available")

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Book not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleRequest = () => {
    if (book.availabilityType === "Exchange" && !selectedBookForExchange) {
      alert("Please select a book to exchange!")
      return
    }

    const request = {
      bookId: book.id,
      ownerId: book.ownerId,
      type: book.availabilityType,
      offeredBookId: book.availabilityType === "Exchange" ? Number.parseInt(selectedBookForExchange) : null,
    }

    addRequest(request)
    alert("Request sent successfully! 🎉")
    setShowRequestForm(false)
  }

  const isOwnBook = book.ownerId === currentUser.id

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
              />
            </div>

            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{book.title}</h1>
                  <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      book.status === "Available"
                        ? "bg-success text-white"
                        : book.status === "Pending"
                          ? "bg-warning text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {book.status}
                  </span>
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {book.availabilityType === "Free" ? "🆓 Free" : "🔄 Exchange"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/20 text-secondary px-4 py-2 rounded-lg text-center">
                  <div className="font-semibold">Genre</div>
                  <div>{book.genre}</div>
                </div>
                <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg text-center">
                  <div className="font-semibold">Age Group</div>
                  <div>{book.ageGroup} years</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground text-pretty">{book.description}</p>
              </div>

              <div className="flex items-center space-x-4 mb-6 p-4 bg-muted rounded-lg">
                <img
                  src={owner.avatar || "/placeholder.svg"}
                  alt={owner.name}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div>
                  <div className="font-semibold text-foreground">Book Owner</div>
                  <div className="text-muted-foreground">{owner.name}</div>
                </div>
              </div>

              {!isOwnBook && book.status === "Available" && (
                <div className="space-y-4">
                  {!showRequestForm ? (
                    <button
                      onClick={() => setShowRequestForm(true)}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
                    >
                      {book.availabilityType === "Free" ? "🆓 Request This Book" : "🔄 Propose Exchange"}
                    </button>
                  ) : (
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-3">
                        {book.availabilityType === "Free" ? "Request Book" : "Select Book to Exchange"}
                      </h4>

                      {book.availabilityType === "Exchange" && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Choose one of your books to exchange:
                          </label>
                          <select
                            value={selectedBookForExchange}
                            onChange={(e) => setSelectedBookForExchange(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
                          >
                            <option value="">Select a book...</option>
                            {userBooks.map((userBook) => (
                              <option key={userBook.id} value={userBook.id}>
                                {userBook.title} by {userBook.author}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <button
                          onClick={handleRequest}
                          className="flex-1 bg-primary text-primary-foreground py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
                        >
                          Send Request
                        </button>
                        <button
                          onClick={() => setShowRequestForm(false)}
                          className="flex-1 bg-muted text-muted-foreground py-2 rounded-full font-medium hover:bg-muted/80 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isOwnBook && (
                <div className="bg-accent/20 text-accent-foreground p-4 rounded-lg text-center">
                  <span className="font-medium">📚 This is your book!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
