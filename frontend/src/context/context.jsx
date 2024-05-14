import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [blogPosts, setBlogPosts] = useState([]);

  return (
    <GlobalContext.Provider value={{blogPosts, setBlogPosts}}>{children}</GlobalContext.Provider>
  )
}

