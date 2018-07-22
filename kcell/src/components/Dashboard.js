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

const _dashboard = (props) => {
    return (
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