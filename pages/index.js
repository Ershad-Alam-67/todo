import { useState } from "react" // Add this line to import useState

import { MdCheckBoxOutlineBlank } from "react-icons/md"
import { Inter } from "next/font/google"
import Layout from "@/components/Layout"
import { IoIosCheckbox } from "react-icons/io"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ data }) {
  const [ary, setAry] = useState(data) // Initialize state with the 'data' prop
  console.log(data)
  const handleToggleComplete = async (id) => {
    console.log(id)
    const updatedAry = ary.map((item) =>
      item._id === id ? { ...item, completed: true } : item
    )
    setAry(updatedAry)
    console.log(typeof id)
    // Send a request to update the completion status in MongoDB
    try {
      const response = await fetch(`http://localhost:3000/api/gettodos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) {
        throw new Error("Failed to update completion status")
      }
    } catch (error) {
      console.error(
        "An error occurred while updating completion status:",
        error
      )
    }
  }

  const deleteTodo = async (id) => {
    console.log(id)
    const response = await fetch("http://localhost:3000/api/gettodos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    console.log(response)

    if (response.ok) {
      // Update the state to remove the deleted todo
      setAry((prevState) => prevState.filter((item) => item._id !== id))
    }
  }
  ary.forEach((element) => {
    console.log(element)
  })
  return (
    <Layout>
      <ul>
        {ary.map((item) => (
          <li key={item._id} className="p-2 relative flex items-center">
            {!item.completed ? (
              <MdCheckBoxOutlineBlank
                onClick={() => {
                  handleToggleComplete(item._id)
                }}
                className="mx-3   w-5 h-5"
              />
            ) : (
              <IoIosCheckbox className="mx-3   w-5 h-5" />
            )}
            <h1>{item.todo}</h1>
            <button
              onClick={() => deleteTodo(item._id)}
              className="absolute right-3 bg-red-500 px-5"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps() {
  // Fetch data from an external API
  const res = await fetch("http://localhost:3000/api/gettodos")
  const data = await res.json()
  console.log(data, "daa")

  // Pass data to the page component as props
  return {
    props: {
      data,
    },
  }
}
