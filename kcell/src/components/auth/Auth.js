import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth_jwt';
import '../general.css'
// import LoginForm from './LoginForm'
// import AuthenticatedForm from './AuthenticatedForm'


class _LoginComponent extends Component {
    componentWillMount() {
        //this.props.refresh({username: "timurbakibayev", password: "ti"});
    }

    handleRefresh(event) {
        event.preventDefault();
    }

    renderLoading() {
        if (this.props.isLoading) {
            return <p>{this.props.settings.language === "russian"?"Проверка....":"Loading..."}</p>;
        } else {
            return <p></p>;
        }
    }

    renderErrorMessage() {
        if (this.props.errorMessage) {
            return <div className="error">{this.props.errorMessage}</div>;
        } else {
            return <div></div>;
        }
    }

    login = async (values) => {
        //this.preventDefault();
        console.log("Submitting",values);
        await this.props.login({
            username: values.username,
            password: values.password
        });
        if (this.props.isAuthenticated) {
            window.location="/#/orders"
        }
    }

    logout = (values) => {
        //this.preventDefault();
        //alert("Will log out " + values.username);
        this.props.logout();
    }

    render() {
        console.log("Login component props", this.props);
        if (!this.props.isAuthenticated)
            return (
                <div>
                    <h1>Please, authenticate</h1>
                </div>
            );
        return (
                <div>
                    {/*<AuthenticatedForm {...this.props} errorMessage={ this.props.errorMessage } user={ this.props.user }*/}
                                       {/*onSubmit={ this.logout.bind(this) }/>*/}
                    <h1>Authenticated</h1>
                </div>
        )
    }
}
;

const mapStateToProps = (state) => ({
    settings: state.settings.list,
    isAuthenticated: state.auth.auth.isAuthenticated,
    user: state.auth.auth.user,
    data: state.auth.auth.data,
    isLoading: state.auth.auth.isLoading,
    errorMessage: state.auth.auth.errorMessage,
});

const mapDispatchToProps = {
    login: actions.requestLogin,
    logout: actions.logoutUser,
};

const LoginComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_LoginComponent);

export default LoginComponent;