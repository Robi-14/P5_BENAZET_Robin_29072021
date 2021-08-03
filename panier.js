function main(){
let products =JSON.parse(localStorage.produit)
console.log(products.price);
for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(product);

    
displayArticle(product) 

    
 }
 
 calcultotal(products)
 boutonSupprimerPanier()
}
main()

function displayArticle(product) {
     tableau= document.getElementById("cart-tablebody")
    
    
   
    tableau.innerHTML += `
    <tr><th>${product.name}</th> <th> ${product.id}</th> <th>${product.price}</th></tr>`
    total= document.querySelector(".total")} 
    
    
 

// prix total panier

// prendre les prix dans le tableau du panier
function calcultotal(products){
    let prixTotalCalcul =[]
for (let m = 0; m < products.length; m++) {
    let prixProduitsDansPanier = products[m].price;
    prixProduitsDansPanier= parseFloat(prixProduitsDansPanier)
  

// mettre les prix dans la varaibleprixTotalcalcul
prixTotalCalcul.push(prixProduitsDansPanier)
console.log(prixTotalCalcul);


}
// adittionner les prix du tableau  " prixTotalCalcul" avec reduce
const reducer =(accumulator, currentValue) => accumulator + currentValue;
console.log(reducer);
prixTotalCalcul= prixTotalCalcul.reduce(reducer)
console.log(prixTotalCalcul);

prixTotalCalcul= new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotalCalcul)
total.innerHTML =`${prixTotalCalcul}`

}
/*Creation du bouton "vider le panier"*/
function boutonSupprimerPanier(){
    /*insertion du bouton dans le HTML*/
    tableEnd= document.getElementById('total')
    tableEnd.insertAdjacentHTML("beforeBegin", `<button type="submit" class='btn-delete'>Vider le panier</button>`)
    console.log(tableEnd);
    /*Suppression de la key "produit" du localstorage*/
    btnSupprPanier=document.querySelector('.btn-delete')
    btnSupprPanier.addEventListener('click', (e)=>{
        /* .removeItem vide le panier*/
        localStorage.removeItem("produit")

        /*rafraichissement de la page panier*/
        location.href= ("panier.html")})
    
}
/*Formulaire*/

const inputs = document.querySelectorAll(' input[type="text"]')
console.log(inputs);

const errorDisplay =(tag, message , valid) => {       
    const container = document.querySelector("." + tag +"-container");
    const span =document.querySelector("."+ tag + "-container > span");
        if (!valid){
            container.classList.add("error");
            span.textContent = message;
        }else{
            container.classList.remove("error");
            span.textContent = message;
        }
    }

    const lastNameChecker = (value) =>{
        if (value.length < 2) {
            errorDisplay("lastname", " Le nom doit faire minimum 2 caractères")
            lastname = null
        } else if (!value.match(/^[.\$\"\/\\\:|]+ /)){ 
            errorDisplay("lastname", " Le nom ne doit pas contenir de caractère spéciaux ")
            lastname = null


        }else{
            errorDisplay("lastname", "", true)
            lastname = value
        }
    }




inputs.forEach((input)=>
input.addEventListener("input" , (e) =>{
    console.log(e.target.id);
    switch (e.target.id){
        case "last-name":
            lastNameChecker(e.target.value)
        break;





    }
}




)





)