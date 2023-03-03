import { useEffect, useState } from "react";
import { handleDataFromAPI } from "../../helpers/api";
import "./ProductFilters.scss";

function ProductFilters({ dispatch }) {
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState(0);

  useEffect(() => {
    handleDataFromAPI({ endpoint: "v1/categories" }).then((response) =>
      setCategories(response)
    );
  }, []);

  function handleCategory(event) {
    setUserCategory(event.target.value);
    dispatch({ type: "category", payload: parseInt(event.target.value) });
  }

  return (
    <aside className="filter">
      <label htmlFor="category" className="filter__lbl">
        Category:{" "}
      </label>
      <select
        data-cy="categoryFilter"
        className="filter__select"
        name="category"
        id="category"
        value={userCategory}
        onChange={handleCategory}
      >
        <option value={0}>---</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </aside>
  );
}

export default ProductFilters;
