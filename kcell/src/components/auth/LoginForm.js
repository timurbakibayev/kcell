import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../formElements/fields';
import FlatButton from 'material-ui/Button/Button';
import '../general.css';

const validate = values => {
    const errors = {}
    const requiredFields = ['username', 'password']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = ('Field is required')
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

let LoginForm = props => {
    const { handleSubmit } = props;
    console.log("Login Form props", props);
    return (
        <form onSubmit={ handleSubmit } className="formLogin">
            <h2>{props.settings.language === "russian"?
            "Пожалуйста, введите имя пользователя и пароль":
            "Please, enter your Username and Password"
            }</h2>

            <div>
                <Field name="username" component={ renderTextField } label={props.settings.language === "russian"?"Имя пользователя":"Username"}/>
            </div>
            <div>
                {/* bellow if I substitute textField with 'input' everything works fine */}
                <Field name="password" component={ renderTextField } type="password" label={props.settings.language === "russian"?"Пароль":"Password"}/>
            </div>
            <FlatButton type="submit">{props.settings.language === "russian" ? "Войти":"Log in"}</FlatButton>
        </form>
    )
}

LoginForm = reduxForm({
    form: 'login',
    fields: ['username', 'password'],
    validate,
})(LoginForm)

export default LoginForm;



