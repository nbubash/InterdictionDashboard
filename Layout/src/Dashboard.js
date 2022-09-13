import React, { Component } from 'react';
import data from './data';
import { Layout } from 'antd';
import Map from './visuals/map/Map';
import Sankey from './visuals/sankey/Sankey';
import STable from './visuals/sankey/STable';
import sData from './data/EDD_DATA_FY17.json';
import './dashboard.css';


const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOID: "",
            selectedNode: 0,
            selectedPath: 0
        }
    }

    changeSelectedOID = value => {  
        this.setState({
            selectedOID: value
        })
        console.log("state", this.state);
        //console.log("selectedOID", this.state.selectedOID);
    }

    changeSelectedNode = value => {
        this.setState({
            selectedNode: value
        })
    }
    changeSelectedPath = value => {
        this.setState({
            selectedPath: value
        })
    }

    render() {
        const {selectedCase, selectedNode} = this.state;
        const filteredData = {};
        const selectedData = [1,2];
        return (
            <div>
                <Layout style={{ height: 920 }}>
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 250 }}>
                        <Content>
                                <STable 
                                selected={selectedNode} 
                                data={filteredData} 
                                rawData = {sData} 
                                changeSelectedOID={this.changeSelectedOID} 
                            />
                            </Content>
                        </Content>
                    </Sider>
                    <Layout>
                        <Layout style={{ height: 800 }}>
                            <Content>
                                <Sankey data={sData} width={900} height={800} 
                                    changeSelectedNode={this.changeSelectedNode}
                                    changeSelectedPath={this.changeSelectedPath}
                                    />
                            </Content>
                            
                        </Layout>
                        <Sider width={600}  style={{backgroundColor:'#eee'}}>
                            <Content>
                                <Map />
                            </Content>
                        </Sider>
                    </Layout>
                </Layout>
            </div>
        )
    }
}