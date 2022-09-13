import React, { Component } from 'react';
import { List } from 'antd';
import './STable.css';

export default class STable extends Component {

    selected = (sel) => {
        this.props.changeSelectedOID(sel);
    }

    parse = (selected,data) => {
        let rows = [];
        //console.log('data',selected);
        if(selected.uid.endsWith('x')){
            for(let i of selected.sourceLinks){
                for(let j of i.contains){
                    rows.push(data.find((e) => e["OID_"] === j));
                }
            }
        }
        else{
            for(let i of selected.targetLinks){
                for(let j of i.contains){
                    rows.push(data.find((e) => e["OID_"] === j));
                }
            }
        }
        
        //console.log('rows',rows);
        return rows;
    }
    render() {
        const {data, selected, rawData} = this.props;
        return (
            <div id='STable' className='pane'>
                <div className='header'>Case List</div>
                <List
                    size="small"
                    bordered
                    dataSource={selected === 0 ? [{OID_: "", Office: ""}]:this.parse(selected, rawData)}
                    renderItem={sel => <List.Item onClick = {() => this.selected(sel)}>
                        <div>
                            {sel["OID_"] + ':' + sel["Office"]}
                        </div>
                    </List.Item>}
                />
            </div>
        )
    }
}