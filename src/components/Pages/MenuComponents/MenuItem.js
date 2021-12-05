import React from "react";
import "../MenuStyling/MenuItem.css";

const MenuItem = (item) => {
  console.log("rendering MenuItem");
  console.log("from menuItem: item.item is ", item.item);
  console.log("onItemSelect", item.onItemSelect);
  return (
    <div
      className="menu-item-container"
      onClick={() => item.onItemSelect(item.item)}
    >
      <div className="menu-item-wrapper">
        <div className="menu-item-image-container">
          <div className="menu-item-image-wrapper">
            <img
              className="menu-item-image"
              src={item.item.image}
              alt={item.item.name}
            />
          </div>
        </div>
        {/* <div className="menu-item-image-container">
          <img
            className="menu-item-image"
            src={item.item.image}
            alt={item.item.name}
          />
        </div> */}
        <div className="menu-item-content-container">
          <div className="menu-item-content-wrapper">
            <div className="menu-item-content-details-wrapper">
              <div className="menu-item-content-specials">
                <p>vegan</p>
              </div>
              <div className="menu-item-content-price-wrapper">
                <p className="menu-item-content-price">
                  {"$" + item.item.price}
                </p>
              </div>
            </div>
            <div className="menu-item-content-name-wrapper">
              <p className="menu-item-content-name">{item.item.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
