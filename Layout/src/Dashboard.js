import React, { Component } from 'react';
import data from './data';
import { Layout, Row, Col, Button } from 'antd';
import Map from './visuals/map/Map';
import Sankey from './visuals/sankey/Sankey';
import STable from './visuals/sankey/STable';
import oData from './data/EDD_DATA_FY17.json';
import './dashboard.css';


const { Sider, Content, Header, Footer } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOID: "",
            selectedNode: 0,
            selectedPath: 0,
            selectedData: [],
            data: oData
        }
    }

    changeSelectedOID = value => {  
        this.setState({
            selectedOID: value
        })
    }

    changeSelectedData = value => {  
        this.setState({
            selectedData: value
        })
        console.log("changeSelectedData", value);
    }

    //To be replaced with selectedSelectedData
    changeSelectedNode = value => {
        this.setState({
            selectedNode: value
        })
    }
    //To be replaced with selectedSelectedData
    changeSelectedPath = value => {
        this.setState({
            selectedPath: value
        })
    }

    render() {
        const {selectedCase, selectedNode, selectedOID, selectedData} = this.state;
        const filteredData = {};
        //const selectedData = [1,2];
        return (
            <div>
                <Layout style={{ height: 920 }}>
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 250 }}>
                            <STable 
                                data = {selectedData} 
                                changeSelectedOID={this.changeSelectedOID}  
                            />
                        </Content>
                    </Sider>
                    <Layout>
                        <Row>
                            <Col span={8} style={{ padding: "10px" }}>
                                <Content>
                                    <Button 
                                        type="primary" 
                                        style={{ width: "100%" }}
                                        onClick={() => {
                                            if(this.state.selectedNode != 0 || this.state.selectedPath != 0)
                                                console.log("predata", this.state.data);
                                                this.state.data = selectedData;
                                                console.log("postdata", this.state.data);
                                            }
                                        }
                                    >
                                        Drill Down
                                    </Button>
                                </Content>
                            </Col>
                            <Col span={8} style={{ padding: "10px" }}>
                                <Content>
                                    <Button 
                                        type="primary" 
                                        style={{ width: "100%" }}
                                        onClick={() => {
                                            if(this.state.selectedNode != 0 || this.state.selectedPath != 0)
                                                this.state.data = oData;
                                            }
                                        }
                                    >
                                        Reset
                                    </Button>
                                </Content>
                            </Col>
                            <Col span={8} style={{ padding: "10px" }}>
                                <Content>Content 3</Content>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10} style={{ padding: "10px" }}>
                                <Header>Header</Header>
                                <Content>
                                    <Sankey data={this.state.data} oData={oData} width={900} height={800} 
                                        changeSelectedNode={this.changeSelectedNode}
                                        changeSelectedPath={this.changeSelectedPath}
                                        changeSelectedData={this.changeSelectedData}
                                    />
                                </Content>
                            </Col>
                            <Col span={10} push={4} style={{ padding: "10px" }}>
                                <Content>
                                    <Map />
                                </Content>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>
            </div>
        )
    }
}