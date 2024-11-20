import styles from "./formContainer.module.css";

const FormContainer = ({ title, children }) => {
  return (
    <div className={styles.form_container }>
      <div className={styles.form}>
        <h2>Add New {title}</h2>
        {children}
      </div>
    </div>
  );
};
export default FormContainer;
