import { useForm } from "react-hook-form";
import MaskedInput from 'react-text-mask'; // Import MaskedInput
import "./contactForm.css";

// Reusable ErrorMessage Component
const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]) return null;
  return <span className="error">{errors[name].message}</span>;
};

function ContactForm({ addContact }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  return (
    <div className="form-wrapper">
      <div className="contact-form">
        <h2>Add New Contact</h2>
        <form
          id="contactForm"
          onSubmit={handleSubmit((data) => {
            addContact(data);
          })}
        >
          <label htmlFor="name">Name:</label>
          <input
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
          <input
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
          <MaskedInput
            mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} // Phone number mask
            placeholder="(123)--- - ----"
            {...register("phone", {
              required: "Phone number is required",
              validate: {
                pattern: value =>
                  /^\(\d{3}\) \d{3}-\d{4}$/.test(value) || "Phone number must be in (XXX) XXX-XXXX format",
                nonEmpty: value => value.replace(/[^0-9]/g, "").length === 10 || "Phone number must be complete"
              },
            })}
            onChange={(e) => {
              // Set the value to the masked input
              setValue("phone", e.target.value);
            }}
          />
          <ErrorMessage errors={errors} name="phone" />

          <div className="gender-options">
            <label>Gender:</label>
            <label htmlFor="male">Male</label>
            <input className="radioButton"
              {...register("gender", { required: "Gender is required" })}
              type="radio"
              value="male"
            />

            <label htmlFor="female">Female</label>
            <input className="radioButton"
              {...register("gender", { required: "Gender is required" })}
              type="radio"
              value="female"
            />
          </div>
          <ErrorMessage errors={errors} name="gender" />

          <div className="submit-button">
            <button className="formButton" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

