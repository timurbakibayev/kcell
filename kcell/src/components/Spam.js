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
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    spamNow() {
        this.toggle();
        if (this.state.text.length === 0)
            return;
        let messages = [];
        address.forEach((address)=> {
            messages.push({
                name: address.name,
                phone: address.phone,
                text: this.state.text,
                delivered: true,
            });
        });
        this.props.sendSMS(messages, this.state.text);
    }

    render() {
        return (
            <div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "left"}}>
                    <div style={{margin: "auto", width: 800}}>
                        <span style={{marginLeft: 0}}>Набрано символов: {this.state.text.length}</span>
                    <textarea value={this.state.text} rows={4} onChange={(e)=> {
                        this.setState({text: e.target.value});
                    }}
                           style={{width: 800, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "0em",
                           marginTop: "1em"}}
                           placeholder="Введите сообщение для рассылки"
                    />
                        <Button style={{width: "100%", marginBottom: "1em"}} onClick={this.spamNow.bind(this)}>Разослать</Button>
                    </div>

                    <div style={{width: 800, height: 300, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "2em"}}>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Отправка SMS в процессе: {this.props.progress}%</ModalHeader>
                    <ModalBody>
                        {this.props.current_status}
                        <Progress color="success" value={this.props.progress}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={this.props.progress==100?"primary":"secondary"}
                                onClick={this.toggle}>{this.props.progress==100?"ОК":"ОТМЕНА"}</Button>
                    </ModalFooter>
                </Modal>
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