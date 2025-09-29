"use client"
import { useBooks } from "../context/BookContext"

export default function SearchFilters() {
  const {
    searchQuery,
    selectedGenre,
    selectedAgeGroup,
    selectedAvailability,
    setSearchQuery,
    setGenreFilter,
    setAgeGroupFilter,
    setAvailabilityFilter,
  } = useBooks()

  const genres = ["Adventure", "Fantasy", "Humor", "Fiction", "Classic", "Picture Book"]
  const ageGroups = ["4-7", "6-10", "7-10", "7-11", "7-12", "8-12", "9-13", "10-14", "11-14"]
  const availabilityTypes = ["Free", "Exchange"]

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">🔍 Find Your Perfect Book</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Books</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Title or author..."
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Age Group</label>
          <select
            value={selectedAgeGroup}
            onChange={(e) => setAgeGroupFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
          >
            <option value="">All Ages</option>
            {ageGroups.map((age) => (
              <option key={age} value={age}>
                {age} years
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Availability</label>
          <select
            value={selectedAvailability}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
          >
            <option value="">All Types</option>
            {availabilityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
