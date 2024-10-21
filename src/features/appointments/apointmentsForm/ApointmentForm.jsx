import { useForm } from "react-hook-form";
import MaskedInput from "react-text-mask"; // Import MaskedInput
import "./appointmetForm.css";

// Reusable ErrorMessage Component
const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]) return null;
  return <span className="error">{errors[name].message}</span>;
};

function ApointmentForm({ contacts }) {
  console.log(contacts)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  return (
    <div className="form-wrapper">
      <div className="contact-form">
        <h2>Add Appointment</h2>
        <form
          id="contactForm"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <label htmlFor="title">Title:</label>
          <input
            {...register("title", {
              required: "title is required",
              minLength: 4,
            })}
          />
          <ErrorMessage errors={errors} name="title" />

          <label htmlFor="selectContact">Select Contact</label>
          <select {...register("selectContact")}>
    {contacts.map((contact) => (
      <option key={contact.name} value={contact.name}>
        {contact.name}
      </option>
    ))}
  </select>
          <ErrorMessage errors={errors} name="selectContact" />

          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApointmentForm;
