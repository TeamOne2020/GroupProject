// Url Variables
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Section to declare variables that will be input into each API fetch request.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// nameID retrives the value of the "search by restaurant name" input field, that users can type into, default value is McDonalds.
nameID = document.getElementById("name").value;

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
    // Original Html output is empty
    // We will compound buttons and html as the for loop progresses. 
    let output = "";

    // Collect the total amount of resataurant elements and repeat for each result
    for(let i=0;i<data.data.length;i++)
    {
        // This portion allows us to create the first two buttons that contain
        // the restaurant info and menu for each restaurant
        let next_item = data.data[i];
        let next_html = 
        `
            ${next_item.restaurant_name} <br />
            ${next_item.address.formatted} <br />

            <button type="button" class="collapsible">Restaurant Info</button>

                <div class="content">

                    <br />
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
                <br />
        `;

        // Collect the total amount of menus in one restaurant and repeat for each result
        for(let j=0;j<next_item.menus.length;j++) {
            let next_menu = next_item.menus[j];

            next_html += `

            <button type="button" class="collapsible">${next_menu.menu_name}</button>
                <div class="content">
                <br />
            `;
            
            // Collect the total amount of menu sections for one menu and repeat for each result
            for(let k=0;k<next_menu.menu_sections.length;k++) {
                let next_section = next_menu.menu_sections[k];

                console.log(next_section);
                console.log("-----");

                next_html += `

                <button type="button" class="collapsible">${next_section.section_name}</button>
                    <div class="content">
                    <br />
                `;

                // Collect the total amount of food items for each menu section and repeat for each result
                for(let m=0;m<next_section.menu_items.length;m++) {
                    let next_food = next_section.menu_items[m];

                    console.log(next_food);

                    next_html += `
                
                    <div>${next_food.name}</div>
                    <div>${next_food.description}</div>
                    <div>${next_food.price}</div>
                    <br />
                    
                    `;

                }
                // the following netx_html tags all have a closing </div> tag, in order to fully shut the loop
                next_html += `
                    </div>
                    <br /><br />
                `;
            }

            next_html += `
                </div>
                <br /><br />
            `;
        }

        next_html += `
            </div>
            <br /><br />
        `;

        // Final output is a collection of all the loops featuring the menus, then menu sections, then section items. 
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

// askName function resets all regular variables, then takes in the value of nameID, a typed user input, and passes it to the API.
// This allows the user to manually search for restaurants by restaurant name.
function askName()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;
    nameID = document.getElementById("name").value;

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'restaurants/search/fields?restaurant_name=',
        input: nameID,
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

    console.log(apiData);

}

// nextPage function allows the users to move to the next page, with each page displaying 25 array elements.
function nextPage()
{
    // Variable Reset
    arrayNumber = 0;
    nameID = document.getElementById("name").value;

    // Increment Page
    pageID++;

    // Console Log
    console.log('AE = '+ arrayNumber + ', Page = ' + pageID + ', Name = ' + nameID);

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'restaurants/search/fields?restaurant_name=',
        input: nameID,
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


// Secondary Functions
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Optional Functions that are used to call pre-set API calls based on user input.
// Each function is tied to a display button press.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// getWendys() Function, responds to a user clicking a pre-made Wendys button, 
// and calls a fetch request, with the Wendys item set as the nameID. 
function getWendys()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // nameID is pre-set
    nameID = 'Wendys';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'restaurants/search/fields?restaurant_name=',
        input: nameID,
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

// getChipotle() Function, responds to a user clicking a pre-made Chipotle button, 
// and calls a fetch request, with the Chipotle item set as the nameID. 
function getChipotle()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // nameID is pre-set
    nameID = 'Chipotle';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'restaurants/search/fields?restaurant_name=',
        input: nameID,
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

// getBaskinRobbins() Function, responds to a user clicking a pre-made Baskin Robbins button, 
// and calls a fetch request, with the Baskin Robbins item set as the nameID. 
function getBaskinRobbins()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // nameID is pre-set
    nameID = 'Baskin Robbins';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'restaurants/search/fields?restaurant_name=',
        input: nameID,
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

// getKrispyKreme() Function, responds to a user clicking a pre-made Krispy Kreme button, 
// and calls a fetch request, with the Krispy Kreme item set as the nameID. 
function getKrispyKreme()
{
    // Variable Reset
    arrayNumber = 0;
    pageID = 1;

    // nameID is pre-set
    nameID = 'Krispy Kreme';

    // Url Setup
    let apiData = 
    {   
        url: 'https://api.documenu.com/v2/',
        field: 'restaurants/search/fields?restaurant_name=',
        input: nameID,
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
