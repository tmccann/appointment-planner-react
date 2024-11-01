import ContactListItem from "./contactListItem/contactListItem";
import styles from './contactlist.module.css'

function contactList({ contacts }) {
  console.log(contacts);

  return (
    <div className={styles.contactList}>
      <h2>Your Contacts</h2>
      <div className={styles.contactListContainer}>
        {contacts.map((contact) => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
export default contactList;
