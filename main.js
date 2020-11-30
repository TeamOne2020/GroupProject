const apiData = {
url:  'https://us-restaurant-menus.p.rapidapi.com/restaurant/',
id: '389069',
field: 'menuitems',
key: '?rapidapi-key=d794304216mshc8565ee2d31fe3fp109107jsne575c3d52ba2',
pageNum: '&page=1',

}





 

const {url,id, field, key, pageNum} = apiData

const apiUrl = `${url}${id}/${field}${key}${pageNum}`
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


    let output = "";
    console.log(data.result.data.length)
    for(let i=0;i<data.result.data.length;i++) {
        let next_item = data.result.data[i];
        const next_html = `
        <div class='restaurant'>
        <div>Restaurant Name: ${next_item.restaurant_name}</div>
        <div>Name: ${next_item.menu_item_name}</div>
        <div>Description: ${next_item.menu_item_description}</div>
         <div>Price: ${next_item.menu_item_pricing[0].priceString}</div>
         <div>Subsection: ${next_item.subsection}</div>
         </div>
         `;
         output += next_html;


    }
    
      
     
      
     
        
       

        const menuDiv = document.querySelector('.menu')
        menuDiv.innerHTML = output

    }