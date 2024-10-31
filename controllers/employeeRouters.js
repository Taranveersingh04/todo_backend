const express = require("express");
const { TaskModel } = require("../models");
const { connect } = require("../dbConfig");

connect();
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.send(tasks);
    } catch (err) {
        console.log("Error while getting tasks");
        res.status(400).send("Error while fetching tasks");
    }
});

// Create a new task
router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const createdAt = Date.now();
        const desc = req.body.desc;
        const deadline = req.body.deadline;
        const completed = req.body.completed;

        const newTask = new TaskModel({
            name: name,
            createdAt: createdAt,
            desc: desc,
            deadline: deadline,
            completed: completed
        });

        console.log(newTask);
        const result = await newTask.save();
        console.log("Task Saved");
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send("Task not saved");
    }
});

// Update an existing task
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const desc = req.body.desc;
        const deadline = req.body.deadline;
        const completed = req.body.completed;

        console.log(name + " " + id);
        const createdAt = Date.now();
        const emp = {
            name: name,
            createdAt: createdAt,
            desc: desc,
            deadline: deadline,
            completed: completed
        };
        const updated = await TaskModel.findByIdAndUpdate(id, 
            { $set: emp }, { new: true });
        if (!updated) {
            console.log("Task not found");
            return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200)
            .json({ message: "Task Updated Successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({ error: "Internal Server Error" });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            console.log("Task not found");
            return res.status(404)
                .json({ error: "Task not found" });
        }
        console.log("Task deleted Successfully");
        return res.status(200)
            .json({ message: "Task deleted Successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({ error: "Internal Server Error" });
    }
});

module.exports = router;