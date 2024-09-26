// schema for the form
import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('Name is required!'),
    email: yup
        .string()
        .email('Valid email address required!')
        .required('Please enter an email address'),
    password: yup
        .string()
        .trim()
        .required('Password is required!')
        .min(5, 'Password has to be at least five characters!'),
    tos: yup
    .boolean()
    .oneOf([true], 'Terms of Services must be accepted'),
})

export default formSchema;