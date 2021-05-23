import { ReactElement, useCallback, useEffect, useState } from "react";

import { Input } from "@geist-ui/react";
import { InputProps } from "@geist-ui/react/dist/input/input";
import debounce from 'lodash/debounce';

interface Props extends Partial<InputProps> {
  value: string;
  setValue: (value: string) => void;
}


export default function DebouncedInput({ setValue, value, ...props }: Props): ReactElement {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => setLocalValue(value), [value]);
  const update = debounce((value: string) => setValue(value), 250);

  const onChange = useCallback((e) => {
    update(e.target.value);
    setLocalValue(e.target.value);
  }, []);

  return <Input placeholder={'Keyword, example: #twitch'} value={localValue || ''} onChange={onChange} {...props} />
}