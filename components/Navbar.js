import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center relative bg-slate-300 p-4">
      <div className="flex-grow  text-center">
        <Link href={"/"}>ToDo App</Link>
      </div>
      <div className=" bg-gray-500 py-1 px-7">
        <Link href={"/addtodo"}>Add Todo</Link>
      </div>
    </nav>
  )
}

export default Navbar
