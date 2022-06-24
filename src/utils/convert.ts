import Validator from "./validator";

export const convertInputForm = (input: string): any => {
  if (new Validator(input).isInt().res().isValid) {
    return parseInt(input);
  }

  if (new Validator(input).isFloat().res().isValid) {
    return parseFloat(input);
  }

  return input;
};
