import React, { createContext, useState, useContext } from 'react'

export const BookmarksContext = createContext({})

interface stateProp {
  blogId: number
  title: string
}

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<stateProp[]>([])

  const addBookmark = (blogId: number, title: string) => {
    const newObj = [...bookmarks, { blogId, title }]
    setBookmarks(newObj)
  }

  const removeBookmark = (blogId: number) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((blog) => blog.blogId !== blogId))
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export const useBookmarks = () =>
  useContext(BookmarksContext) as {
    bookmarks: { blogId: number; title: string }[]
    addBookmark: (blogId: number, title: string) => void
    removeBookmark: (blogId: number) => void
  }
