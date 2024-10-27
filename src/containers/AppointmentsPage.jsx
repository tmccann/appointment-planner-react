import AppointmentForm from "../forms/AppointmentsForm/AppointmentForm";
import FormContainer from "../forms/FormContainer/FormContainer";

const AppointmentsPage = ( {contacts} ) => {

  return (
    <div>
      <FormContainer
        title={"Appointment"}>
        <AppointmentForm contacts={contacts}/>
      </FormContainer>

      <section>{/* card component */}</section>
    </div>
  );
};
export default AppointmentsPage;
