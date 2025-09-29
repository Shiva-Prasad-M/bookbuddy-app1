"use client"

import { createContext, useContext, useReducer } from "react"

const BookContext = createContext()

// Mock data
const initialUsers = [
  { id: 101, name: "Aarav Sharma", email: "aarav@example.com", avatar: "/boy-avatar.png" },
  { id: 102, name: "Ananya Gupta", email: "ananya@example.com", avatar: "/diverse-girl-avatar.png" },
  { id: 103, name: "Vihaan Patel", email: "vihaan@example.com", avatar: "/boy-avatar.png" },
  { id: 104, name: "Ishita Reddy", email: "ishita@example.com", avatar: "/diverse-girl-avatar.png" },
  { id: 105, name: "Kabir Mehta", email: "kabir@example.com", avatar: "/boy-avatar.png" },
  { id: 106, name: "Myra Khan", email: "myra@example.com", avatar: "/diverse-girl-avatar.png" },
  { id: 107, name: "Arjun Nair", email: "arjun@example.com", avatar: "/boy-avatar.png" },
  { id: 108, name: "Sara D'Souza", email: "sara@example.com", avatar: "/diverse-girl-avatar.png" },
  { id: 109, name: "Rohan Das", email: "rohan@example.com", avatar: "/boy-avatar.png" },
  { id: 110, name: "Zoya Iqbal", email: "zoya@example.com", avatar: "/diverse-girl-avatar.png" },
]

const initialBooks = [
  {
    id: 1,
    title: "The Magic Treehouse",
    author: "Mary Pope Osborne",
    genre: "Adventure",
    ageGroup: "7-10",
    coverImage: "/magic-treehouse-book.jpg",
    availabilityType: "Free",
    status: "Available",
    ownerId: 101,
    description: "Join Jack and Annie on magical adventures through time!",
  },
  {
    id: 2,
    title: "Charlie and the Chocolate Factory",
    author: "Roald Dahl",
    genre: "Fantasy",
    ageGroup: "8-12",
    coverImage: "/charlie-chocolate-factory-book.jpg",
    availabilityType: "Exchange",
    status: "Available",
    ownerId: 102,
    description: "A sweet adventure in Willy Wonka's magical chocolate factory.",
  },
  {
    id: 3,
    title: "Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    genre: "Humor",
    ageGroup: "9-13",
    coverImage: "/placeholder-1crxq.png",
    availabilityType: "Free",
    status: "Available",
    ownerId: 103,
    description: "Follow Greg's hilarious middle school adventures!",
  },
  {
    id: 4,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    ageGroup: "10-14",
    coverImage: "/harry-potter-book.jpg",
    availabilityType: "Exchange",
    status: "Available",
    ownerId: 104,
    description: "The magical beginning of Harry's journey at Hogwarts.",
  },
  {
    id: 5,
    title: "Matilda",
    author: "Roald Dahl",
    genre: "Fiction",
    ageGroup: "7-11",
    coverImage: "/placeholder-8vb2n.png",
    availabilityType: "Free",
    status: "Available",
    ownerId: 105,
    description: "A brilliant girl with extraordinary powers!",
  },
  {
    id: 6,
    title: "Percy Jackson and the Lightning Thief",
    author: "Rick Riordan",
    genre: "Fantasy",
    ageGroup: "11-14",
    coverImage: "/percy-jackson-book.jpg",
    availabilityType: "Exchange",
    status: "Available",
    ownerId: 106,
    description: "Discover the world of Greek gods in modern times.",
  },
  {
    id: 7,
    title: "Charlotte's Web",
    author: "E.B. White",
    genre: "Classic",
    ageGroup: "6-10",
    coverImage: "/charlottes-web-book.jpg",
    availabilityType: "Free",
    status: "Available",
    ownerId: 107,
    description: "A heartwarming tale of friendship between a pig and spider.",
  },
  {
    id: 8,
    title: "The Cat in the Hat",
    author: "Dr. Seuss",
    genre: "Picture Book",
    ageGroup: "4-7",
    coverImage: "/cat-in-hat-book.jpg",
    availabilityType: "Free",
    status: "Available",
    ownerId: 108,
    description: "Fun and chaos with the Cat in the Hat!",
  },
  {
    id: 9,
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    genre: "Classic",
    ageGroup: "8-12",
    coverImage: "/secret-garden-book.jpg",
    availabilityType: "Exchange",
    status: "Available",
    ownerId: 109,
    description: "Discover the magic of a hidden garden.",
  },
  {
    id: 10,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    genre: "Classic",
    ageGroup: "7-12",
    coverImage: "/placeholder-zwxib.png",
    availabilityType: "Free",
    status: "Available",
    ownerId: 110,
    description: "A beautiful story about friendship and imagination.",
  },
]

