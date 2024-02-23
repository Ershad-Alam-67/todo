import { MongoClient, ObjectId } from "mongodb"
export default async function handler(req, res) {
  const data = req.body
  if (req.method === "POST") {
    console.log("post called")
    const client = await MongoClient.connect(
      "mongodb+srv://ershad6732:Ershad6732@cluster0.9c9ilgh.mongodb.net/?retryWrites=true&w=majority"
    )
    const db = client.db()
    const myCollection = db.collection("todos")
    const result = await myCollection.insertOne(data)
    console.log(result)
    client.close()
    res.status(201).json({ message: "todo inserted" })
  } else if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://ershad6732:Ershad6732@cluster0.9c9ilgh.mongodb.net/?retryWrites=true&w=majority"
    )
    const db = client.db()
    const collection = db.collection("todos")
    const data = await collection.find({}).toArray()
    console.log(data, "..........")
    client.close()
    res.status(200).json(data)
  } else if (req.method === "DELETE") {
    // Delete method
    const client = await MongoClient.connect(
      "mongodb+srv://ershad6732:Ershad6732@cluster0.9c9ilgh.mongodb.net/?retryWrites=true&w=majority"
    )
    const db = client.db()
    const myCollection = db.collection("todos")
    const { id } = req.body // Assuming you're sending the ID of the todo to delete
    const result = await myCollection.deleteOne({ _id: new ObjectId(id) }) // Assuming todos have MongoDB's default _id field
    console.log(result)
    client.close()
    res.status(200).json({ message: "todo deleted" })
  } else if (req.method === "PUT") {
    console.log("PUT CA")
    const client = await MongoClient.connect(
      "mongodb+srv://ershad6732:Ershad6732@cluster0.9c9ilgh.mongodb.net/?retryWrites=true&w=majority"
    )
    const db = client.db()
    const myCollection = db.collection("todos")

    const { id } = data // Assuming you're sending the ID and updated todo data

    try {
      const result = await myCollection.updateOne(
        { _id: new ObjectId(id) }, // Find the todo by its ID
        { $set: { completed: true } } // Update the todo field
      )
      console.log(result)
      res.status(200).json({ message: "todo updated" })
    } catch (error) {
      console.error("Error updating todo:", error)
      res.status(500).json({ message: "Error updating todo" })
    } finally {
      client.close()
    }
  }
}
