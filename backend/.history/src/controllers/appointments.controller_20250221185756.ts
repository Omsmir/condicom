import { NextFunction, Response, Request } from "express";
import { AppointmentParamInterface, AppointmentSchemaInterface } from "../schemas/appointment.schema";
import { AppointmentModel } from "../models/appointment.model";
import {
  createAppointment,
  findUserAppointments,
} from "../services/appointments.service";
import { isBefore, isEqual, isSameDay } from "date-fns";

export const createAppointmentHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId

    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const reservedDates = await findUserAppointments({
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
      res.status(400).json({ message: reservedFrontDates().msg });
      return;
    }

    if (reservedDates.length > 0) {
      res.status(400).json({
        message: "The new task conflicts with existing appointments.",
      });
      return;
    }

    const newAppointment = await createAppointment({
      user: userId,
      ...req.body,
    });

    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserAppointments = async (
  req: Request<AppointmentParamInterface['params'], {}, AppointmentSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.params.id

    if(!id){
        res.status(404)
    }
  } catch (error) {}
};
