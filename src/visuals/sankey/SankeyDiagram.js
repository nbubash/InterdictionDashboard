import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Group } from "@visx/group";
import { sankey as d3Sankey } from "d3-sankey";
import { HierarchyDefaultNode as DefaultNode } from "@visx/hierarchy";


SankeyDiagram.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func
};

export default function SankeyDiagram({
  top,
  left,
  className,
  data,
  enData,
  size,

  nodeId,
  nodeAlign,
  nodeWidth,
  nodePadding,
  nodePaddingRatio,
  extent,
  iterations,
  circularLinkGap,

  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const sankey = d3Sankey().nodeId(function id(d) {
    return d.uid;
  });
  if (size) sankey.size(size);
  if (nodeId) sankey.nodeId(nodeId);
  if (nodeAlign) sankey.nodeAlign(nodeAlign);
  if (nodeWidth) sankey.nodeWidth(nodeWidth);
  if (nodePadding) sankey.nodePadding(nodePadding);
  if (extent) sankey.extent(extent);
  if (iterations) sankey.iterations(iterations);

  const sankeyData = sankey(data);

  if (!!children) {
    return (
      <Group top={top} left={left} className={cx("vx-sankey", className)}>
        {children({ data: sankeyData })}
      </Group>
    );
  } 
}