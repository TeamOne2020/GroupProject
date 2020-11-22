const apiData = {
url:  'https://us-restaurant-menus.p.rapidapi.com/restaurant/',
id: '389069',
field: 'menuitems/',
key: '?rapidapi-key=d794304216mshc8565ee2d31fe3fp109107jsne575c3d52ba2'

}







const {url,id, field, key} = apiData

const apiUrl = `${url}${id}/${field}${key}`
console.log(apiUrl)

fetch(apiUrl)
    .then( (data) =>
    
    {
        if (data.ok){
        return data.json()

     }      
     throw new Error('Response not ok.');
    })
    .catch( error => console.error('Error:', error))
    
    .then( (menu) => generateHtml(menu))

    const generateHtml = (data) => {
        const html = `
        <div>Name: ${data.result.data[1].menu_item_name}</div>
        <div>Description: ${data.result.data[1].menu_item_description}</div>
      
        <div>RestaurantID: ${data.result.data[1].restaurant_id}</div>
        <Restaurant>RestaurantName: ${data.result.data[1].restaurant_name}</div>
        <div>Subsection: ${data.result.data[1].subsection}</div>
        </div>
        `

        const menuDiv = document.querySelector('.menu')
        menuDiv.innerHTML = html

    }