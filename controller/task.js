import { Task } from "../model/task.js";


export const addTask = async (req, res, next) => {

   try {
    const { title, description } = req.body
    const task = new Task({ title, description, user: req.user })
    await task.save();

    res.status(201).json({
        success: true,
        message: "Task Created Successfully"
    })
   } catch (error) {
    next(error);
   }

}

export const getTask = async (req, res, next) => {

    try {
        const userId = req.user._id
    const task = await Task.find({ user: userId });

    res.status(201).json({
        success: true,
        task
    });
    } catch (error) {
       next(error) ;
    }

}

// export const updateTask = async (req, res) => {

//     const id = req.query.id;
//     const task = await Task.findById({ id });

//     if (!task) return res.status(404).json({
//         success: false,
//         message: "Task not found"
//     })
//     task.isCompleted = !task.isCompleted;
//     await task.save();

//     res.status(201).json({
//         success: true,
//         message: "Task Updated successfully"
//     });

// }

// export const deleteTask = async (req, res) => {

//     const id = req.query.id;
//     const task = await Task.findById({ id });

//     if (!task) return res.status(404).json({
//         success: false,
//         message: "Task not found"
//     })

//     await task.deleteOne();

//     res.status(201).json({
//         success: true,
//         message: "Task Deleted successfully"
//     });

// }