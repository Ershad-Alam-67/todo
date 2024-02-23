import React from "react"
import { MongoClient } from "mongodb"
import Layout from "@/components/Layout"
import { MdCheckBoxOutlineBlank } from "react-icons/md"
import { IoIosCheckbox } from "react-icons/io"
const Today = ({ formattedFilter }) => {
  return (
    <Layout>
      <ul>
        {formattedFilter.map((item) => (
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

export default Today
export const getServerSideProps = async (context) => {
  const date = new Date().toISOString().split("T")[0]
  console.log(date)
  const client = await MongoClient.connect(
    "mongodb+srv://ershad6732:Ershad6732@cluster0.9c9ilgh.mongodb.net/?retryWrites=true&w=majority"
  )
  const db = client.db()
  const myCollection = db.collection("todos")
  const filter = await myCollection.find({ date: date }).toArray()
  const formattedFilter = filter.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }))
  console.log(filter, "filterrrrrrrrrrrrrrrrr")
  client.close()
  return {
    props: { formattedFilter },
  }
}
