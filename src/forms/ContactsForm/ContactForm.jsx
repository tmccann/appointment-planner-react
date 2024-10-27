import { useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import styles from './contactForm.module.css';
import sharedStyles from '../shared.module.css';

// Reusable ErrorMessage Component
const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]) return null;
  return <span className={sharedStyles.error}>{errors[name].message}</span>;
};

function ContactForm({ addContact }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <label htmlFor="name">Name:</label>
      <input id='name'
        {...register("name", {
          required: "Name is required",
          pattern: {
            value: /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/,
            message: "Name must include first and last name, each at least 2 characters",
          },
        })}
      />
      <ErrorMessage errors={errors} name="name" />
      <label htmlFor="email">Email:</label>
      <input id='email'
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
      />
      <ErrorMessage errors={errors} name="email" />

      <label htmlFor="phone">Phone Number:</label>
      <MaskedInput id='phone'
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(123) 456-7890"
        {...register("phone", {
          required: "Phone number is required",
          validate: {
            pattern: value =>
              /^\(\d{3}\) \d{3}-\d{4}$/.test(value) || "Phone number must be in (XXX) XXX-XXXX format",
            nonEmpty: value => value.replace(/[^0-9]/g, "").length === 10 || "Phone number must be complete"
          },
        })}
        onChange={(e) => setValue("phone", e.target.value)}
      />
      <ErrorMessage errors={errors} name="phone" />
        {/* <label htmlFor="gender">Gender: </label> */}
        <fieldset className={styles.fieldset}>
        <legend>Gender: </legend>
        <div className={styles.switch}>

        <input 
          type="radio"
          id="male"
          value="male"
          {...register("gender", { required: "Gender is required" })}
        />
        <label htmlFor="male" className={styles.switchLabel}>Male</label>

        <input
          type="radio"
          id="female"
          value="female"
          {...register("gender", { required: "Gender is required" })}
        />
        <label htmlFor="female" className={styles.switchLabel}>Female</label>
      </div>
      </fieldset>
      <ErrorMessage errors={errors} name="gender" />

      <div className={sharedStyles.submitButton}>
        <button className={sharedStyles.formButton} type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ContactForm;

