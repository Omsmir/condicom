import { NextFunction, Response, Request } from "express";
import { AppointmentSchemaInterface } from "../schemas/appointment.schema";
import { AppointmentModel } from "../models/appointment.model";
import { findUserAppointments } from "../services/appointments.service";
import { isBefore, isEqual, isSameDay } from "date-fns";

export const createAppointmentHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const userId = res.locals.user._id

        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const reservedDates = await findUserAppointments({user:userId,$or:[
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
        ]})

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
             return
          }
      
          if (reservedDates.length > 0) {
             res.status(400).json({
              message: "The new task conflicts with existing appointments.",
            });
            return
          }
      
          const newAppointment = await create
    } catch (error) {
        
    }
};
