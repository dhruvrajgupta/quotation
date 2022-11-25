$(function () {
	var includes = $('[data-include]');
	$.each(includes, function () {
		var file = $(this).data('include') + '.html';
		$(this).load(file);
	})
});

var company = {
    "name": "Yash Corporation",
    "address1": "26, Chatta Wala Gulli,",
    "address2": "Kolkata - 700-012, West Bengal",
    "phone": "(+91) 9433099062",
    "email": "yashcorpkol@gmail.com",
    "gstin": ""
};

var buyerDetails = {};

function showBuyerDetails(buyerDetails){
    $("#textBuyerName").text(buyerDetails["name"]);
    $("#textBuyerAddress1").text(buyerDetails["address1"]);
    $("#textBuyerAddress2").text(buyerDetails["address2"]);
    $("#textBuyerPhone").text(buyerDetails["phone"]);
}

$(document).on('click', '#saveBtnBuyerDetail', function(){ 
    // Your Code
    buyerDetails["name"] = $("#buyer_name").val();
    buyerDetails["address1"] = $("#buyer_address1").val();
    buyerDetails["address2"] = $("#buyer_address2").val();
    buyerDetails["phone"] = $("#buyer_phone").val();

    showBuyerDetails(buyerDetails);
});

$(document).on('click', "#saveItemBtn", function(){
    var newItem = {};
    newItem["description"] = $("#description").val();
    newItem["brand"] = $("#brand").val();
    newItem["hsn"] = $("#hsn_code").val();
    newItem["unit"] = $("#unit").val();
    newItem["qty"] = $("#qty").val();
    newItem["rate"] = $("#rate").val();
    newItem["value"] = $("#value").val();
    newItem["gst"] = $("#gst").val();
    newItem["tax_amt"] = $("#tax").val();
    newItem["total_amt"] = $("#item_total_amount").val();

    console.log(newItem)
});

function triggers(id){
    $(document).on('change keyup mouseup', id, function(){

        var eleQty = $("#qty");
        var eleRate = $("#rate");
        var eleGst = $("#gst");
        var eleValue = $("#value");
        var eleTaxAmount = $("#tax_amount");
        var eleItemTotalAmount = $("#item_total_amount");

        var qty = eleQty.val();
        if (!qty){
            qty = 0;
        }

        var rate = eleRate.val();
        if (!rate){
            rate = 0;
        }

        var gst = eleGst.val();
    
        amounts = calculate_amounts(qty, rate, gst);
        eleValue.val(toIndianCurrency(amounts["value"]));
        eleTaxAmount.val(toIndianCurrency(amounts["tax_amount"]));
        eleItemTotalAmount.val(toIndianCurrency(amounts["item_total_amount"]));
    });
}

function toIndianCurrency(num){
    return num.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });
}

function calculate_amounts(qty, rate, gst){
    var amounts = {};
    value = qty * rate;
    tax_amount = gst * value;
    item_total_amount = value + tax_amount;

    amounts["value"] = value;
    amounts["tax_amount"] = tax_amount;
    amounts["item_total_amount"] = item_total_amount;

    return amounts;
}

var ids = ['#qty', '#rate', '#gst'];
for (let x in ids){
    triggers(ids[x]);
}
