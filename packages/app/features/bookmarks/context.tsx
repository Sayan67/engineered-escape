import React, { createContext, useState, useContext } from 'react'

const BookmarksContext = createContext({})

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<any[]>([])

  const addBookmark = (blog) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, blog])
  }

  const removeBookmark = (blogId) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((blog) => blog.id !== blogId))
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export const useBookmarks = () => useContext(BookmarksContext)
