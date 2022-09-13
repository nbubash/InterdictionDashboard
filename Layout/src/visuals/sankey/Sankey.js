import React, {Component} from "react";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { scaleSequential } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic"
import { extent } from "d3-array";
import { sankeyLinkHorizontal } from "d3-sankey";
import SankeyDiagram from "./SankeyDiagram";

const path = sankeyLinkHorizontal();

const color = scaleSequential(interpolateCool);

function dataHeaders(keys){
  let headers = [];
  keys = [...new Set(keys)];
  for(let i of keys){
    headers.push({label: i, value: i});
  }
  return headers;
}

function makeData(data, c){

  const c1 = c[0];
  const c2 = c[1];
  const c3 = c[2];

  let con = [];
  let col = [];
  for(let s of data){
    col.push({name: s[c1], uid: s[c1]+"x"});
    col.push({name: s[c2], uid: s[c2]+"y"});
    col.push({name: s[c3], uid: s[c3]+"z"});

    con.push([s[c1]+"x", s[c2]+"y", s["OID_"]]);
    con.push([s[c2]+"y", s[c3]+"z", s["OID_"]]);
  }

  const uids = col.map(o => o.uid);
  const nodes = col.filter(({uid}, index) => !uids.includes(uid, index + 1));

  con.sort();

  let links = [{source: con[0][0], target: con[0][1], value: 1, contains: []}], arr = [];
  for(let i = 1; i < con.length; ++i){
    if(con[i][0].localeCompare(links[links.length-1].source) === 0 && con[i][1].localeCompare(links[links.length-1].target) === 0){
      ++links[links.length-1].value;
    }
    else{
      arr = [];
      links.push({source: con[i][0], target: con[i][1], value: 1, contains: [con[i][2]]});
    }
    arr.push(con[i][2])
    links[links.length-1].contains = arr;
  }

  return {nodes: nodes, links:links};
}

const VDrop = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

