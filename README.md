# Simple-Country-API
 A simple API that manages data about countries / cities / population counts!
 
How to use :
 Setup :
1) To install all dependancies us this command in the terminal : npm i
2) To seed the database with the data use this command in the terminal : npm run seed
3) Wait until the message 'Seeding Finished' is promped
4) You can start now the app by typing 'npm start' in the terminal

*Pagination

-Add query parameter page={pageNumber}&size={pageSize} to endpoints that return a collection of elements

-If you exclude any of those from the query they will be set by default to page=1 size=10

*Endpoints :
 
-The {} means that you can put different values in there
 
1)api/countries

-Returns countries in the format 

[
    {
        "_id",
        "name"
    },
    {
        "_id",
        "name"
    },
]    



2)api/countries?sort={asc} or api/countries?sort={desc}

-Return countries in ascending or descending in the following format : 

[
    {
        "_id",
        "name"
    },
    {
        "_id",
        "name"
    },
    {
        "_id",
        "name"
    },
]



3)api/countries/{countryName}

-Return a specific country by name in the following format :

{
    "_id",
    "cities": [
        {
            "_id",
            "name"
        },
        {
            "_id",
            "name"
        },
        {
            "_id",
            "name"
        },
        {
            "_id",
            "name"
        },
        {
            "_id",
            "name"
        }
    ],
    "name",
    "__v"
}



4)api/cities/{countryName}?sortName={asc}&sortPop={desc}

-Return cities in a specific country sorted by name and population count's value




5)api/cities/{countryName}/{cityName}

-Return a specific city in a specific country
