import React from "react";

const Dropdown = ({
  dropdown_item_1,
  dropdown_item_2,
  dropdown_item_3,
  dropdown_item_4,
  dropdown_item_5,
  dropdown_item_6,
  dropdown_item_7,
  dropdown_item_8,
  type,
}) => {
  return (
    <div className="dropdown border border-1 p-1" style={{ cursor: "pointer" }}>
      <span
        className="dropdown-toggle texte_brut"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {type}{dropdown_item_1}
      </span>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li className="dropdown-item">{dropdown_item_1}</li>
        <li className="dropdown-item">{dropdown_item_2}</li>
        <li className="dropdown-item">{dropdown_item_3}</li>
        <li className="dropdown-item">{dropdown_item_4}</li>
        <li className="dropdown-item">{dropdown_item_5}</li>
        <li className="dropdown-item">{dropdown_item_6}</li>
        <li className="dropdown-item">{dropdown_item_7}</li>
        <li className="dropdown-item">{dropdown_item_8}</li>
      </ul>
    </div>
  );
};

export default Dropdown;
