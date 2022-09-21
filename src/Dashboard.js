import React, { Component } from 'react';
import { Layout, Row, Col, Button, Checkbox, Popover } from 'antd';
import Map from './visuals/map/Map';
import Sankey from './visuals/sankey/Sankey';
import STable from './visuals/sankey/STable';
import oData from './data/EDD_DATA_FY17.json';
import './dashboard.css';
import textContent from './data/text.js';


const { Sider, Content, Header, Footer } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }
    
    render() {
        const {selectedOID, selectedData, checked = true} = this.state;
        const onChange = (e) => {
            this.state.checked = e.target.checked;
            this.forceUpdate();
        };
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
                                    <Popover content={textContent.drillTooltip}>
                                        <Button 
                                            type="primary" 
                                            style={{ width: "100%" }}
                                            onClick={() => {
                                                if(this.state.selectedData.length > 0) {
                                                    this.state.data = selectedData;
                                                    this.forceUpdate();
                                                }
                                            }
                                        }
                                        >
                                            Drill Down
                                        </Button>
                                    </Popover>
                                </Content>
                            </Col>
                            <Col span={8} style={{ padding: "10px" }}>
                                <Content>
                                    <Popover content={textContent.resetTooltip}>
                                        <Button 
                                            type="primary" 
                                            style={{ width: "100%" }}
                                            onClick={() => {
                                                if(this.state.selectedNode != 0 || this.state.selectedPath != 0)
                                                    this.state.data = oData;
                                                    this.forceUpdate();
                                                }
                                            }
                                        >
                                            Reset
                                        </Button>
                                    </Popover>
                                </Content>
                            </Col>
                            <Col span={8} style={{ padding: "10px" }}>
                                <Content>
                                    <Popover content={textContent.mapCheckTooltip}>
                                        <Checkbox onChange={onChange} defaultChecked={true}>
                                            Map Coordinates?
                                        </Checkbox>
                                    </Popover>
                                </Content>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10} style={{ padding: "10px" }}>
                                <Content className='Sankey' >
                                    <Sankey data={this.state.data} oData={oData} width={750} height={650} 
                                        changeSelectedNode={this.changeSelectedNode}
                                        changeSelectedPath={this.changeSelectedPath}
                                        changeSelectedData={this.changeSelectedData}
                                    />
                                </Content>
                            </Col>
                            <Col span={10} push={3} style={{ padding: "10px" }}>
                                <Content className='Map'>
                                    <Map data = {checked ? this.state.data : []} />
                                </Content>
                                <Footer>
                                    {textContent.footerText}
                                </Footer>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>
            </div>
        )
    }
}