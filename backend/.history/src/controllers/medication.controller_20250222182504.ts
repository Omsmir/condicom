import { NextFunction, Response, Request } from "express";
export const createMedicationHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {};
