class Validator {
  private check: boolean = true;
  private error: string | null = null;

  constructor(private input: any) {
    this.input = input;
  }

  private checkFail() {
    if (!this.check) return this;
  }

  isNumber() {
    this.checkFail();
    if (!this.input.match(/\d/)) {
      this.check = false;
      this.error = "Invalid number";
    }
    return this;
  }

  isInt() {
    this.checkFail();
    this.isNumber();
    if (!this.input.match(/^[+-]?[0-9]+$/)) {
      this.check = false;
      this.error = "Invalid Integer";
    }
    return this;
  }

  isFloat() {
    this.checkFail();
    this.isNumber();
    if (!this.input.match(/^[+-]?([0-9]*[.])[0-9]+$/)) {
      this.check = false;
      this.error = "Invalid Float";
    }
    return this;
  }

  reset() {
    this.check = true;
    this.error = null;
  }

  res() {
    return {
      isValid: this.check,
      error: this.error,
    };
  }
}

export default Validator;
