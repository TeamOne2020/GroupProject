// Url Variables
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Section to declare variables that will be input into each API fetch request.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// restaurantID will retrive a random number from the array of 10 elements 
restaurantID = [47689903117410820, 47448987122262460, 47669708117397010, 
                47640122122327140, 47686112122338380, 47620439122321304, 
                47591633122333260, 47610073122322570, 47656255117422984, 
                47603071117367680][Math.floor(Math.random() * 10)];

// Sets initial page to zero.
pageID = 1;

// Sets the fullmenu bool to true, filtering out restaurant calls that don't have menu information.
fullBool = true;

// Sets the exact bool to true, retrieving only rsults with exact matches, no partial matches.
exactBool = true;

// Sets the API key globally across the whole js page. 
keyID = 'key=88201b3c2556e27e9ed81dd41df22e04';


// API Call
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Since this js page is called automatically, without any button prompts to run the API call, its presented
// before the code to send the API data to html.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// Url Setup
let apiData = 
{   
    url: 'https://api.documenu.com/v2/',
    field: 'restaurant/',
    input: restaurantID,
    key: keyID
}

// Url JSON string
let {url,field,input,key} = apiData
let apiUrl = `${url}${field}${input}?${key}`
console.log(apiUrl)

// Url Fetch
fetch(apiUrl)
    .then( (data) => 
    {
        return data.json()
    })
    .then((restaurants) => generateHtml(restaurants))


// HTML Output
//-------------------------------------------------------------------------------------------------------------------------------------------//
// Main display block, using nested for loops to cycle through all API menu data, 
// and orginize it based on it's menu hierarchy.
//-------------------------------------------------------------------------------------------------------------------------------------------//

// HTML Output
// Html display for loop retrieves information from (data) which is the API fetch output.
const generateHtml = (data) => 
{
    let output = "";

    for(let i=0;i<1;i++)
    {
        let next_item = data.result;
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

        for(let j=0;j<next_item.menus.length;j++) {
            let next_menu = next_item.menus[j];

            next_html += `

            <button type="button" class="collapsible">${next_menu.menu_name}</button>
                <div class="content">
                <br />
            `;

            for(let k=0;k<next_menu.menu_sections.length;k++) {
                let next_section = next_menu.menu_sections[k];

                console.log(next_section);
                console.log("-----");

                next_html += `

                <button type="button" class="collapsible">${next_section.section_name}</button>
                    <div class="content">
                    <br />
                `;

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

// No Functions for this one!