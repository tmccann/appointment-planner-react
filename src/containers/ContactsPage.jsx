import ContactForm from '../forms/ContactsForm/ContactForm'
import FormContainer from '../forms/FormContainer/FormContainer'


const ContactsPage = () => {
  return (
    <div>
        <FormContainer title={'Contact'}>     
          <ContactForm />
        </FormContainer>
        
      <section>
        {/* card component */}
      </section>
    </div>
  )
}
export default ContactsPage


