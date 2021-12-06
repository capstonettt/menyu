import React from "react";
import "../MenuStyling/MenuDetail.css";
import closeIcon from "../MenuAssets/close.svg";
import vgIcon from "../MenuAssets/menu-item-vegan-icon.svg";
import vIcon from "../MenuAssets/menu-item-vegetarian-icon.svg";
import hIcon from "../MenuAssets/menu-item-halal-icon.svg";

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
                <div className="content-header">
                  <div className="content-name-icon">
                    <p className="menu-detail-name">{item.name}</p>
                    <div className="menu-detail-icons">
                      <img
                        className="menu-detail-icon"
                        src={item.vege ? vIcon : null}
                        alt={item.vege ? "V" : null}
                      />
                      <img
                        className="menu-detail-icon"
                        src={item.vegan ? vgIcon : null}
                        alt={item.vegan ? "VG" : null}
                      />
                      <img
                        className="menu-detail-icon halal"
                        src={item.halal ? hIcon : null}
                        alt={item.halal ? "H" : null}
                      />
                    </div>
                  </div>
                  <div className="price-wrapper">
                    <p className="menu-detail-price">{"$" + item.price}</p>
                  </div>
                </div>
                <div className="description-wrapper">
                  <p className="menu-detail-description">
                    {item.description}
                  </p>
                </div>
                <div className="ingredients-wrapper">
                  <p className="menu-detail-ingredients">
                    <span style={{ fontWeight: "bold" }}>
                      Ingredients:
                      <br />
                    </span>
                    {item.ingredients}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MenuDetail;
