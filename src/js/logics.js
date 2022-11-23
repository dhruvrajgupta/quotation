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

var buyerDetails = {}

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
