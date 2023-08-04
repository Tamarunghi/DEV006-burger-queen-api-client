import dayjs from 'dayjs';

interface FormattedDateProps {
  dateEntry: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ dateEntry }) => {
  const formattedDate = dayjs(dateEntry).format("YYYY-MM-DD HH:mm:ss");
console.log(formattedDate); 
  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};
