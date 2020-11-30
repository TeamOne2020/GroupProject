// Creating Elements
// --------------------------------------------------------------------------------------

//input page
var pageNumberPrompt = prompt("Page Number:");
var pageNumber = parseInt(pageNumberPrompt);
console.log('page number ' + pageNumber);

//input array
var arrayNumber = prompt("Array Number:");
console.log('array number ' + arrayNumber);




// API Elements
// --------------------------------------------------------------------------------------
let apiData = 
{
    url: 'https://us-restaurant-menus.p.rapidapi.com/',
    field: 'menuitems',
    input: 'search',
    page: pageNumber,
    //page: pageNumber,
    key: 'rapidapi-key=cb4abace9fmsh4cbbba9df1c4cdcp1f8e64jsn1129936c4ebe'

    // All together the url looks like: 
    // https://us-restaurant-menus.p.rapidapi.com/restaurants/state/WA?page=1&rapidapi-key=cb4abace9fmsh4cbbba9df1c4cdcp1f8e64jsn1129936c4ebe
}

let {url,field,input,page,key} = apiData
const apiUrl = `${url}${field}/${input}?page=${page}&${key}`
console.log(apiUrl)

//fetch
fetch(apiUrl)
    .then( (data) => 
    {
        if(data.ok){
            return data.json()
        }
        throw new Error('Response not ok.'); 
    })
    .catch( error => console.error('Error:', error))

    .then((restaurants) => generateHtml(restaurants))




// HTML Output
// --------------------------------------------------------------------------------------
const generateHtml = (data) => 
{
    console.log(data)
    const html = 
    `
        <div>Name: ${data.result.data[arrayNumber].restaurant_name}</div>
        <div>Phone: ${data.result.data[arrayNumber].restaurant_phone}</div>
        <div>Cuisines: ${data.result.data[arrayNumber].cuisines}</div>
        <div>Address: ${data.result.data[arrayNumber].address.formatted}</div>
        <div>Price Range: ${data.result.data[arrayNumber].price_range}</div>
        <div>ID: ${data.result.data[arrayNumber].restaurant_id}</div>
        <div>Menu: ${data.result.data[arrayNumber].menus}</div>
        <div>Menu Item: ${data.result.data[arrayNumber].menu_item_name}</div>
        <div>Menu Item: ${data.result.data[arrayNumber].menu_item_pricing[0].price}</div>
    `
    const testDIV = document.querySelector('.test')
    testDIV.innerHTML = html
}




// Functions
// --------------------------------------------------------------------------------------

//array next test
function arrayButtonTest() 
{
    arrayNumber++;
    console.log(arrayNumber);
    
    fetch(apiUrl)
    .then( (data) => 
    {
        if(data.ok){
            return data.json()
        }
        throw new Error('Response not ok.'); 
    })
    .catch( error => console.error('Error:', error))
    .then((restaurants) => generateHtml(restaurants))
}

//page next test
function pageButtonTest() 
{
    apiData.page++
    console.log(apiData.page);

    fetch(apiUrl)
    .then( (data) => 
    {
        if(data.ok){
            return data.json()
        }
        throw new Error('Response not ok.'); 
    })
    .catch( error => console.error('Error:', error))

    .then((restaurants) => generateHtml(restaurants))

}

//textbox page (broken)
function buttonTest() 
{
    var pageNumberTest = document.getElementById("numberInput").value;
    document.getElementById("demo").innerHTML = pageNumberTest;
    console.log('test ' + pageNumberTest);
}