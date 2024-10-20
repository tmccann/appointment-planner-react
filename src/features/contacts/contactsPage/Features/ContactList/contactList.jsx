import ContactListItem from "./contactListItem"
import './contactList.css'

function contactList({ contacts }) {

  console.log(contacts)
  return (
    <div className="contact-list">
    <h2>Your Contacts</h2>
    <div id="contactsContainer"> 

     
    {contacts.map((contact)=>(
        <ContactListItem key={contact.id} contact={contact}/>
      ))
    }
       
      
    </div>
</div>


    
  

  )

}
export default contactList