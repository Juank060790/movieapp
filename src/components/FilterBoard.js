import React from 'react';
import InputRange from 'react-input-range';
import Dropdown from 'react-bootstrap/Dropdown'


export default function FilterBoard({
     sortByPopular,
     sortByRate,
     filterByYear,
     filterByRate,
     year,
     rating,})

{
    return (
        <div>
            <InputRange
                maxValue={2020}
                minValue={1980}
                value={year}
                onChange={(value) => filterByYear(value)} />


            <Dropdown style={{ margin: "40px" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
           
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => sortByPopular("desc")}
                        href="#/action-1">Popularity (high - low)
                </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => sortByPopular("asc")}
                        href="#/action-2">Popularity (low - high)
                </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => sortByRate("desc")}
                        href="#/action-3">Rated (high - low)
                </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => sortByRate("asc")}
                        href="#/action-3">Rated (high - low)
                </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown.Toggle>
            </Dropdown>
        </div>
    )
}
