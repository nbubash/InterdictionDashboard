import React, { Component } from 'react';
import { Table } from 'antd';
import './DataTable.css';

export default class DataTable extends Component {

    render() {
        const dataSource1 = () => {
            var arr = [];
            for (let i of this.props.data) {
                var obj = 
                {
                    key: i.OID_,
                    var1: i.Cutter1,
                    var2: i.DATEDETAIN,
                    var3: i.Office
                };
                arr.push(obj);
            }
            return arr;
        }
        const columns = [
        {
            title: 'Cutter1',
            dataIndex: 'var1',
            key: 'var1',
            sortDirections: ['ascend', 'descend', 'ascend'],
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.var1.localeCompare(b.var1)

        },
        {
            title: 'DATEDETAIN',
            dataIndex: 'var2',
            key: 'var2',
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.var2.localeCompare(b.var2)
        },
        {
            title: 'Office',
            dataIndex: 'var3',
            key: 'var3',
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.var3.localeCompare(b.var3)
        },
        ];

        const {data} = this.props;
        return (
            <div id='DataTable' className='pane'>
                <div className='header'>Data Table</div>
                    <Table dataSource={dataSource1()} columns={columns} scroll={{ y: 700 }} bordered pagination={false} style={{ height: 720 }} size="small" />
            </div>
        )
    }
}