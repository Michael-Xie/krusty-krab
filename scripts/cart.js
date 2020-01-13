$(document).ready(function() {
  $(".item-btn").click(function(event) {
    // get the id of the .item-btn parent element and check the name.
    const $itemBtnId = $(this).parent().attr("id")
    const $itemPrice = $(this).parent().children(`#${$itemBtnId}-price`).html()
    // check if the .item-btn parent id exists in the cart already.
    if ($(`#item-container #${$itemBtnId}-cart`).length) {
      let $value = $(`#${$itemBtnId}-cart-value`).html()
      $value = parseInt($value, 10)
      $value++
      $(`#${$itemBtnId}-cart-value`).html($value)      
    } else { // create the new item element.
      const $itemDiv  = $("<div>", {"class": "item-div", "id": `${$itemBtnId}-cart`})
      const $itemName = $("<span>", {"class": "item-name", "id": `${$itemBtnId}-cart-name`}).html(`${$itemBtnId} `)
      const $itemQuantity = $("<span>", {"class": "item-value", "id": `${$itemBtnId}-cart-value`}).html(1)
      $itemDiv.append($itemName)
      $itemDiv.append($itemQuantity)
      $(`#item-container`).append($itemDiv)
    }
    // alter the price.
    let $currentTotal = Number($('#price-total').html()) + (Number($itemPrice) / 100)
    $('#price-total').html(`${$currentTotal.toFixed(2)}`)
  })
})
