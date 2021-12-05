import React from "react";
import MenuItem from "./MenuItem";

import "../MenuStyling/MenuList.css";

const MenuList = ({ categories, selectedCategory, onItemSelect }) => {
  console.log("rendering MenuList");
  var items;
  if (selectedCategory !== "featured") {
    items = categories.items.filter(
      (category) => category.id === selectedCategory
    );
    items = items[0];
    items = items.items;
    items = items.items;
    items.filter((item) => (item.hidden = false));
  } else {
    var items1 = categories.items.filter(
      (category) => category.id === "featured"
    );
    var items2 = items1.map((item) => item.items);
    var items3 = items2.flat();
    var items4 = items3.filter((item) => item.hidden === false);
    items = items4;
  }

  const renderedList = items.map((item) => {
    return <MenuItem item={item} onItemSelect={onItemSelect} />;
  });

  return (
    <div className="menu-list">
      <div className="menu-list-wrapper">{renderedList}</div>
    </div>
  );
};

export default MenuList;
