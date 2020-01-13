$(document).ready(function() {
  $(".item-btn").click(function(event) {
    // get the id of the .item-btn parent element and check the name.
    const $itemBtnId = this.id
    // check if the .item-btn parent id exists in the cart already.
    if ($(`#cart-container #${$itemBtnId}-cart`).length) {
      let $value = $(`#cart-container #${$itemBtnId}-cart-value`).html()
      $value = parseInt($value, 10)
      $value++
      $(`#${$itemBtnId}-cart-value`).html($value)      
    } else { // create the new item element.
      const $itemDiv  = $("<div>", {"class": "item-div", "id": `${$itemBtnId}-cart`})
      const $itemName = $("<span>", {"class": "item-name", "id": `${$itemBtnId}-cart-name`}).html(`${$itemBtnId} `)
      const $itemQuantity = $("<span>", {"class": "item-value", "id": `${$itemBtnId}-cart-value`}).html(1)
      $itemDiv.append($itemName)
      $itemDiv.append($itemQuantity)
      $(`#cart-container`).append($itemDiv)
    }
  })
})
