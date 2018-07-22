import React from 'react';
import { reduxForm } from 'redux-form';
import FlatButton from 'material-ui/Button/Button';
import '../general.css';

const validate = values => {
    const errors = {}
    const requiredFields = ['username', 'password']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Поле обязательно'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

let AuthenticatedForm = props => {
    const { handleSubmit } = props;
    console.log("AuthenticatedForm props", props);
    return (
        <form onSubmit={ handleSubmit } className="formLogin">
            <h2>{props.settings.language === "russian"?
                `Добро пожаловать, ${props.user.details.first_name} ${props.user.details.last_name}!`:
                `Welcome, ${props.user.details.first_name} ${props.user.details.last_name}!`}
                </h2>
            <h2>  </h2>
            <h3>{props.settings.language === "russian" ?
                `Ваша роль в системе: ${props.user.details.in_group}`:
                `Your role(s): ${props.user.details.in_group}`
            }</h3>

            <FlatButton type="submit">{props.settings.language === "russian" ?"Выйти":"Log out"}</FlatButton>
        </form>
    )
}

AuthenticatedForm = reduxForm({
    form: 'login',
    fields: ['username', 'password'],
    validate,
})(AuthenticatedForm)

export default AuthenticatedForm;