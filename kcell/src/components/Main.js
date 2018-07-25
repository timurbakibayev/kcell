import React, {Component} from 'react';
import LoginComponent from "./auth/Auth"
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import classNames from 'classnames';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import {connect} from 'react-redux';

import * as actionType from '../actionTypes';

import logo from '../lte_logo_30.png'

import Dashboard from './Dashboard';
import Report from './Report';
import Search from './Search';
import Spam from './Spam';

class _MainComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            settingsClicked: 0,
            isOpen: false,
        }
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    //     if (this.props.location.pathname === "/orders" ||
    //     this.props.location.pathname === "/orders/to_me" ||
    //     this.props.location.pathname === "/" ||
    //     this.props.location.pathname === "/orders/closed" ||
    //     this.props.location.pathname === "/orders/from_me"
    //

    render() {
        const {classes} = this.props;
        console.log("Main.js props", this.props);
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="#/"><img src={logo}/>  SMS Sender</NavbarBrand>{this.props.location.pathname}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#/search">Поиск</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/report">Отчет</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/spam">Рассылка</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.props.location.pathname === "/" && <Dashboard/>}
                {this.props.location.pathname === "/report" && <Report/>}
                {this.props.location.pathname === "/search" && <Search/>}
                {this.props.location.pathname === "/spam" && <Spam/>}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    settings: state.settings.list,
    user: state.auth.auth.user,
});

const mapDispatchToProps = {
    // refreshOrders: actions.refreshOrders,
    // refreshSettings: actionsSettings.refreshSettings,
    // submitSetting: actionsSettings.submitSetting,
};

const MainComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_MainComponent);

export default MainComponent;