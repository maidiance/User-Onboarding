import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import User from './components/User';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import schema from './validation/formSchema';
import * as yup from 'yup';

const initialFormValues = {
  first_name: '',
  email: '',
  password: '',
  tos: false,
}

const initialFormErrors = {
  first_name: '',
  email: '',
  password: '',
  tos: '',
}

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    // axios get call
    axios.get('https://reqres.in/api/users')
      .then(resp => {
        // console.log('response', resp.data.data);
        setUsers(resp.data.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const postNewUser = newUser => {
    // axios post call
    axios.post('https://reqres.in/api/users', newUser)
      .then(resp => {
        // console.log(resp.data);
        setUsers([ resp.data, ...users])
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setFormValues(initialFormValues))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    // Validate with yup
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: ['tos'].filter(tos => !!formValues[tos]),
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues]);

  return (
    <div className="container">
      <header><h1>User App</h1></header>
      
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return(
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
