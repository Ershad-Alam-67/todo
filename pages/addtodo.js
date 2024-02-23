import React, { useRef } from "react"
import Layout from "@/components/Layout"
// import '../pages/api/gettodos'
const Addtodo = () => {
  const inputRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/api/gettodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: inputRef.current.value,
        date: new Date().toISOString().split("T")[0],
        completed: false,
      }),
    })
    console.log(response, ".......")
    const data = await response.json()
    console.log(data)
  }
  return (
    <div>
      <Layout>
        <form
          className=" w-[50%] bg-slate-300 mx-auto items-center flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className=" bg-gray-300">
            <h1 className=" inline-block">Todo:</h1>
            <input className=" p-1" ref={inputRef} type="text" />
          </div>
          <button className=" bg-green-500 p-1 mt-1 px-3" type="submit">
            submit
          </button>
        </form>
      </Layout>
    </div>
  )
}

export default Addtodo
