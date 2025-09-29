"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBooks } from "../context/BookContext"

export default function AddBook() {
  const navigate = useNavigate()
  const { addBook } = useBooks()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    ageGroup: "",
    availabilityType: "Free",
    description: "",
    coverImage: "",
  })
  const [errors, setErrors] = useState({})

  const genres = ["Adventure", "Fantasy", "Humor", "Fiction", "Classic", "Picture Book", "Mystery", "Science Fiction"]
  const ageGroups = ["4-7", "6-10", "7-10", "7-11", "7-12", "8-12", "9-13", "10-14", "11-14"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.author.trim()) newErrors.author = "Author is required"
    if (!formData.genre) newErrors.genre = "Genre is required"
    if (!formData.ageGroup) newErrors.ageGroup = "Age group is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const bookData = {
      ...formData,
      coverImage:
        formData.coverImage ||
        `/placeholder.svg?height=200&width=150&query=${encodeURIComponent(formData.title + " book cover")}`,
    }

    addBook(bookData)
    alert("Book added successfully! 🎉")
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">📚 Add a New Book</h1>
          <p className="text-muted-foreground">Share your favorite books with the community!</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Book Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground ${
                    errors.title ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Enter book title..."
                />
                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground ${
                    errors.author ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Enter author name..."
                />
                {errors.author && <p className="text-destructive text-sm mt-1">{errors.author}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Genre *</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground ${
                    errors.genre ? "border-destructive" : "border-border"
                  }`}
                >
                  <option value="">Select genre...</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                {errors.genre && <p className="text-destructive text-sm mt-1">{errors.genre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Age Group *</label>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground ${
                    errors.ageGroup ? "border-destructive" : "border-border"
                  }`}
                >
                  <option value="">Select age group...</option>
                  {ageGroups.map((age) => (
                    <option key={age} value={age}>
                      {age} years
                    </option>
                  ))}
                </select>
                {errors.ageGroup && <p className="text-destructive text-sm mt-1">{errors.ageGroup}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Availability Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availabilityType"
                    value="Free"
                    checked={formData.availabilityType === "Free"}
                    onChange={handleChange}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">🆓 Free (Give away)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availabilityType"
                    value="Exchange"
                    checked={formData.availabilityType === "Exchange"}
                    onChange={handleChange}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">🔄 Exchange (Trade for another book)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Book Cover URL (Optional)</label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
                placeholder="https://example.com/book-cover.jpg"
              />
              <p className="text-sm text-muted-foreground mt-1">Leave empty to auto-generate a cover image</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground ${
                  errors.description ? "border-destructive" : "border-border"
                }`}
                placeholder="Tell others about this book..."
              />
              {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                📚 Add Book
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-muted text-muted-foreground py-3 rounded-full font-semibold text-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
