import React, { Component } from 'react';
import { Table } from 'antd';
import './DataTable.css';

export default class DataTable extends Component {

    render() {
        const dataSource = [
            {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
            },
            {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
            },
            ];
            const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            ];

        const {data} = this.props;
        return (
            <div id='DataTable' className='pane'>
                <div className='header'>Data Table</div>
                    <Table dataSource={dataSource} columns={columns} scroll={{ y: 240 }} pagination={false} style={{ height: 250 }} size="small" />
            </div>
        )
    }
}