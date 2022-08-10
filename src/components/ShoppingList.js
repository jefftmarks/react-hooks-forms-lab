import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [filterData, setFilterData] = useState({
    filter: "All",
    search: "",
  });

  function handleFilterChange(event) {
    const value = event.target.value
    const name = event.target.name
    setFilterData({
      ...filterData,
      [name]: value,
    })
  }

  const itemsToDisplay = items
  .filter(item => {
    if (filterData.filter === "All") return true;

    return item.category === filterData.filter;
  })
  .filter(item => {
    return item.name.toLowerCase().includes(filterData.search.toLowerCase());
  })


  return (
    <div className="ShoppingList">
      <ItemForm
        onItemFormSubmit={onItemFormSubmit}
      />
      <Filter
        onCategoryChange={handleFilterChange}
        onSearchChange={handleFilterChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
