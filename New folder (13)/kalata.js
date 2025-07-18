let basket_container = document.querySelector('.basket_container');
let basketArray = [];

getAllProducts();

function getAllProducts() {
    fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll', {
        method: 'GET',
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);  
        basketArray = data;
        generateVisual(basketArray);
    }).catch((err) => {
        console.error(err);
    });
}

function generateVisual(arr) {
    let empty = '';

    for (let i = 0; i < arr.length; i++) {
        empty += `
        <div class="card">
            <img class="card-image" src="${arr[i].product.image}" />
            <h2 class="card-name">${arr[i].product.name}</h2>
            <strong class="card-name">${arr[i].price}$</strong>
            ${arr[i].vegeterian ? '<p style="color:green;">ვეგეტარიანულია</p>' : '<p style="color:red;">არავეგეტარიანულია</p>'}
            ${arr[i].nuts ? '<p style="color:green;">თხილიანი</p>' : '<p style="color:red;">თხილის გარეშე</p>'}
            <button onclick="onUpdateBasketItemBtnClick('plus',${arr[i].product.id})">plus</button>
            <h1>quantity: ${arr[i].quantity}</h1>
            <button onclick="onUpdateBasketItemBtnClick('minus',${arr[i].product.id})">minus</button>
            <h2>სიმწარის დონე: ${arr[i].product.spiciness}</h2>
            <button class="button" onclick="onDeleteFromBasketBtnClick(${arr[i].product.id})">კალათიდან წაშლა</button>
        </div>
        `;
    }

    if (basket_container) {
        basket_container.innerHTML = empty;
    } else {
        console.error("Error: basket_container element not found in DOM");
    }
}


function onDeleteFromBasketBtnClick(id){
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`,{
        method: 'DELETE',
    }).then((res) => {
        getAllProducts();
    }).catch((err) => {
      alert('ვერ მოხერხდა წაშლა პრობლემის გამო')
    })
}


function onUpdateBasketItemBtnClick(event,id){
   let findProductInArray = basketArray.find((item) => {
    return item.product.id == id
   })
      if(findProductInArray){
       
     if(event == 'minus'){
        let UpdateQuantity = findProductInArray.quantity - 1
        let UpdatePrice = UpdateQuantity * findProductInArray.product.price
        
               var reqBodyMin = {
                quantity: UpdateQuantity,
                price: UpdatePrice,
                productId: findProductInArray.product.id
              }
              UpdateBasket(reqBodyMin)
             } else if(event == 'plus'){
                let UpdateQuantity = findProductInArray.quantity + 1
                let UpdatePrice = UpdateQuantity * findProductInArray.product.price

            var reqBodyPlus = {
            quantity: UpdateQuantity,
            price: UpdatePrice,
            productId: findProductInArray.product.id
          }
              UpdateBasket(reqBodyPlus)

      }else{
        console.error('product not found')
      }

    }
function UpdateBasket(reqBody){
     fetch('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',{
            method: 'PUT',
            body:JSON.stringify(reqBody),
            headers:{
                'Content-Type':'application/json'
            }
          }).then(() => {
             getAllProducts();
          }).catch((err) => {
            alert('ვერ მოხერხდა განახლება პრობლემის გამო')
          })
     } 
}
        