import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Progress,
} from 'reactstrap';
import MessageIcon from 'react-icons/lib/fa/comment';
import PeopleIcon from 'react-icons/lib/fa/mobile';
import TemplateIcon from 'react-icons/lib/fa/file-text';
import QueueIcon from 'react-icons/lib/fa/upload';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs';
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


class _dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            smsText: "Здравствуйте, name! Это тестовое сообщение специально для Вас!",
            smsSinglePhoneNo: "+77022162040",
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    send_one_sms() {
        this.toggle();
        this.props.sendSMS([
            {phone: this.state.smsSinglePhoneNo, name: "Имя"},
            ], this.state.smsText);
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
                    <Card style={{width: "250px", margin: '20px', backgroundColor: "#347ab8"}}>
                        <CardBody>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <MessageIcon color="white" style={{width: "70px", height: "70px"}}/>
                                <div style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    textAlign: "right",
                                    color: "white"
                                }}>
                                    <CardText>1 280 223</CardText>
                                    <CardText>сообщений отправлено</CardText>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card style={{width: "250px", margin: '20px', backgroundColor: "#5db85b"}}>
                        <CardBody>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <PeopleIcon color="white" style={{width: "70px", height: "70px"}}/>
                                <div style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    textAlign: "right",
                                    color: "white"
                                }}>
                                    <CardText>870 000</CardText>
                                    <CardText>адресатов</CardText>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card style={{width: "250px", margin: '20px', backgroundColor: "#efad4d"}}>
                        <CardBody>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <TemplateIcon color="white" style={{width: "70px", height: "70px"}}/>
                                <div style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    textAlign: "right",
                                    color: "white"
                                }}>
                                    <CardText>92</CardText>
                                    <CardText>шаблона сообщений</CardText>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card style={{width: "250px", margin: '20px', backgroundColor: "#d95350"}}>
                        <CardBody>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <QueueIcon color="white" style={{width: "70px", height: "70px"}}/>
                                <div style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    textAlign: "right",
                                    color: "white"
                                }}>
                                    <CardText>780</CardText>
                                    <CardText>сообщений в очереди</CardText>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div style={{display: "flex", flexDirection: "column", marginRight: "30px"}}>
                        <Input type="text" value = {this.state.smsSinglePhoneNo} style={{width: "100%",}}
                            onChange = {(e) => {
                                this.setState({smsSinglePhoneNo: e.target.value});
                            }}
                        />
                        <textarea style={{width: "100%",}} rows={6} value={this.state.smsText}
                                  onChange={(e) => {
                                      this.setState({smsText: e.target.value});
                                  }}
                        />
                        <Button onClick={this.send_one_sms.bind(this)}>SEND</Button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Bar data={data1()} width="600" height="250"/>
                    </div>
                </div>
                {/*options={chartOptions}*/}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Отправка SMS в процессе: {this.props.progress}%</ModalHeader>
                    <ModalBody>
                        {this.props.current_status}
                        <Progress color="success" value={this.props.progress}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={this.props.progress==100?"primary":"secondary"}
                                onClick={this.toggle}>{this.props.progress==100?"ОК":"СТОП"}</Button>
                    </ModalFooter>
                </Modal>
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
    // refreshSettings: actionsSettings.refreshSettings,
    // submitSetting: actionsSettings.submitSetting,
};

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(_dashboard);

export default Dashboard;