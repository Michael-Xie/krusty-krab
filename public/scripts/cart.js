$(document).ready(function () {
  // comment
  $(".item-btn").click(function (event) {
    const verifyPayment = (formData) => {
      $cardNumber = $("#credit-name").val()
      alert($cardNumber)
    }
    // get the id of the .item-btn parent element and check the name.
    const $itemId = $(this).parent().parent().parent().parent().attr("id")
    const $itemName = $(this).parent().parent().siblings(`#${$itemId}-name`).html()
    const $itemPrice = ($(this).parent().siblings(`#${$itemId}-price`).html()).slice(1)

    $("#squidward-talking").hide();
    // check if the .item-btn parent id exists in the cart already.
    if (!$(`#${$itemId}-cart`).length) {
      const $itemDiv = $("<div>", { "class": "item-div", "id": `${$itemId}-cart` })
      const $copyItemName = $("<input>", { "class": "item-name", "id": `${$itemId}-cart-name`, "name": "item", "value": `${$itemName}` })
      const $itemQuantity = $("<input>", { "class": "item-value", "id": `${$itemId}-cart-value`, "name": "quantity", "value": "1" })
      const $removeItem = $("<a>", { "class": "item-subtract", "id": `${$itemId}-subtract`, "href": "javascript:null", "onclick": "return null" }).html(`-`)
      const $addItem = $("<a>", { "class": "item-add", "id": `${$itemId}-add`, "href": "javascript:null", "onclick": "return null" }).html(`+`)
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

    $(`#${$itemId}-subtract`).click(function (event) {
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

      if (!$('#item-container').find('.item-div').length) {
        $("#squidward-talking").show();
        // alert($("#payment-information").is(':visible'))
        // if ($(div).is(':visible'))
        if ($("#payment-information").is(':visible')) {
          $("#payment-information").toggle(false);
          $("#cart-confirm-btn").css("display", "block")
          $("#cart-submit-btn").css("display", "none")
        }

      }
      })

    $(`#${$itemId}-add`).click(function (event) {
      const $BtnId = $(this).parent().attr("id")

      let $value = $(`#${$BtnId}-value`).attr("value")
      $value = parseInt($value, 10)
      $value++
      $(`#${$BtnId}-value`).attr("value", $value)

      let $currentTotal = Number(($('#price-total').html())) + Number($itemPrice)
      $('#price-total').html(`${Number($currentTotal).toFixed(2)}`)
    })
  })


  $("#cart-confirm-btn").on("click", function (event) {
    if ($('#item-container').find('.item-div').length) {
      $("#cart-confirm-btn").css("display", "none")
      $("#cart-submit-btn").css("display", "block")
      $("#payment-information").toggle("slow");
    } else {
      // alert("no items in cart - shouldn't show pop-up form")
      //$("payment-infomation").addClass('collapse');
      // $("cart-confirm-btn").addClass('collapsed');
      // $("cart-confirm-btn").attr("aria-expanded", "true");
      // alert("resolving no collapse for no items in cart")
    }
  })

  // on the submission of the payment information, validate the form.
  $("#cart-submit-btn").on("click", function (event) {
    event.preventDefault()
    $.ajax({
      url: "/order",
      method: "GET",
      data: $("#payment-form").serialize(),
      success: function () {
        // track the success of each input.
        const $success = []
        // get the form data through accessing ids.
        const $cardName = $("#credit-name").val()
        const $cardNumber = $("#credit-number").val()
        const $cardExpire = $("#credit-expire").val()
        const $cardCSV = $("#credit-csv").val()
        // ensure that the name field is not empty
        if ($cardName) {
          $("#credit-name").css("color", "#0f0")
          $success.push(true)
        }
        else {
          $("#credit-name").css("color", "#f00")
        }
        // ensure that all the credit number is properly formatted.
        if (Number($cardNumber)
          && !($cardNumber).includes(".")
          && $cardNumber.length === 16) {
          $("#credit-number").css("color", "#0f0")
          $success.push(true)
        } else {
          $("#credit-number").css("color", "#f00")
        }
        // ensure that the expiry data is properly formatted
        $month = Number($cardExpire.slice(0, 2))
        $year = Number($cardExpire.slice(3, 5))
        if ($month > 0 && $month < 13 && $year > 20) {
          $("#credit-expire").css("color", "#0f0")
          $success.push(true)
        } else {
          $("#credit-expire").css("color", "#f00")
          // ensure that the CSV is a 3 digit number.
        } if ($cardCSV >= 100) {
          $("#credit-csv").css("color", "#0f0")
          $success.push(true)
        } else {
          $("#credit-csv").css("color", "#f00")
        }

        // if we have a success array of length 4,
        // we are clear to post the order!
        if ($success.length === 4) {
          $(`<div id="dialog">
              Congratulations! Your Order has been submitted, you will received an SMS after this dialog is closed
            </div>
            `).dialog({
              'title': "hello world",
              'buttons': {
                'my button': function(event) {
                  $("#cart-form").submit()
                }
              }
          }).show()
        }
      }
    })
  })
})