const Table = (state) => {
  //<Table state = {this.state}/>  
  if(state.state.linkValue !== 0 & state.state.selected !== 0){
      let c1, c2;
      if(state.state.linkValue.source.uid.endsWith('x')){
        c1 = state.state.v1;
        c2 = state.state.v2;
      } else{
        c1 = state.state.v2;
        c2 = state.state.v3;
      }
      return(
      <div className = 'stats'>
        <h2>Link Table</h2>
        <table>
          <thead>
            <tr>
              <th>{c1}</th>
              <th>{c2}</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.state.linkValue.source.name}</td>
              <td>{state.state.linkValue.target.name}</td>
              <td>{state.state.linkValue.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
  else if(state.state.nodeValue !== 0 & state.state.selected !== 0){
    if(state.state.nodeValue.uid.endsWith('x')){
      return(
        <div className = 'stats'>
          <h2>Node Table ({state.state.nodeValue.name})</h2>
          <table>
            <thead>
              <tr>
                <th>{"Targets: " + state.state.v2}</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {state.state.nodeValue.sourceLinks.map((v, k) => {
                return(
                  <tr>
                    <td>{v.target.name}</td>
                    <td>{v.value}</td>
                  </tr>
                )
              })}             
            </tbody>
          </table>
        </div>
        )
    } else if(state.state.nodeValue.uid.endsWith('y')){
      return(
        <div className = 'stats'>
          <h2>Node Table ({state.state.nodeValue.name})</h2>
          <table>
            <thead>
              <tr>
                <th>{"Sources: " + state.state.v1}</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {state.state.nodeValue.targetLinks.map((v, k) => {
                return(
                  <tr>
                    <td>{v.source.name}</td>
                    <td>{v.value}</td>
                  </tr>
                )
              })}             
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>{"Targets: " + state.state.v3}</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {state.state.nodeValue.sourceLinks.map((v, k) => {
                return(
                  <tr>
                    <td>{v.target.name}</td>
                    <td>{v.value}</td>
                  </tr>
                )
              })}             
            </tbody>
          </table>
        </div>
        )
    } else{
        return(
          <div className = 'stats'>
            <h2>Node Table ({state.state.nodeValue.name})</h2>
            <table>
              <thead>
                <tr>
                  <th>{"Sources: " + state.state.v2}</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {state.state.nodeValue.targetLinks.map((v, k) => {
                  return(
                    <tr>
                      <td>{v.source.name}</td>
                      <td>{v.value}</td>
                    </tr>
                  )
                })}             
              </tbody>
            </table>
          </div>
          )
      } 
  }
};

export default class Sankey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            highlightLinkIndexes: [],
            nodePadding: 9,
            linkValue: 0,
            nodeValue: 0,
            selected: 0, //0: nothing selected, 1: link selected, 2: node selected
            v1: "Cutter1",
            v2: "COURTOFARR",
            v3: "Office"
        };
    }

    onChangeNode = node => {
      this.props.changeSelectedNode(node);
    };
    onChangePath = path => {
      this.props.changeSelectedPath(path);
    };

  render() {
    const {
      data,
      width,
      height,
      margin = {
        top: 0,
        left: 0,
        right: 200,
        bottom: 0
      }
    } = this.props;

    const options = dataHeaders(Object.keys(data[0]));

    return (
      <div
        onClick={() => {
          if(this.state.selected !==0){
            this.setState({highlightLinkIndexes: []});
            this.setState({linkValue: 0});
            this.setState({nodeValue: 0});
            this.setState({selected: 0});
          }
        }}>
        <div>
          <VDrop
          label="Column 1: "
          options={options}
          value={this.state.v1}
          onChange={(e) => this.setState({ v1: e.target.value })}
          />
          <VDrop
          label=" | Column 2: "
          options={options}
          value={this.state.v2}
          onChange={(e) => this.setState({ v2: e.target.value })}
          />
          <VDrop
          label=" | Column 3: "
          options={options}
          value={this.state.v3}
          onChange={(e) => this.setState({ v3: e.target.value })}
          />   
        </div>
        
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <SankeyDiagram
            top={margin.top}
            left={margin.left}
            data={makeData(data, [this.state.v1,this.state.v2,this.state.v3])}
            size={[width, height]}
            nodeWidth={15}
            nodePadding={this.state.nodePadding}
            extent={[
              [1, 1],
              [width - 1, height - 6]
            ]}
          >
            {({ data }) => (
              <Group>
                {
                  color.domain(extent(data.nodes, (d) => d.depth))
                }

                {data.nodes.map((node, i) => (
                  <Group top={node.y0} left={node.x0} key={`node-${i}`}>
                    <rect
                      id={`rect-${i}`}
                      width={node.x1 - node.x0}
                      height={node.y1 - node.y0}
                      fill={color(node.depth)}
                      opacity={0.5}
                      stroke="white"
                      strokeWidth={2}
                      onMouseOver={() => {
                        if(this.state.selected === 0){
                          this.setState({nodeValue: node});
                          this.setState({
                            highlightLinkIndexes: [
                              ...node.sourceLinks.map((l) => l.index),
                              ...node.targetLinks.map((l) => l.index)
                            ]
                          });
                        }
                      }}
                      onMouseOut={() => {
                        if(this.state.selected === 0){
                          this.setState({ highlightLinkIndexes: [] });
                          this.setState({nodeValue: 0});
                        }
                      }}
                      onClick = {() => {
                        this.setState({
                          highlightLinkIndexes: [
                            ...node.sourceLinks.map((l) => l.index),
                            ...node.targetLinks.map((l) => l.index)
                          ]
                        });
                        this.setState({nodeValue: node});
                        this.setState({selected: 2});
                        this.props.changeSelectedNode(node)
                      }}
                    />
            
                    <Text
                      x={18}
                      y={(node.y1 - node.y0) / 2}
                      verticalAnchor="middle"
                      style={{
                        font: "10px sans-serif"
                      }}
                    >
                      {node.name}
                    </Text>
                  </Group>
                ))}
                {
                  color.domain(extent(data.nodes, (d) => d.depth))
                }
                <Group>
                  {data.links.map((link, i) => (
                    
                    <path
                      key={`link-${i}`}
                      d={path(link)}
                      stroke={
                        this.state.highlightLinkIndexes.includes(i)
                          ? "red"
                          : "black"
                      }
                      strokeWidth={Math.max(1, link.width)}
                      opacity={
                        this.state.highlightLinkIndexes.includes(i) ? 0.5 : 0.15
                      }
                      fill="none"
                      onMouseOver={() => {
                        if(this.state.selected === 0){
                          this.setState({ highlightLinkIndexes: [i] });
                          this.setState({ linkValue: link});
                        }
                      }}
                      onMouseOut={() => {
                        if(this.state.selected === 0){
                          this.setState({ highlightLinkIndexes: [] });
                          this.setState({ linkValue: 0});
                        }
                      }}
                      onClick = {() => {
                        this.setState({ highlightLinkIndexes: [i] });
                        this.setState({ linkValue: link});
                        this.setState({ selected: 1});
                        this.props.changeSelectedPath(path);
                      }}
                    />
                  ))}
                </Group>
              </Group>
            )}
          </SankeyDiagram>
        </svg>
      </div>
    );
  }
}
