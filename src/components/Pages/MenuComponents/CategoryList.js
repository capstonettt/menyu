import React from "react";
import CategoryItem from "./CategoryItem";

import "../MenuStyling/CategoryList.css";

const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
  console.log("rendering Category List");

  const renderedList = categories.items.map((category) => {
    return (
      <CategoryItem
        onCategorySelect={onCategorySelect}
        categoryId={category.id}
        categoryName={category.name}
        selectedCategory={selectedCategory}
      />
    );
  });
  return (
    <div className="category-list-wrapper">
      <div className="category-list">{renderedList}</div>
    </div>
  );
};

export default CategoryList;
