import ApointmentForm from '../apointmentsForm/ApointmentForm'

function appointments({ contacts }) {
  return (
   
   <>
    <ApointmentForm 
    contacts={contacts}/>
   </>
  )
}
export default appointments