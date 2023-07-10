import { useRef, useEffect, useState } from "react";
import {
  DragBehavior,
  drag,
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
} from "d3";
import { useDispatch, useSelector } from "react-redux";

import { Person, deletePerson, selectPerson } from "@/store/personSlice";
import getNodesAndLinks, {
  NODE_TYPE,
  SIZE_INCREASE_BY_HOVER,
  STRENGTH,
} from "./imports/data";
import "./ChartView.css";
import ContextMenu from "./components/contextMenu/ContextMenu";

type ContextMenu = {
  show: boolean;
  x: number;
  y: number;
};

const initalContextMenu: ContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

type Node = {
  id: string,
  personID: number
}

export default function ChartView() {
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const people: Person[] = useSelector(selectPerson);
  const [node, setNode] = useState<Node>({id: "", personID: 0})

  const [contextMenu, setContextMenu] =
    useState<ContextMenu>(initalContextMenu);

  const closeContextMenu = () => {
    console.log("clicked");
    setContextMenu(initalContextMenu);
  };

  const deleteNode = () => {
    select(svgRef.current).selectAll(`.${node.id}`).remove();
    select(svgRef.current)
      .selectAll("line")
      .filter((line: any) => line.source.id == node.id)
      .remove();
    dispatch(deletePerson({ id: node.personID }));
  };

  useEffect(() => {
    const svg = select(svgRef.current);

    const width: number = +svg.attr("width");
    const height: number = +svg.attr("height");

    var [nodes, links] = getNodesAndLinks(people);

    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(STRENGTH))
      .force(
        "link",
        forceLink(links).distance((link: any) => link.distance)
      )
      .force("center", forceCenter(width / 2, height / 2));

    const dragInteraction: DragBehavior<Element, unknown, unknown> = drag().on(
      "drag",
      (event, node: any) => {
        node.x = event.x;
        node.y = event.y;
        simulation.alpha(1);
        simulation.restart();
      }
    );

    const lines = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("id", (node: any) => node.id)
      .attr("stroke", () => "black");

    const circles = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (node: any) => node.size || 30)
      .attr("fill", (node: any) => node.color || "blue")
      .attr("class", (node: any) => node.id)
      .on("mouseover", function () {
        select(this)
          .transition()
          .duration(100)
          .attr("r", (node: any) => node.size + SIZE_INCREASE_BY_HOVER);
      })
      .on("mouseout", function () {
        select(this)
          .transition()
          .duration(200)
          .attr("r", (node: any) => node.size);
      })
      .on("contextmenu", function (e, node: any) {
        e.preventDefault();
        if (node.type == NODE_TYPE.country) return;

        setContextMenu({ show: true, x: e.pageX, y: e.pageY });
        setNode({id: node.id, personID: node.personID})
      })
      .call(dragInteraction);

    const texts = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("class", (node: any) => node.id)
      .style("pointer-events", "none")
      .text((node: any) => node.id);

    simulation.on("tick", () => {
      circles
        .attr("cx", function (node: any) {
          return (node.x = Math.max(
            node.size * 2,
            Math.min(width - 30, node.x)
          ));
        })
        .attr("cy", function (node: any) {
          return (node.y = Math.max(
            node.size * 2,
            Math.min(height - 30, node.y)
          ));
        });
      // circles
      //   .attr("cx", (node: any) => node.x)
      //   .attr("cy", (node: any) => node.y);
      lines
        .attr("x1", (link: any) => link.source.x)
        .attr("y1", (link: any) => link.source.y)
        .attr("x2", (link: any) => link.target.x)
        .attr("y2", (link: any) => link.target.y);
      texts.attr("x", (node: any) => node.x).attr("y", (node: any) => node.y);
    });
  }, []);

  return (
    <>
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={closeContextMenu}
          deleteNode={deleteNode}
        />
      )}
      <div className="container mx-auto">
        <div className="m-10 flex items-center justify-around" onContextMenu={(e) => e.preventDefault()} id="svg">
          <svg ref={svgRef} width={800} height={500}></svg>
        </div>
        <div className="options p-3">
          <ul>
            <li>testign</li>
            <li>haha</li>
          </ul>
        </div>
      </div>
    </>
  );
}
