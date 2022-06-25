import React, { useState } from "react";
import { convertInputForm } from "../utils/convert";

export type ObjectInput = {
  [key: string]: string | number | null;
};

export type Input = string | number | ObjectInput | null;

export type EventInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type OnChangeFunc<E extends EventInput = any> = (
  e: React.ChangeEvent<E>
) => void;

export type FilterType<F> = F extends string ? string : F extends number ? number : F;

export type UseChangeEventReturn<T> = [
  value: FilterType<T>,
  setValue: React.Dispatch<React.SetStateAction<FilterType<T>>>,
  onChange: OnChangeFunc<any>,
  convertValue?: () => void
];

const useChangeEvent = <T extends Input>(
  input: FilterType<T>
): UseChangeEventReturn<T> => {
  const [value, setValue] = useState<FilterType<T>>(input);

  const onChangePrimitive: OnChangeFunc = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const onChangeObject: OnChangeFunc = (e) => {
    setValue((pre: any) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const onChange: OnChangeFunc =
    typeof value === "string" || typeof value === "number"
      ? onChangePrimitive
      : onChangeObject;

  const convertValue = () => {
    if (typeof value === "string" || typeof value === "number") {
      setValue(convertInputForm(value as string));
    } else {
      for (const property in value) {
        setValue((pre: any) => {
          return {
            ...pre,
            [property]: convertInputForm(value[property] + ""),
          };
        });
      }
    }
  };

  return [value, setValue, onChange, convertValue];
};

export default useChangeEvent;
