import React, { useState, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Planner, Card, Todo } from "./grid_items/index.js";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { DndContext } from "@dnd-kit/core";

const ResponsiveGridLayout = WidthProvider(Responsive);

const convertLayout = async (cardType, plannerItems) => {
  let Card;
  switch (cardType) {
    case "planner":
      Card = <Planner plannerItems={plannerItems} />;
      break;
    case "todo":
      Card = <Todo />;
      break;
    default:
      Card = <Card />;
      break;
  }
  return Card;
};

const Layout = ({ spread, currentSpread, allSpreads }) => {
  const [gridItems, setGridItems] = useState({});
  const [plannerItems, setPlannerItems] = useState({});

  const [items, setItems] = React.useState([
    {
      i: "0",
      x: 0,
      y: 0,
      w: 2,
      h: 5,
      minW: 1,
      maxW: 5,
      minH: 2,
      maxH: 6,
      card: (
        <Planner
          plannerItems={spread.plannerItems}
          allSpreads={allSpreads}
          currentSpread={currentSpread}
        />
      ),
    },
    {
      i: "1",
      x: 2,
      y: 0,
      w: 1,
      h: 2,
      minH: 2,
      maxH: 2,
      card: <Card cardItems={spread.gridItems[0]} />,
    },
    {
      i: "2",
      x: 3,
      y: 0,
      w: 1,
      h: 2,
      minH: 2,
      maxH: 2,
      card: <Card cardItems={spread.gridItems[1]} />,
    },
  ]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: items }}
      breakpoints={{ lg: 640, md: 600, sm: 540, xs: 480, xxs: 0 }}
      cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={189}
      width={1000}
      margin={[10, 10]}
      resizeHandles={["se"]}
      draggableHandle={".dragHandle"}
      // onLayoutChange={saveLayout()}
    >
      {items.map((item) => {
        return (
          <div
            //border-4 border-base-300
            className=""
            key={item.i}
            data-grid={{ x: item.x, y: item.y }}
          >
            {item.card}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

const GridLayout = ({ spread, allSpreads, currentSpread, userCollections }) => {
  return (
    <Layout
      spread={spread}
      allSpreads={allSpreads}
      currentSpread={currentSpread}
    />
  );
};

const DndKitLayout = ({
  spread,
  allSpreads,
  currentSpread,
  userCollections,
}) => {
  console.log(userCollections);
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="p-2 lg:w-1/2">
        <Planner
          weeklyCollections={spread.weeklyCollections}
          allSpreads={allSpreads}
          currentSpread={currentSpread}
          userCollections={userCollections}
        />
      </div>
      <div className="lg:w-2/3">
        <DndContext>
          {userCollections.map((collection) => {
            return (
              <Card
                cardItems={collection}
                key={collection._id}
                userCollections={userCollections}
                spreadCollections={spread.weeklyCollections}
              ></Card>
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default DndKitLayout;
