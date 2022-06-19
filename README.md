# Simple Country-API

A simple country API that manages data about countries, cities and their population counts!

## Installation

Use npm to install dependancies.

```bash
npm i
```

## Enpoints
1) Get all countries
```bash
api/countries
```
-Returns in the following format  :
```json
[
    {
        "_id": "62af0085fe6ff5df6cadb982",
        "name": "Åland Islands"
    },
    {
        "_id": "62af0085fe6ff5df6cadb98b",
        "name": "Albania"
    },
]
```
-Possible queries:

page={pageNumber} size={pageSize}

sort={asc/desc} - Sorts by country name in either ascending or deschending

2) Get one country by name
```bash
api/countries/{countryName}
```
-Returns in the following format  :
```json
{
    "_id": "62af04e266de9d1a27af78e5",
    "cities": [
        {
            "_id": "62af04e266de9d1a27af78dc",
            "name": "Bulawayo"
        },
        {
            "_id": "62af04e266de9d1a27af78e9",
            "name": "Chitungwiza"
        },
        [...]
    ],
    "name": "Zimbabwe",
    "__v": 4
}
```
-Possible queries:

*No queries

3) Get all cities in a specific country by country name
```bash
api/cities/{countryName}
```
-Returns in the following format  :
```json
[
    {
        "_id": "62af04e266de9d1a27af78dc",
        "populationCounts": [
            {
                "_id": "62af04e266de9d1a27af78e1",
                "year": 1992,
                "value": 621742,
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete",
                "__v": 0
            },
            [...]
        ],
        "name": "Bulawayo",
        "__v": 0,
        "countryId": "62af04e266de9d1a27af78e5",
        "countryName": "Zimbabwe"
    },
    {
        "_id": "62af04e266de9d1a27af78e9",
        "populationCounts": [
            {
                "_id": "62af04e266de9d1a27af78ec",
                "year": 1992,
                "value": 274912,
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete",
                "__v": 0
            },
            [...]
        ],
        "name": "Chitungwiza",
        "__v": 0,
        "countryId": "62af04e266de9d1a27af78e5",
        "countryName": "Zimbabwe"
    },
]
```
-Possible queries:

page={pageNumber} size={pageSize}

sortName={asc/desc} - Sorts by city name in either ascending or descending

sortPop={asc/desc} - Sorts by population value in either ascending or descending

4) Get specific city in a specific country by name
```bash
api/cities/{countryName}/{cityName}
```
-Returns in the following format  :
```json
[
    {
        "_id": "62af0085fe6ff5df6cadb982",
        "name": "Åland Islands"
    },
    {
        "_id": "62af0085fe6ff5df6cadb98b",
        "name": "Albania"
    },
]
```
-Possible queries:

*None
