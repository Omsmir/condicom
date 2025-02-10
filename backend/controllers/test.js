export const getSpecificTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });
  try {
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page ) || 1;
    const limit = parseInt(req.query.limit ) || 3;
    const skip = (page - 1) * limit;

    const tasks = await Task.find().skip(skip).limit(limit);
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createTask = async (req, res, next) => {
  const { task, description } = req.body;

  try {
    if (!task || !description) {
      return res.status(404).json({ message: `missing fields` });
    }
    const newTask = await Task.create({ task, description });

    await newTask.save();

    return res.status(201).json({ task: newTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, description } = req.body;

  const data = {task, description};
  try {
    const existingTask = await Task.findOne({ _id: id });

    if (!existingTask) {
      return res.status(404).json({ message: "task is not found" });
    }

    for (const [key, value] of Object.entries(data)) {
      if (value) {
        existingTask[key] = value;
      }
    }

    await existingTask.save();

    return res.status(200).json({ existingTask });
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
};


export const deleteTask = async (req,res,next) =>{
  const { id}  = req.params

try {

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"mongoose id is not valid"})
  }

  const task = await Task.findOne({_id:id})

  if(!task){
    return res.status(404).json({message:"appointment not found"})
  }

  await task.deleteOne()
  return res.status(200).json({task})
} catch (error) {
  return res.status(500).json({message:error.message});

}
}