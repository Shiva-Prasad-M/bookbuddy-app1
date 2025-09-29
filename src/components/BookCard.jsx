import { Link } from "react-router-dom"
import { useBooks } from "../context/BookContext"

export default function BookCard({ book }) {
  const { users } = useBooks()
  const owner = users.find((user) => user.id === book.ownerId)

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-success text-white"
      case "Pending":
        return "bg-warning text-white"
      case "Shared":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getAvailabilityIcon = (type) => {
    return type === "Free" ? "🆓" : "🔄"
  }

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img src={book.coverImage || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
            {book.status}
          </span>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {getAvailabilityIcon(book.availabilityType)} {book.availabilityType}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1 text-balance">{book.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">by {book.author}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
            {book.genre}
          </span>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
            Ages {book.ageGroup}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={owner?.avatar || "/placeholder.svg"}
              alt={owner?.name}
              className="w-6 h-6 rounded-full border border-border"
            />
            <span className="text-xs text-muted-foreground">{owner?.name}</span>
          </div>

          <Link
            to={`/book/${book.id}`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
