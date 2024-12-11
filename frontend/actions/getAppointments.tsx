export const getAppointments = async () => {
 try {
    const response = await fetch("http://localhost:8080/api/appointments/");

    const data = await response.json();
  
  
    const ArrayOfDates = data.Appointments.map((ele: any) => ({
      ...ele,
      startDate: new Date(ele.startDate),
      endDate: new Date(ele.endDate),
    }));
  
    await new Promise((resolve) => setTimeout(resolve, 500));

    if(ArrayOfDates)

    return ArrayOfDates;
    
 } catch (error) {
    console.log(error);
 }
};