const initialRequests = [
  { id: 201, bookId: 2, ownerId: 102, requesterId: 105, type: "Exchange", offeredBookId: 5, status: "Pending" },
  { id: 202, bookId: 3, ownerId: 103, requesterId: 101, type: "Free", offeredBookId: null, status: "Approved" },
  { id: 203, bookId: 6, ownerId: 106, requesterId: 104, type: "Exchange", offeredBookId: 4, status: "Rejected" },
  { id: 204, bookId: 7, ownerId: 107, requesterId: 108, type: "Free", offeredBookId: null, status: "Pending" },
  { id: 205, bookId: 9, ownerId: 109, requesterId: 110, type: "Exchange", offeredBookId: 10, status: "Pending" },
  { id: 206, bookId: 1, ownerId: 101, requesterId: 102, type: "Free", offeredBookId: null, status: "Shared" },
  { id: 207, bookId: 8, ownerId: 108, requesterId: 103, type: "Free", offeredBookId: null, status: "Pending" },
  { id: 208, bookId: 4, ownerId: 104, requesterId: 109, type: "Exchange", offeredBookId: 9, status: "Pending" },
  { id: 209, bookId: 5, ownerId: 105, requesterId: 110, type: "Free", offeredBookId: null, status: "Rejected" },
  { id: 210, bookId: 10, ownerId: 110, requesterId: 101, type: "Exchange", offeredBookId: 1, status: "Pending" },
]

const initialState = {
  users: initialUsers,
  books: initialBooks,
  requests: initialRequests,
  currentUser: initialUsers[0], // Simulating logged-in user
  searchQuery: "",
  selectedGenre: "",
  selectedAgeGroup: "",
  selectedAvailability: "",
}

function bookReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }
    case "SET_GENRE_FILTER":
      return { ...state, selectedGenre: action.payload }
    case "SET_AGE_GROUP_FILTER":
      return { ...state, selectedAgeGroup: action.payload }
    case "SET_AVAILABILITY_FILTER":
      return { ...state, selectedAvailability: action.payload }
    case "ADD_BOOK":
      const newBook = {
        ...action.payload,
        id: Math.max(...state.books.map((b) => b.id)) + 1,
        ownerId: state.currentUser.id,
        status: "Available",
      }
      return { ...state, books: [...state.books, newBook] }
    case "ADD_REQUEST":
      const newRequest = {
        ...action.payload,
        id: Math.max(...state.requests.map((r) => r.id)) + 1,
        requesterId: state.currentUser.id,
        status: "Pending",
      }
      return { ...state, requests: [...state.requests, newRequest] }
    case "UPDATE_REQUEST_STATUS":
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.id === action.payload.requestId ? { ...request, status: action.payload.status } : request,
        ),
      }
    default:
      return state
  }
}

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(bookReducer, initialState)

  const filteredBooks = state.books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(state.searchQuery.toLowerCase())
    const matchesGenre = !state.selectedGenre || book.genre === state.selectedGenre
    const matchesAgeGroup = !state.selectedAgeGroup || book.ageGroup === state.selectedAgeGroup
    const matchesAvailability = !state.selectedAvailability || book.availabilityType === state.selectedAvailability

    return matchesSearch && matchesGenre && matchesAgeGroup && matchesAvailability
  })

  const value = {
    ...state,
    filteredBooks,
    dispatch,
    setSearchQuery: (query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    setGenreFilter: (genre) => dispatch({ type: "SET_GENRE_FILTER", payload: genre }),
    setAgeGroupFilter: (ageGroup) => dispatch({ type: "SET_AGE_GROUP_FILTER", payload: ageGroup }),
    setAvailabilityFilter: (availability) => dispatch({ type: "SET_AVAILABILITY_FILTER", payload: availability }),
    addBook: (book) => dispatch({ type: "ADD_BOOK", payload: book }),
    addRequest: (request) => dispatch({ type: "ADD_REQUEST", payload: request }),
    updateRequestStatus: (requestId, status) =>
      dispatch({ type: "UPDATE_REQUEST_STATUS", payload: { requestId, status } }),
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}
