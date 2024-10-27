import { Controller, useForm } from "react-hook-form";
import sharedStyles from "../shared.module.css";
import styles from "./appointmentForm.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Reusable ErrorMessage Component
const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]) return null;
  return <span className={sharedStyles.error}>{errors[name].message}</span>;
};

function AppointmentForm({ contacts = [] }) {
  console.log(contacts);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  return (
    <form 
      id="appointmentForm"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        {...register("title", {
          required: "title is required",
          minLength: {
            value: 4,
            message: "title must be atleast 4 charcters",
          },
        })}
      />
      <ErrorMessage errors={errors} name="title" />
      <label htmlFor="selectContact">Select Contact</label>
      <select
        {...register("selectContact", {
          required: "Contact selection required",
          validate: () => contacts.length > 0 || "No contacts available. Please add contacts first.",
        })}
      >
        <option key="defaultValue" value="">
          {contacts.length === 0
            ? "No contacts available"
            : "Please select a contact"}
        </option>
        {(contacts || []).map((contact) => (
    <option key={contact.id} value={contact.name}>
      {contact.name}
    </option>
  ))}
      </select>
      {contacts.length === 0 && (
  <span className={sharedStyles.error}>Please add contacts first.</span>
)}
      <ErrorMessage errors={errors} name="selectContact" />
   
        <Controller
              control={control}
              name="date"
              rules={{ required: "Date and time are required" }}
              render={({ field }) => (
                <div className={styles.customDatePicker}>
                <DatePicker
                  placeholderText="Select date and time"
                  selected={field.value}
                  onChange={(date) => checkDate(date,field)}
                  minDate={new Date()}
        
                />
                </div>
              )}
            />
      

      <div className={sharedStyles.submitButton}>
        <button className={sharedStyles.formButton} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default AppointmentForm;
