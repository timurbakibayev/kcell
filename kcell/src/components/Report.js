import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Progress,Table,
} from 'reactstrap';
import MessageIcon from 'react-icons/lib/fa/comment';
import PeopleIcon from 'react-icons/lib/fa/mobile';
import TemplateIcon from 'react-icons/lib/fa/file-text';
import QueueIcon from 'react-icons/lib/fa/upload';
import {connect} from 'react-redux';
import {Bar, Line} from 'react-chartjs';
import * as actions from '../actions/sms';


function rand(min, max, num) {
    let rtn = [];
    while (rtn.length < num) {
        rtn.push((Math.random() * (max - min)) + min);
    }
    return rtn;
}

function data1() {
    return {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"],
        datasets: [
            {
                label: "SMS MT",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: rand(32, 10000, 7)
            },
            {
                label: "SMS MO",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: rand(32, 10000, 7)
            }
        ]
    };
}


class _report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    render() {
        return (
            <div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: "2em"}}>
                        <Bar data={data1()} width="800" height="200"/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: "2em"}}>
                        <Line data={data1()} width="800" height="200"/>
                    </div>
                    <div style={{width: 800, height: 600, overflowY: "auto", justifyContent: 'center', margin: "auto", marginBottom: "2em"}}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>MT</th>
                                    <th>KCell</th>
                                    <th>Beeline</th>
                                    <th>T2</th>
                                    <th>Altel</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Альфаномер1</td>
                                    <td>934</td>
                                    <td>592</td>
                                    <td>352,900</td>
                                    <td>79,997</td>
                                    <td>434,423</td>
                                </tr>
                                <tr>
                                    <td>Альфаномер2</td>
                                    <td>1,261,444</td>
                                    <td>58,705</td>
                                    <td>4,012</td>
                                    <td>1,439</td>
                                    <td>1,325,600</td>
                                </tr>
                                <tr>
                                    <td>КорНомер1</td>
                                    <td>65,420</td>
                                    <td>139</td>
                                    <td>351</td>
                                    <td>145</td>
                                    <td>66,055</td>
                                </tr>
                                <tr>
                                    <td>КорНомер2</td>
                                    <td>11,736</td>
                                    <td>9,568</td>
                                    <td>3,538</td>
                                    <td>12</td>
                                    <td>24,854</td>
                                </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td></td>
                                <td>1,339,534</td>
                                <td>69,004</td>
                                <td>360,801</td>
                                <td>81,593</td>
                                <td></td>
                            </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings.list,
    current_status: state.status.current_status,
    progress: state.status.progress,
    user: state.auth.auth.user,
});

const mapDispatchToProps = {
    sendSMS: actions.sendSMS,
};

const Report = connect(
    mapStateToProps,
    mapDispatchToProps
)(_report);

export default Report;