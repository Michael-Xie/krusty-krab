$(document).ready(function() {
  console.log("hello")
  $(".item-btn").click(function(event) {
    // get the id of the .item-btn parent element and check the name.
    const $itemId    = $(this).parent().parent().parent().parent().attr("id")
    const $itemName  = $(this).parent().parent().siblings(`#${$itemId}-name`).html()
    const $itemPrice = ($(this).parent().siblings(`#${$itemId}-price`).html()).slice(1)
    // check if the .item-btn parent id exists in the cart already.
    if (!$(`#${$itemId}-cart`).length) {
      const $itemDiv      = $("<div>", {"class": "item-div", "id": `${$itemId}-cart`})
      const $copyItemName = $("<input>", {"class": "item-name", "id": `${$itemId}-cart-name`, "name": "item", "value": `${$itemName}`})
      const $itemQuantity = $("<input>", {"class": "item-value", "id": `${$itemId}-cart-value`, "name": "quantity", "value": "1"})
      const $removeItem   = $("<a>", {"class": "item-subtract", "id": `${$itemId}-subtract`, "href": "javascript:null", "onclick": "return null"}).html(`-`)
      const $addItem      = $("<a>", {"class": "item-add", "id": `${$itemId}-add`, "href": "javascript:null", "onclick": "return null"}).html(`+`)
      // append all the data to the item-container.
      $itemDiv.append($copyItemName)
      $itemDiv.append($removeItem)
      $itemDiv.append($itemQuantity)
      $itemDiv.append($addItem)
      $(`#item-container`).append($itemDiv)
      // hide the itemBtn
      $(`#${$itemId}-btn`).fadeOut(1000)
    } else {
      return
    }

    // alter the price. -- move into a function
    let $currentTotal = Number(($('#price-total').html())) + Number($itemPrice)
    $('#price-total').html(`${Number($currentTotal).toFixed(2)}`)

    $(`#${$itemId}-subtract`).click(function(event) {
      const $BtnId = $(this).parent().attr("id")

      let $value = $(`#${$BtnId}-value`).attr("value")
      $value = parseInt($value, 10)
      $value--
      // if the value is 0 remove the div.
      if ($value === 0) {
        $(`#${$BtnId}`).remove()
        // display the previously hidden btn.
        $(`#${$itemId}-btn`).fadeIn(1000)
      }
      $(`#${$BtnId}-value`).attr("value", $value)

      let $currentTotal = Number(($('#price-total').html())) + Number($itemPrice)
      $('#price-total').html(`${Number($currentTotal).toFixed(2)}`)
    })

    $(`#${$itemId}-add`).click(function(event) {
      const $BtnId = $(this).parent().attr("id")

      let $value = $(`#${$BtnId}-value`).attr("value")
      $value = parseInt($value, 10)
      $value++
      $(`#${$BtnId}-value`).attr("value", $value)

      let $currentTotal = Number(($('#price-total').html())) + Number($itemPrice)
      $('#price-total').html(`${Number($currentTotal).toFixed(2)}`)
    })
  })
})
