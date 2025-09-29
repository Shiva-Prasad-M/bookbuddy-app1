import { useBooks } from "../context/BookContext"
import SearchFilters from "../components/SearchFilters"
import BookCard from "../components/BookCard"

export default function Home() {
  const { filteredBooks } = useBooks()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Share Books, Share Joy! 📚✨
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover amazing books from friends, share your favorites, and build a community of young readers!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-2xl">
            <span>📖</span>
            <span>🌟</span>
            <span>👫</span>
            <span>🎉</span>
            <span>💝</span>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <SearchFilters />
        </div>
      </section>

      {/* Books Grid */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">📚 Available Books ({filteredBooks.length})</h2>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
