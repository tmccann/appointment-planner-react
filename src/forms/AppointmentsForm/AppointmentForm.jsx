import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import sharedStyles from "../shared.module.css";
import styles from "./appointmentForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Reusable ErrorMessage Component

function AppointmentForm({ contacts = [] }) {
  const [startDate, setStartDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([])
  const timeIntervals = [
    { time: "09:00" },
    { time: "09:30" },
    { time: "10:00" },
    { time: "10:30" },
    { time: "11:00" },
    { time: "11:30" },
    { time: "12:00" },
    { time: "12:30" },
    { time: "13:00" },
    { time: "13:30" },
    { time: "14:00" },
    { time: "14:30" },
    { time: "15:00" },
    { time: "15:30" },
    { time: "16:00" },
    { time: "16:30" },
    { time: "17:00" },
  ];

  useEffect(() => {
    // Call startDate function on page load and set the result in state
    const calculateStartDate = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 17) {
        // Set the date to the next day at midnight
        now.setDate(now.getDate() + 1);
        now.setHours(0, 0, 0, 0);
      }

      return now;
    };

    setStartDate(calculateStartDate());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function checkDate(date, field) {

    const checkToday = new Date(); // Set to today's date and time
    // use to test with diffrent times
    // checkToday.setHours(12, 0, 0, 0);
    const selectedDay = date.toLocaleDateString("en-gb");
    const today = checkToday.toLocaleDateString("en-gb");
    const currentHour = checkToday.getHours();

    if (selectedDay === today && currentHour < 17) {
      const todaysAvailableTimes = timeIntervals.filter(({ time }) => {
        const [slotHours, slotMinutes] = time.split(':').map(Number);
        return slotHours > currentHour || (slotHours === currentHour && slotMinutes > checkToday.getMinutes());
      });

      setAvailableTimes(todaysAvailableTimes)
    } else {
      setAvailableTimes(timeIntervals)
    }

    field.onChange(date);
  }


  const ErrorMessage = ({ errors, name }) => {
    if (!errors[name]) return null;
    return <span className={sharedStyles.error}>{errors[name].message}</span>;
  };
  return (
    <form
      id="appointmentForm"
      onSubmit={handleSubmit((data) => {
        data.date = data.date.toLocaleDateString("en-gb")
        console.log(data)
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
          validate: () =>
            contacts.length > 0 ||
            "No contacts available. Please add contacts first.",
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
            <label htmlFor="times">Select an available date</label>
            <DatePicker
              placeholderText="Select date and time"
              selected={field.value}
              onChange={(date) => checkDate(date, field)}
              minDate={startDate}
              dateFormat='dd/MM/yyyy'
            />
          </div>
        )}
      />

      <label htmlFor="times">Select an available time</label>
      <select
        id="times"
        {...register("times", { required: "Time selection is required" })}
      >
        <option key="defaultValue" value="">
          {availableTimes.length === 0 ? "no avaiable times" : "Available times"}
        </option>
        {(availableTimes || []).map(({ time }) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <ErrorMessage errors={errors} name="times" />

      <div className={sharedStyles.submitButton}>
        <button className={sharedStyles.formButton} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default AppointmentForm;
