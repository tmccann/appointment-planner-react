import maleProfile  from '../../../assets/images/male.png'
import femaleProfile from '../../../assets/images/female.png'
import styles from './contactListItem.module.css'

const contactListItem = ( { contact }) => {
  const profilePic = contact.gender === 'male' ? maleProfile : femaleProfile

  return (
    <div className={styles.contactCard}>
    <img src={profilePic} alt="" />
    <h3>{contact.name}</h3>
    <p>{contact.email}</p>
    <p>{contact.phone}</p>
</div>
  )
}
export default contactListItem