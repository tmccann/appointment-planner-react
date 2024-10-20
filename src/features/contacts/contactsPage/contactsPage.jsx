import ContactForm from "./Features/contactForm/ContactForm";
import ContactList from "./Features/ContactList/contactList";

function contactsPage({ addContact, test, contacts }) {
  return (
    <>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} />
      <button onClick={test}>testing</button>
    </>
  );
}
export default contactsPage;
