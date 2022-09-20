import React, { Component } from 'react';
import { List } from 'antd';
import './STable.css';

export default class STable extends Component {

    selected = (sel) => {
        this.props.changeSelectedOID(sel);
    }
    selectedRows = (sel) => {
        this.props.changeSelectedData(sel);
    }

    
    render() {
        const {data} = this.props;
        return (
            <div id='STable' className='pane'>
                <div className='header'>Selected Case List</div>
                <List
                    size="small"
                    bordered
                    dataSource={data === [] ? [{OID_: "", Office: ""}]:data}
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