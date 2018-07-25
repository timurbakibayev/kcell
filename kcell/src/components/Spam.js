import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Progress,Table,
} from 'reactstrap';
import UnDeliveredIcon from 'react-icons/lib/go/alert';
import DeliveredIcon from 'react-icons/lib/go/check';
import {connect} from 'react-redux';
import {Bar, Line} from 'react-chartjs';
import * as actions from '../actions/sms';
import address from "../addressbook.json";

class _search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            text: "",
        };
    }

    render() {
        return (
            <div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Input value={this.state.text} onChange={(e)=> {
                        this.setState({text: e.target.value});
                    }}
                           style={{width: 800, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "1em",
                           marginTop: "1em"}}
                           placeholder="Введите сообщение для рассылки"
                    />

                    <div style={{width: 800, height: 500, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "2em"}}>
                        <Table hover responsive style={{zoom: 0.7}}>
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Номер</th>
                                </tr>
                            </thead>
                            <tbody>
                            {address.map((address, key) => (
                                <tr key={key}>
                                    <td>{address.name}</td>
                                    <td>{address.phone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages.list,
    current_status: state.status.current_status,
    progress: state.status.progress,
    user: state.auth.auth.user,
});

const mapDispatchToProps = {
    sendSMS: actions.sendSMS,
};

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(_search);

export default Search;