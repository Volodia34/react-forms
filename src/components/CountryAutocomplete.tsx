import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  register?: UseFormRegister<Record<string, unknown>>;
  name: string;
  defaultValue?: string;
}

export default function CountryAutocomplete({
  register,
  name,
  defaultValue,
}: Props) {
  const countries = useSelector((state: RootState) => state.form.countries);

  return (
    <select
      {...(register ? register(name) : { name })}
      defaultValue={defaultValue}
    >
      <option value="">Select Country</option>
      {countries.map((country: string) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}
