import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import MessageIcon from 'react-icons/lib/fa/comment';
import PeopleIcon from 'react-icons/lib/fa/mobile';
import TemplateIcon from 'react-icons/lib/fa/file-text';
import QueueIcon from 'react-icons/lib/fa/upload';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs';


function rand(min, max, num) {
    let rtn = [];
    while (rtn.length < num) {
        rtn.push((Math.random() * (max - min)) + min);
    }
    return rtn;
}

function data1() {
    return {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "SMS Sent",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: rand(32, 10000, 7)
            },
            {
                label: "SMS Sent1",
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


const _dashboard = (props) => {
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
            {/*options={chartOptions}*/}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Bar data={data1()} width="600" height="250"/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    settings: state.settings.list,
    user: state.auth.auth.user,
});

const mapDispatchToProps = {
    // refreshOrders: actions.refreshOrders,
    // refreshSettings: actionsSettings.refreshSettings,
    // submitSetting: actionsSettings.submitSetting,
};

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(_dashboard);

export default Dashboard;