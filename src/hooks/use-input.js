import { useState } from 'react';

const useInput = validateInput => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValidValue = validateInput(enteredValue);
    const hasError = !isValidValue && isTouched;

    const valueChangeHandler = event => {
        setIsTouched(true);
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = event => {
        setIsTouched(true);
    };

    const resetInput = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: isValidValue,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetInput,
    };
};

export default useInput;
