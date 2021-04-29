import client from "../../lib/sanity/client";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      //this JSON arrives as a string, so we turn it into a JS object with JSON.parse()
      const newTodo = await JSON.parse(req.body);
      await client
        .create({
          _type: "todo",
          text: newTodo.text,
          isCompleted: false,
          createdAt: new Date().toISOString(),
          dueDate: newTodo.dueDate,
          userEmail: newTodo.user,
        })
        .then((res) => {
          console.log(`Todo was created, document ID is ${res._id}`);
        });
      res
        .status(200)
        .json({ msg: `Todo was created, document ID is ${res._id}` });
      break;

    case "PUT":
      const result = await client
        .patch(req.body.id)
        .set({
          isCompleted: !req.body.isCompleted,
          completedAt: !!req.body.isCompleted ? "" : new Date().toISOString(),
        })
        .commit();
      res.status(200).json({
        status: result.isCompleted,
        completedAt: result.completedAt,
      });

      break;
    case "DELETE":
      await client
        .delete(req.body)
        .then((res) => {
          res.body;
        })
        .then((res) => console.log(`Todo was deleted`));
      res.status(200).json({ msg: "Success" });
      break;
    // case "GET":
    //   let todos = await client.fetch(
    //     `*[_type=="todo"]{text, createdAt, dueAt, isCompleted}`
    //     // {
    //     //   userEmail: user,
    //     // }
    //   );
    //   res.status(200).json({ todos: todos });
    //   break;
    default:
      res.status(404).json({
        msg: "Something went wrong.",
      });
  }
}
