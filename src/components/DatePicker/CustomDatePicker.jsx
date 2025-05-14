import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomDatePicker({ selectedDate, onChange, label }) {
  return (
    <div>
      <label>{label}</label>
      <ReactDatePicker selected={selectedDate} onChange={onChange} />
    </div>
  );
}
