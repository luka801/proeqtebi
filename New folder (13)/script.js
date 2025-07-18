let product_container = document.querySelector('.product_container');
let vegeterian_select = document.querySelector('.vegeterian_select');
let nuts_select = document.querySelector('.nuts_select');
let spiciness_select = document.querySelector('.spiciness_select');
let ProductsArray = [];

getAllProducts();

function getAllProducts() {
    fetch('https://restaurant.stepprojects.ge/api/Products/GetAll', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        ProductsArray = data;
        generateVisual(ProductsArray);
    })
    .catch((error) => {
        console.error("Fetching error:", error);
    });
}

function generateVisual(arr) {
    let empty = '';

    for (let i = 0; i < arr.length; i++) {
        empty += `
        <div class="card">
            <img class="card-image" src="${arr[i].image}" />

            <h2 class="card-name">${arr[i].name}</h2>
            <strong class="card-name">${arr[i].price}$</strong>
            ${arr[i].vegeterian ? '<p style="color:green;">ვეგეტარიანულია</p>' : '<p style="color:red;">არავეგეტარიანულია</p>'}

            ${arr[i].nuts ? '<p style="color:green;">თხილიანი</p>' : '<p style="color:red;">თხილის გარეშე</p>'}

            <h2>სიმწარის დონე: ${arr[i].spiciness}</h2>
             <button class="button" onclick="onAddToBasketBtnClick(${arr[i].id})" >კალათში დამატება</button>
        </div>
        `;
    }

    if (product_container) {
        product_container.innerHTML = empty;
    } else {
        console.error("Error: product_container element not found in DOM");
    }
}



function onFilterBtnClick(){
    let queryArray = [];
    if(vegeterian_select.value != ''){
        queryArray.push(`vegeterian=${vegeterian_select.value}`);
    }
    if(nuts_select.value != ''){
        queryArray.push(`nuts=${nuts_select.value}`);
    }
    if(spiciness_select.value != ''){
        queryArray.push(`spiciness=${spiciness_select.value}`);
    }
    let queryString = queryArray.length > 0 ? `?${queryArray.join('&')}` : ''
   fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered${queryString}`)
   .then((data) => {
    return data.json()
   }).then((response) => {
   ProductsArray = response
   generateVisual(ProductsArray)
   }).catch((err) => {
    console.log(err)
   })
}


function onAddToBasketBtnClick(id){
    let findProduct = ProductsArray.find((product) => {
        return product.id == id
    })
    if(findProduct){
        let reqBody = {
            
                quantity: 1,
                price: findProduct.price,
                productId: findProduct.id
            
        }
      fetch('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket',{
        method:"POST",
        body:JSON.stringify(reqBody),
        headers:{
            'Content-Type':'application/json'
        }
      }).then((data) => {
        return data.json()
      }).then((res) => {
        alert('დაემატა წარმატებით')
      }).catch((err) => {
        alert(`დამატება ვერ მოხერხდა პრობლემის გამო`)
      })
    }
    else{
        console.error('Product not found')
    }
}

