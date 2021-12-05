import React from "react";
import "../MenuStyling/MenuDetail.css";
import closeIcon from "../MenuAssets/close.svg";

const MenuDetail = ({ item, show, handleClose }) => {
  if (!item) {
    return true;
  }

  return show ? (
    <div>
      <div className="backdrop" onClick={() => handleClose()} />
      <div className="menu-detail-container-wrapper">
        <div className="menu-detail-container">
          <div className="menu-detail-wrapper">
            <div className="menu-detail-close-btn">
              <img
                src={closeIcon}
                alt={"close"}
                onClick={() => handleClose()}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="menu-detail-content-container">
              <div className="image-wrapper">
                <img src={item.image} alt={item.name} />
              </div>
              {/* <div className="menu-detail-content-header-wrapper">
                <p>{item.vege ? "vegetarian" : null}</p>
                <p>{item.vegan ? "vegan" : null}</p>
                <p>{item.halal ? "halal" : null}</p>
                <p>{item.name}</p>
                <p>{"$" + item.price}</p>
              </div> */}
              <div className="menu-detail-content-wrapper">
                <p>{item.vege ? "vegetarian" : null}</p>
                <p>{item.vegan ? "vegan" : null}</p>
                <p>{item.halal ? "halal" : null}</p>
                <p>{item.name}</p>
                <p>{"$" + item.price}</p>
                <p>Description:</p>
                <p>{item.description}</p>
                <p>
                  Ingredients:Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nam elementum turpis fringilla, mattis mi ac,
                  ullamcorper felis. Vivamus vitae orci malesuada, pulvinar odio
                  quis, tincidunt lacus.
                </p>
                <p>{item.ingredients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MenuDetail;
