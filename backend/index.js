const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
app.use(express.json());

app.post("/todo", async function(req, res) {
    const createPayLoad = req.body;
    const parsedPayLoad = createTodo.safeParse(createPayLoad);
    if (!parsedPayLoad.success) {
        res.status(401).json({
            message: "Invalid inputs"
        })
        return;
    }

    try {
        await todo.create({
            title: createPayLoad.title,
            description: createPayLoad.description,
            completed: false
        })

        res.json({
            message : "Todo Created..."
        })
    } catch (e) {
        res.json({
            message: "Error Occurred...",
            error: e.message
        });
    }
    
})

app.get("/todos", async function(req, res) {
    try {
        const allTodos = await todo.find({});
        res.json({
            allTodos
        })
    } catch (e) {
        res.json({
            message: "Error Occured..",
            error : e.message
        })
    }
    
})

app.put("/completed", async function(req, res) {
    const updatePayLoad = req.body;
    const parsedPayLoad = updateTodo.safeParse(updatePayLoad);
    if (!parsedPayLoad.success) {
        res.status(401).json({
            message: "Invalid inputs"
        })
        return;
    }

    try {
        await todo.updateOne(
            { _id: updatePayLoad.id }, // Query criteria
            { $set: { completed: true } } // Update operation
        );
        res.json({
            message : "Todo marked as completed..."
        })
    }
    catch (e) {
        res.json({
            message: "Error Occured..",
            error : e.message
        })
    }

})


app.listen(3000, () => {
    console.log("Listening on port 3000....")
});