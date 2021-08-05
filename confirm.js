
/*fonction d'affichage du prix total et du nomero de commande */
function displayPriceAndOrder() {
/*selection des div*/
  const order = document.querySelector(".order");
  const price = document.querySelector(".price");
/*ecriture du html dans les div*/
  order.innerHTML =
    "Votre numero de commande est :" + localStorage.getItem("orderId");
  price.innerHTML =
    "Le montant de votre commande est :" + localStorage.getItem("total");
  /*nettoyage du local storage*/
  localStorage.clear();
}
/*execution de la fonction*/
displayPriceAndOrder();
