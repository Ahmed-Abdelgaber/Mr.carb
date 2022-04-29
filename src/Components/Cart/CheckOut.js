import classes from './CheckOut.module.css';
import useInput from '../../hooks/use-input';

const Checkout = props => {
    const {
        value: enteredName,
        isValid: validName,
        hasError: nameHasError,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
        resetInput: resetName,
    } = useInput(value => value.trim().length > 4);

    const {
        value: enteredStreet,
        isValid: validStreet,
        hasError: streetHasError,
        inputBlurHandler: streetBlurHandler,
        valueChangeHandler: streetChangeHandler,
        resetInput: resetStreet,
    } = useInput(value => value.trim().length > 4);

    const {
        value: enteredCode,
        isValid: validCode,
        hasError: codeHasError,
        inputBlurHandler: codeBlurHandler,
        valueChangeHandler: codeChangeHandler,
        resetInput: resetCode,
    } = useInput(value => !isNaN(value) && value.trim().length === 5);

    const {
        value: enteredCity,
        isValid: validCity,
        hasError: cityHasError,
        inputBlurHandler: cityBlurHandler,
        valueChangeHandler: cityChangeHandler,
        resetInput: resetCity,
    } = useInput(value =>
        ['cairo', 'alex', 'giza'].includes(value.trim().toLowerCase())
    );

    let formIsValid = false;

    if (validName && validStreet && validCity && validCode) {
        formIsValid = true;
    }

    const confirmHandler = event => {
        event.preventDefault();

        if (nameHasError || streetHasError || codeHasError || cityHasError) {
            return;
        }

        // console.table({ enteredName, enteredStreet, enteredCode, enteredCity });
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredCode,
            city: enteredCity,
        });
        resetName();
        resetStreet();
        resetCode();
        resetCity();
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div
                className={`${classes.control} ${
                    nameHasError ? classes.invalid : ''
                }`}
            >
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameHasError && <p>Name Must Be Greater Than 4 Letters</p>}
            </div>
            <div
                className={`${classes.control} ${
                    streetHasError ? classes.invalid : ''
                }`}
            >
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                    value={enteredStreet}
                />
                {streetHasError && <p>Street Must Be Greater Than 4 Letters</p>}
            </div>
            <div
                className={`${classes.control} ${
                    codeHasError ? classes.invalid : ''
                }`}
            >
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id="postal"
                    onChange={codeChangeHandler}
                    onBlur={codeBlurHandler}
                    value={enteredCode}
                />
                {codeHasError && <p>Postal Code Must Be 5 Digits</p>}
            </div>
            <div
                className={`${classes.control} ${
                    cityHasError ? classes.invalid : ''
                }`}
            >
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                    value={enteredCity}
                />
                {cityHasError && (
                    <p>
                        Please Provide The Closest Address To Our Current
                        Branches
                    </p>
                )}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} disabled={!formIsValid}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
