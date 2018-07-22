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
                    <NavbarBrand href="/"><img src={logo}/>  SMS Sender</NavbarBrand>{this.props.location.pathname}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/report">Report</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Directories
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Customers
                                    </DropdownItem>
                                    <DropdownItem>
                                        Companies
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Dashboard/>
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