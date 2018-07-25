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

class _search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            search: "",
        };
    }

    filter(messages, text) {
        let fm = [];
        messages.forEach((message)=> {
            if (text.length === 0) {
                fm.push(message);
            } else {
                let failed = false;
                text.split(" ").forEach((word)=>{
                   if (
                       (message.text.toUpperCase().indexOf(word.toUpperCase())<0) &&
                       (message.phone.toUpperCase().indexOf(word.toUpperCase())<0) &&
                       (message.name.toUpperCase().indexOf(word.toUpperCase())<0)
                   )
                       failed = true;
                });
                if (!failed)
                    fm.push(message);
            }
        });
        return fm;
    }

    render() {
        let filteredMessages = this.filter(this.props.messages, this.state.search);
        return (
            <div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Input value={this.state.search} onChange={(e)=> {
                        this.setState({search: e.target.value});
                    }}
                           style={{width: 800, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "1em",
                           marginTop: "1em"}}
                           placeholder="Введите строку для поиска"
                    />

                    <div style={{width: 800, height: 500, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "2em"}}>
                        <Table hover responsive style={{zoom: 0.7}}>
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Номер</th>
                                    <th>Текст</th>
                                    <th>Доставлено</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredMessages.map((message, key) => (
                                <tr key={key}>
                                    <td>{message.name}</td>
                                    <td>{message.phone}</td>
                                    <td>{message.text}</td>
                                    <td>{message.delivered?(<DeliveredIcon color="green"/>):(<UnDeliveredIcon color="red"/>)}</td>
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