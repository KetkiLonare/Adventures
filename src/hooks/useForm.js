import { useState, useEffect } from "react";

const useForm = (callback, validate, formObj) => {
    const [values, setValues] = useState(formObj);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        const { name, value, checked, type } = event.target;
        setErrors({...errors,[name]:null})
        let updateKeyPair = { [name]: value };
        if (type == "checkbox") { updateKeyPair[name] = checked; };
        setValues({
        ...values,
        ...updateKeyPair
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmitting) {

            callback();
        }
    }, [errors]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        setErrors,
        setValues,
        setIsSubmitting
    };
};

export default useForm;