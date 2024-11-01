import ContactForm from '../forms/ContactsForm/ContactForm'
import FormContainer from '../forms/FormContainer/FormContainer'
import ContactList from '../components/contactlist/ContactList'


const ContactsPage = ( { contacts }) => {

  return (
    <div>
        <FormContainer title={'Contact'}>     
          <ContactForm />
        </FormContainer>
        <ContactList 
        contacts={contacts}
        />
    </div>
  )
}
export default ContactsPage


