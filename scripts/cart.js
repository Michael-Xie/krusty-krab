$(document).ready(function() {
  $(".item-btn").click(function(event) {
    const verifyPayment = (formData) => {
      $cardNumber = $("#credit-name").val()
      alert($cardNumber)
    }
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

      let $currentTotal = Number(($('#price-total').html())) - Number($itemPrice)
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

  $("#cart-confirm-btn").on("click", function(event) {
    event.preventDefault()
    $("#cart-form").fadeOut(1000)
    setTimeout( () => {
      $("#payment-form").fadeIn(500).css("display", "flex")
    }, 1000)
  }) 
  
  $("#go-back-btn").on("click", function(event) {
    event.preventDefault()
    $("#payment-form").fadeOut(1000)
    setTimeout( () => {
      $("#cart-form").fadeIn(500).css("display", "flex")
    }, 1000)
  }) 

  // on the submission of the payment information, validate the form.
  $("#payment-form").on("submit", function(event) {
    event.preventDefault()
    $.ajax({
      url: "/order",
      method: "GET",
      data: $("#payment-form").serialize(),
      success: function() {
        // get the form data through accessing ids.
        const $cardNumber = $("#credit-number").val()
        const $cardExpire = $("#credit-expire").val()
        const $cardCSV    = $("#credit-csv").val()
        // ensure that all the credit number is properly formatted.
        if (Number($cardNumber) 
          && !($cardNumber).includes(".")
          && $cardNumber.length === 16)
          $("#credit-number").css("background", "#0f0")
        else
          $("#credit-number").css("background", "#f00")
        // ensure that the expiry data is properly formatted
        $month = Number($cardExpire.slice(0, 2))
        $year  = Number($cardExpire.slice(3, 5))
        if ($month > 0 && $month < 13 && $year > 20)
          $("#credit-expire").css("background", "#0f0")
        else
          $("#credit-expire").css("background", "#f00")
        // ensure that the CSV is a 3 digit number.
        if ($cardCSV >= 100)
          $("#credit-csv").css("background", "#0f0")
        else
          $("#credit-csv").css("background", "#f00")
      }
    })
  })
})
