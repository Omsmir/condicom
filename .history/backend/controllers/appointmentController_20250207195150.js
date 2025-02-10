import { isBefore, isEqual, isSameDay, isAfter } from "date-fns";
import { Appointment } from "../db/schema/appointment.js";
import { User } from "../db/schema/user.js";
import { Socket, Server } from "socket.io";
import mongoose from "mongoose";
import { differenceInMinutes } from "date-fns";
import { Task } from "../db/schema/test.js";
const UpdateInterval = async () => {
  try {
    const Appointments = await Appointment.find({});

    for (const appointment of Appointments) {
      const newInterval =
        (differenceInMinutes(appointment.endDate, appointment.startDate) / 30) *
        100;

      await appointment.updateOne({
        $set: {
          interval:newInterval
        },
      });

      await appointment.save();
    }
    console.log("Intervals updated successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificTask = async (req,res,next) => {
  const { id} = req.params

const task = await Task.findOne({_id:id})
  try {


    return res.status(200).json(task)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

export const getTask = async (req,res,next) => {
  try {
    const tasks = await Task.find({})

    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
export const createTask = async(req,res,next)=>{
  const {task,description} = req.body

  try {
    if(!task || !description){
      return res.status(404).json({message:`missing fields`})
    }
    const newTask = await Task.create({task,description})

    await newTask.save()

    return res.status(201).json({task:newTask})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

// UpdateInterval();
export const CreateAppointment = async (req, res, next) => {
  const { task, startDate, endDate, interval, color, userId, description } =
    req.body;
  const requiredValues = {task, startDate, endDate, interval, userId}
  try {
    
    for(const [key,value] of Object.entries(requiredValues)){
      if(!value){
        return res.status(404).json({message:`${key} is missing`})
      }
    }

    const reservedDates = await Appointment.find({
      user: userId,
      $or: [
        {
          // Case 1: New startDate falls within an existing range
          startDate: { $lt: startDate },
          endDate: { $gt: startDate },
        },
        {
          // Case 2: New endDate falls within an existing range
          startDate: { $lt: endDate },
          endDate: { $gt: endDate },
        },
        {
          // Case 3: The new range entirely overlaps an existing range
          startDate: { $gte: startDate },
          endDate: { $lte: endDate },
        },
      ],
    });
    const reservedFrontDates = () => {
      let datesArrayState = false;
      if (
        isBefore(endDate, startDate) ||
        isEqual(endDate, startDate) ||
        !isSameDay(endDate, startDate)
      ) {
        datesArrayState = true;
        if (isBefore(endDate, startDate)) {
          return {
            datesArrayState,
            msg: "The end date is before the start date",
          };
        }

        if (isEqual(startDate, endDate)) {
          return {
            datesArrayState,
            msg: "The start and end dates are the same",
          };
        }
        if (!isSameDay(endDate, startDate)) {
          return {
            datesArrayState,
            msg: "The Dates are not the on the same day",
          };
        }
      }

      return { datesArrayState };
    };

    if (reservedFrontDates().datesArrayState) {
      return res.status(400).json({ message: reservedFrontDates().msg });
    }

    if (reservedDates.length > 0) {
      return res.status(400).json({
        message: "The new task conflicts with existing appointments.",
      });
    }
   
    const Appointments = new Appointment({
      task,
      description,
      startDate,
      endDate,
      interval,
      color,
      user: userId,
      completed: false,
    });

    await Appointments.save();
    return res
      .status(201)
      .json({ message: "Appointment Created Successfully", Appointments });
  } catch (error) {
    return next(error);
  }
};

export const getuserAppointments = async (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  const userAppointments = await Appointment.find({ user: userId }).sort({
    startDate: 1,
  });

  try {
    if (!userAppointments) {
      return res.status(404).json({ message: "User Don't Have Appointments" });
    }

    return res.status(200).json({ userAppointments });
  } catch (error) {
    return next(error);
  }
};
export const getAppointment = async (req, res, next) => {
  try {
    const Appointments = await Appointment.find({});

    if (!Appointments) {
      return res.status(404).json({ message: "There is no Appointments" });
    }
    return res.status(200).json({ message: "Good Connection", Appointments });
  } catch (error) {
    error.status = 500;
    return next(error.message);
  }
};

export const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const AppointmentToDelete = await Appointment.findByIdAndDelete(id);

    if (!AppointmentToDelete) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    error.status = 500;
    return next(error.message);
  }
};

export const editAppointment = async (req, res, next) => {
  const { id } = req.params;
  const { task, description, color, startDate, endDate, interval, completed } =
    req.body;
  try {
    const AppointmentToEdit = await Appointment.findById(id);

    if (!AppointmentToEdit) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const updates = {
      task,
      description,
      color,
      startDate,
      endDate,
      interval,
      completed,
    };

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        AppointmentToEdit[key] = value;
      }
    }
    await AppointmentToEdit.save();
    return res
      .status(200)
      .json({ message: "Appointment edited successfully", AppointmentToEdit });
  } catch (error) {
    return next(error.message);
  }
};
