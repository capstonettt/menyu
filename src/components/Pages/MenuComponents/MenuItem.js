import React from "react";
import "../MenuStyling/MenuItem.css";
import vgIcon from "../MenuAssets/menu-item-vegan-icon.svg";
import vIcon from "../MenuAssets/menu-item-vegetarian-icon.svg";
import hIcon from "../MenuAssets/menu-item-halal-icon.svg";

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
                <div className="menu-item-icons">
                  <img
                    className="menu-item-icon"
                    src={item.item.vege ? vIcon : null}
                    alt={item.item.vege ? "V" : null}
                  />
                  <img
                    className="menu-item-icon"
                    src={item.item.vegan ? vgIcon : null}
                    alt={item.item.vegan ? "VG" : null}
                  />
                  <img
                    className="menu-item-icon halal"
                    src={item.item.halal ? hIcon : null}
                    alt={item.item.halal ? "H" : null}
                  />
                </div>
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
