import React, {useState} from "react";

import reactStringReplace from "react-string-replace";

import "./Search.scss";

export default function Search({setSearch, search, products, searchFilter}) {
    const [autocomplete, setAutocomplete] = useState(false);

    function handleOnChange(e) {
        setSearch(e.target.value);

        e.target.value === "" ? setAutocomplete(false) : setAutocomplete(true);
    }

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search Pixel Market"
                className="search__input"
                value={search}
                onChange={handleOnChange}
                data-cy="searchInput"
            />

            {autocomplete && (
                <ul
                    className="search__autocomplete autocomplete"
                    data-cy="autocomplete"
                >
                    {products.filter(searchFilter).map(({name, id}) => (
                        <li
                            key={id}
                            onClick={() => {
                                setSearch(name);
                                setAutocomplete(false);
                            }}
                            className="autocomplete__item"
                            data-cy="autocomplete-item"
                        >
                            {reactStringReplace(name, search, (match, i) => (
                                <span key={i} className="autocomplete__highlight">
                  {match}
                </span>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
