import React from "react";

// import stylesheet
import "../MenuStyling/CategoryItemStyle.css";

const CategoryItem = ({
  categoryId,
  categoryName,
  selectedCategory,
  onCategorySelect,
}) => {
  console.log("rendering CategoryItem");

  var tempName;
  var tempId;
  var isSelected = false;

  if (categoryName !== "Featured") {
    tempName = categoryName;
    tempId = categoryId;
  } else {
    tempName = "Featured";
    tempId = "featured";
  }

  if (categoryId === selectedCategory) {
    isSelected = true;
  } else {
    isSelected = false;
  }

  const category = tempName;
  const id = tempId;

  return (
    <button
      className="category-item"
      style={{
        background: isSelected ? "#752a07" : "#ffefd4",
        color: isSelected ? "#ffefd4" : "#752a07",
      }}
      onClick={() => onCategorySelect(id)}
    >
      {category}
    </button>
  );
};

export default CategoryItem;
