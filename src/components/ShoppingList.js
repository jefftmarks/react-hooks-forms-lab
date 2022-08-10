import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [filterData, setFilterData] = useState({
    filter: "All",
    search: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "Produce",
  });

  const [addItems, setAddItems] = useState(items);


  function handleFilterChange(event) {
    const value = event.target.value
    const name = event.target.name
    setFilterData({
      ...filterData,
      [name]: value,
    })
  }

  function handleFormChange(event) {
    const value = event.target.value
    const name = event.target.name
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      ...formData,
      id: uuid(),
    }
    const newItemArray = [...addItems, newItem]
    setAddItems(newItemArray)
    event.target.reset();
  }


  const itemsToDisplay = addItems
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
        onNameChange={handleFormChange}
        onCategoryChange={handleFormChange}
        onItemFormSubmit={handleSubmit}
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
