import React from 'react'

export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return(
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a User</h2>
                <button disabled={disabled}>Submit</button>

                <div className='errors'>
                    {/* Errors here */}
                    <div>{errors.first_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>

                <div className='form-group inputs'>
                    <label>Name
                        <input
                            value={values.first_name}
                            onChange={onChange}
                            name='name'
                            type='text'
                        />
                    </label>
                    <label>Email
                        <input
                            value={values.email}
                            onChange={onChange}
                            name='email'
                            type='email'
                        />
                    </label>
                    <label>Password
                        <input
                            value={values.password}
                            onChange={onChange}
                            name='password'
                            type='password'
                        />
                    </label>
                    <label>Terms of Service
                        <input
                            checked={values.tos}
                            onChange={onChange}
                            name='tos'
                            type='checkbox'
                        />
                    </label>
                </div>
            </div>
        </form>
    )
}