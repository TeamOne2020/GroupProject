// Url Variables
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Section to declare variables that will be input into each API fetch request.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// foodID retrives the value of the "search food" input field, that users can type into, default value is Pizza.
foodID = document.getElementById("food").value;

// Sets initial page to zero.
pageID = 0;

// Sets the fullmenu bool to true, filtering out restaurant calls that don't have menu information.
fullBool = true;

// Sets the exact bool to true, retrieving only rsults with exact matches, no partial matches.
exactBool = true;

// Sets the API key globally across the whole js page. 
keyID = 'key=88201b3c2556e27e9ed81dd41df22e04';


// HTML Output
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Main display block, using nested for loops to cycle through all API menu data, 
// and orginize it based on it's menu hierarchy.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// Html display for loop retrieves information from (data) which is the API fetch output.
const generateHtml = (data) => 
{
    let output = "";
    console.log(data.data.length)
    for(let i=0;i<data.data.length;i++)
    {
        let next_item = data.data[i];
        const next_html = 
        `
            <div>Restaurant Name: ${next_item.restaurant_name}</div> <br />

            <button type="button" class="collapsible">Restaurant Info</button>
            <div class="content">
                
                <p>Restaurant Info</p>

                <div>Name: ${next_item.restaurant_name}</div>
                <div>Phone: ${next_item.restaurant_phone}</div>
                <div>Cuisines: ${next_item.cuisines}</div>
                <div>Address: ${next_item.address.formatted}</div>
                <div>Price Range: ${next_item.price_range}</div>
                <div>ID: ${next_item.restaurant_id}</div>
                <br />

            </div> 
            <br />

            <button type="button" class="collapsible">Menu Info</button>
            <div class="content">
                
                <p>Menu Items</p>

                <div>Food: ${next_item.menu_item_name}</div>
                <br />
                <div>Description: ${next_item.menu_item_description}</div>
                <br />

            </div>
            <br /><br />
        `
        output += next_html;

        const testDIV = document.querySelector('.search')
        testDIV.innerHTML = output

        // New Code Test
        var coll = document.getElementsByClassName("collapsible");
        var j;
        
        // for loop that gives the menu buttons ability to display menu content, by toggling between
        // making the displays visiblie or invisible, this allows us to pre-load all content for a page improving 
        // the speed items are displayed on screen. 
        for (j = 0; j < coll.length; j++) {
          coll[j].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
    }
}


// Core Functions
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Main functions used for user input fields, and page navigation. 
//-------------------------------------------------------------------------------------------------------------------------------------------//

// askFood function resets all regular variables, then takes in the value of foodID, a typed user input, and passes it to the API.
// This allows the user to manually search for restaurants by food and cuisine.
function askFood()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;
    foodID = document.getElementById("food").value;

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url converted to JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// nextPage function allows the users to move to the next page, with each page displaying 25 array elements.
function nextPage()
{
    // Variable Reset
    arrayNumber = 0;
    foodID = document.getElementById("food").value;

    // Increment Page
    pageID++;

    // Console Log for testing
    console.log('AE = '+ arrayNumber + ', Page = ' + pageID + ', Food = ' + foodID);

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url converted to JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))
}


// Secondary Functions
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Optional Functions that are used to call pre-set API calls based on user input.
// Each function is tied to a display button press.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// getBurger() Function, responds to a user clicking a pre-made burger button, 
// and calls a fetch request, with the burger item set as the foodID. 
function getBurger()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Burger';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// getTacos() Function, responds to a user clicking a pre-made tacos button, 
// and calls a fetch request, with the tacos item set as the foodID. 
function getTacos()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Tacos';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// getPizza() Function, responds to a user clicking a pre-made pizza button, 
// and calls a fetch request, with the pizza item set as the foodID. 
function getPizza()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Pizza';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// getTeriyaki() Function, responds to a user clicking a pre-made teriyaki button, 
// and calls a fetch request, with the teriyaki item set as the foodID. 
function getTeriyaki()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Teriyaki';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// getIceCream() Function, responds to a user clicking a pre-made ice cream button, 
// and calls a fetch request, with the ice cream item set as the foodID. 
function getIceCream()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Ice Cream';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// getLobster() Function, responds to a user clicking a pre-made lobster button, 
// and calls a fetch request, with the lobster item set as the foodID. 
function getLobster()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Lobster';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}

// getVegan() Function, responds to a user clicking a pre-made vegan button, 
// and calls a fetch request, with the vegan selection of items set as the foodID. 
function getVegan()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // foodID is pre-set
    foodID = 'Vegan';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'menuitems/search/geo?lat=47.565376791912655&lon=-122.03839433826671&distance=100&search=',
        input: foodID,
        page: 'page=' + pageID,
        fullmenu: 'fullmenu=' + fullBool,
        exactmenu: 'exact=' + exactBool,
        key: keyID
    }

    // Url JSON string
    let {url,field,input,page,fullmenu,exactmenu,key} = apiData
    let apiUrl = `${url}${field}${input}&${page}&${fullmenu}&${exactmenu}&${key}`
    console.log(apiUrl)

    // Url Fetch
    fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))

}