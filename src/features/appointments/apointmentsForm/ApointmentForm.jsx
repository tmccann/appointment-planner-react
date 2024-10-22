import { useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes } from "date-fns";

// Reusable ErrorMessage Component
const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]) return null;
  return <span className="error">{errors[name].message}</span>;
};

function ApointmentForm({ contacts }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();



  return (
    <div className="form-wrapper">
      <div className="contact-form">
        <h2>Add Appointment</h2>
        <form
          id="contactForm"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset(); 
          })}
        >
          <label htmlFor="title">Title:</label>
          <input
            {...register("title", {
              required: "title is required",
              minLength: {
                value: 4,
                message: "title length must be atleast 4 charcters",
              },
            })}
          />
          <ErrorMessage errors={errors} name="title" />

          <label htmlFor="selectContact">Select Contact</label>
          <select
            {...register("selectContact", {
              required: "contact selection required",
            })}
          >
            <option key="defaultValue" value="">
              please select a contact
            </option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.name}>
                {contact.name}
              </option>
            ))}
          </select>
          <ErrorMessage errors={errors} name="selectContact" />
       <label htmlFor="date">Select Date and Time</label>
      
      {/* Using Controller to integrate react-datepicker with react-hook-form */}
      <Controller
        control={control}
        name="date"
        rules={{ required: "Date and time are required" }} // Validation rule for required
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date and time"
            selected={field.value} // Use field.value for controlled input
            onChange={(date) => field.onChange(date)} // Pass the date back to react-hook-form
            showTimeSelect // Enables time selection
            timeIntervals={30} // Sets 30-minute intervals
            timeFormat="HH:mm" // Time format for display
            dateFormat="dd/MM/yyyy HH:mm" // Date and time format
            minTime={setHours(setMinutes(new Date(), 59), 7)} // Minimum time: 08:00
            maxTime={setHours(setMinutes(new Date(), 0), 17)} 
            
          />
        )}
      />
      {errors.date && <p>{errors.date.message}</p>} {/* Error message if date is not selected */}

          <div className="submit-button">
            <button className="formButton" type="submit">
              Submit
            </button>
          </div>
        </form> 
      </div>
    </div>
  );
}

export default ApointmentForm;
