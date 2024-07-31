import {AsyncPaginate} from "react-select-async-paginate";
import {useState} from "react";
import { GEO_API_URL, geoApiOptionsAPI } from "../../api";

import '../../App.css';

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);
    const [cities, setCities] = useState([]);

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptionsAPI
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}` ,
                        }
                    })
                }
            })
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate className="paginate"
            placeholder="Search for the city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;