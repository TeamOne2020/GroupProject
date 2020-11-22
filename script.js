const apiData = 
{
    url: 'https://us-restaurant-menus.p.rapidapi.com/',
    field: 'restaurants/state',
    input: 'WA',
    key: '?rapidapi-key=cb4abace9fmsh4cbbba9df1c4cdcp1f8e64jsn1129936c4ebe'
}

const {url,field,input,key} = apiData
const apiUrl = `${url}${field}/${input}${key}`
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

const generateHtml = (data) => 
{
    console.log(data)
    const html = 
    `
        <div>Name: ${data.result.data[1].restaurant_name}</div>
        <div>Phone: ${data.result.data[1].restaurant_phone}</div>
        <div>Cuisines: ${data.result.data[1].cuisines}</div>
        <div>Address: ${data.result.data[1].address.formatted}</div>
        <div>Price Range: ${data.result.data[1].price_range}</div>
        <div>ID: ${data.result.data[1].restaurant_id}</div>
        <div>Menu: ${data.result.data[1].menus}</div>
    `
    const testDIV = document.querySelector('.test')
    testDIV.innerHTML = html
}