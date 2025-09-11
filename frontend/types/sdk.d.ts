

declare type Appointment = {
  _id: string;
  task: string;
  description: string;
  startDate: Date;
  endDate: Date;
  interval: string;
  color: string;
  user: string;
  completed: boolean;
  createdAt: Date;
  patientEmail?: string;
}

declare type AppointmentUpdateI = {
    state: boolean;
};

declare type responseMessage = {
    message: string;
};

declare type CreateAppointmentI = {
    appointment: FormData;
    patientState: boolean | undefined;
};

declare type CreateAppointmentResponseI = {
    message:string;
    appointment:Appointment
}