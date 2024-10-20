import './contactListItem.css'
import profilePic from '../../../../../assets/profile.png'

function contactListItem({contact}) {
  return (
    <div className="contact-card">
    <img src={profilePic} alt="" />
    <h3>{contact.name}</h3>
    <p>{contact.email}</p>
    <p>{contact.phone}</p>
</div>
  )
}
export default contactListItem