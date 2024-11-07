import { Text, TextField } from '@radix-ui/themes';
import { midnightTimeAtom, totalTimeAtom } from '../stores';
import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';

interface Props {
  name: string;
  unit: string;
  atom: typeof totalTimeAtom | typeof midnightTimeAtom;
}

export default function HourField({ name, unit, atom }: Props) {
  const [value, setValue] = useAtom(atom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  return (
    <TextField.Root type="number" value={value} onChange={handleChange}>
      <TextField.Slot>
        <Text>{name}</Text>
      </TextField.Slot>

      <TextField.Slot>
        <Text>{unit}</Text>
      </TextField.Slot>
    </TextField.Root>
  );
}
