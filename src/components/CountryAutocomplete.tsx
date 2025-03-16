import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Props {
  register?: any;
  name?: string;
  defaultValue?: string;
}

export default function CountryAutocomplete({
  register,
  name,
  defaultValue,
}: Props) {
  const countries = useSelector((state: RootState) => state.form.countries);

  return (
    <select {...(register ? register(name) : {})} defaultValue={defaultValue}>
      <option value="">Select Country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}
