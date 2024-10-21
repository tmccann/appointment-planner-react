import './contactListItem.css'
import maleProfile  from '../../../../../../assets/male.png'
import femaleProfile from '../../../../../../assets/female.png'
function contactListItem({contact}) {
  const profilePic = contact.gender === 'male' ? maleProfile : femaleProfile
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