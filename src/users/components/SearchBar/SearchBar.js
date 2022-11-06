import React from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";


export default function SearchBar() {

 
  return (
    <div className="searchBar_box">
      <input
        type="text"
        placeholder="ค้นหา..."
      />
      <span>
        <FiSearch />
      </span>
    </div>
  );
}
