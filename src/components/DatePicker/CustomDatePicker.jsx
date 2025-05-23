import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({ selectedDate, onChange, label, id }) {
  return (
    <div className="custom-date-picker">
      <label htmlFor={id}>{label}</label>
      <ReactDatePicker
        id={id}
        selected={selectedDate}
        onChange={onChange}
        aria-describedby={`${id}-description`}
      />
    </div>
  );
}
