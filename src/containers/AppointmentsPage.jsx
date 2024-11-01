import AppointmentForm from "../forms/AppointmentsForm/AppointmentForm";
import FormContainer from "../forms/FormContainer/FormContainer";

const AppointmentsPage = ( { contacts, startDate, setStartDate, availableTimes, setAvailableTimes} ) => {

  return (
    <div>
      <FormContainer
        title={"Appointment"}>
        <AppointmentForm 
        contacts={contacts}
        startDate={startDate}
        setStartDate={setStartDate}
        availableTimes={availableTimes}
        setAvailableTimes={setAvailableTimes}
        
        />
      </FormContainer>

      <section>{/* card component */}</section>
    </div>
  );
};
export default AppointmentsPage;
