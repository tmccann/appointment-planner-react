import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../errorMessage";
import sharedStyles from "../shared.module.css";
import styles from "./appointmentForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Reusable ErrorMessage Component

function AppointmentForm({
  contacts = [],
  startDate,
  setStartDate,
  availableTimes,
  setAvailableTimes,
}) {
  const timeIntervals = useMemo(() => [
    { time: "09:00" }, { time: "09:30" }, { time: "10:00" },
    { time: "10:30" }, { time: "11:00" }, { time: "11:30" },
    { time: "12:00" }, { time: "12:30" }, { time: "13:00" },
    { time: "13:30" }, { time: "14:00" }, { time: "14:30" },
    { time: "15:00" }, { time: "15:30" }, { time: "16:00" },
    { time: "16:30" }
  ], []);

  const calculateStartDate = () => {
    const now = new Date();
    // now.setHours(16, 30, 0, 0);
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if ((hours === 16 && minutes >= 30) || hours >= 17) {
      // Set the date to the next day at midnight
      now.setDate(now.getDate() + 1);
      now.setHours(0, 0, 0, 0);
    }

    return now;
  };

  useEffect(() => {
    // Call startDate function on page load and set the result in state

    setStartDate(calculateStartDate());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function checkDate(date, field) {
    const checkToday = new Date();
    const selectedDay = date.toLocaleDateString("en-gb");
    const today = checkToday.toLocaleDateString("en-gb");
    const currentHour = checkToday.getHours();
  
    let updatedTimes;
  
    // Condition: If selected day is today and current hour is before 17
    if (selectedDay === today && currentHour < 17) {
      updatedTimes = timeIntervals.filter(({ time }) => {
        const [slotHours, slotMinutes] = time.split(':').map(Number);
        return slotHours > currentHour || (slotHours === currentHour && slotMinutes > checkToday.getMinutes());
      });
    } else {
      updatedTimes = timeIntervals;
    }
  
    // Check if the new `updatedTimes` is different before updating `availableTimes`
    if (JSON.stringify(availableTimes) !== JSON.stringify(updatedTimes)) {
      setAvailableTimes(updatedTimes);
    }
  
    field.onChange(date); 
  }


  return (
    <form
      id="appointmentForm"
      onSubmit={handleSubmit((data) => {
        data.date = data.date.toLocaleDateString("en-gb");
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
        rules={{ required: "Please select an available date" }}
        render={({ field }) => (
          <div className={styles.customDatePicker}>
            <label htmlFor="times">Select an available date</label>
            <DatePicker
              placeholderText="Select date and time"
              selected={field.value}
              onChange={(date) => checkDate(date, field)}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}
      />
      <ErrorMessage errors={errors} name="date" />
      <label htmlFor="times">Select an available time</label>
      <select
        id="times"
        {...register("times", { required: "Time selection is required" })}
      >
        <option key="defaultValue" value="">
          {availableTimes.length === 0
            ? "no avaiable times"
            : "Available times"}
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
