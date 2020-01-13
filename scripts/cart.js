$(document).ready(function() {
  $(".item-btn").click(function(event) {
    // get the id of the .item-btn parent element and check the name.
    const $itemId    = $(this).parent().attr("id")
    const $itemName  = $(this).parent().children(`#${$itemId}-name`).html()
    const $itemPrice = $(this).parent().children(`#${$itemId}-price`).html()
    // check if the .item-btn parent id exists in the cart already.
    if (!$(`#${$itemId}-cart`).length) {
      const $itemDiv      = $("<div>", {"class": "item-div", "id": `${$itemId}-cart`})
      const $copyItemName = $("<span>", {"class": "item-name", "id": `${$itemId}-cart-name`}).html(`${$itemName} `)
      const $itemQuantity = $("<span>", {"class": "item-value", "id": `${$itemId}-cart-value`}).html(1)
      const $removeItem   = $("<a>", {"class": "item-subtract", "id": `${$itemId}-subtract`, "href": "#"}).html(`- `)
      const $addItem      = $("<a>", {"class": "item-add", "id": `${$itemId}-add`, "href": "#"}).html(` +`)
      // append all the data to the item-container.
      $itemDiv.append($copyItemName)
      $itemDiv.append($removeItem)
      $itemDiv.append($itemQuantity)
      $itemDiv.append($addItem)
      $(`#item-container`).append($itemDiv)
      // hide the itemBtn
      $(`#${$itemId}-btn`).fadeOut(1000)
    }

    // alter the price. -- move into a function
    let $currentTotal = Number($('#price-total').html()) + (Number($itemPrice) / 100)
    $('#price-total').html(`${$currentTotal.toFixed(2)}`)

    $(`#${$itemId}-subtract`).click(function(event) {
      const $BtnId = $(this).parent().attr("id")

      let $value = $(`#${$BtnId}-value`).html()
      $value = parseInt($value, 10)
      $value--
      // if the value is 0 remove the div.
      if ($value === 0) {
        $(`#${$BtnId}`).remove()
        // display the previously hidden btn.
        $(`#${$itemId}-btn`).fadeIn(1000)
      }
      $(`#${$BtnId}-value`).html($value)      

      let $currentTotal = Number($('#price-total').html()) - (Number($itemPrice) / 100)
      $('#price-total').html(`${$currentTotal.toFixed(2)}`)
    })

    $(`#${$itemId}-add`).click(function(event) {
      const $BtnId = $(this).parent().attr("id")

      let $value = $(`#${$BtnId}-value`).html()
      $value = parseInt($value, 10)
      $value++
      $(`#${$BtnId}-value`).html($value)      

      let $currentTotal = Number($('#price-total').html()) + (Number($itemPrice) / 100)
      $('#price-total').html(`${$currentTotal.toFixed(2)}`)
    })
  })
})
