import React from "react"
import Navbar from "./Navbar"
const Layout = ({ children }) => {
  return (
    <div className=" bg-slate-400 w-[60%] mx-auto">
      <Navbar></Navbar>
      {children}
    </div>
  )
}

export default Layout
