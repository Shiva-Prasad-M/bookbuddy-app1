"use client"

import { BookProvider } from "./context/BookContext"
import BookBuddyApp from "./components/BookBuddyApp"

export default function Page() {
  return (
    <BookProvider>
      <BookBuddyApp />
    </BookProvider>
  )
}
