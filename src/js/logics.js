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

var items_list = [];
items_list.push({"description": "Cup Saucer", "brand": "Borosil", "hsn": "11", "unit": "PCS", "qty": "1", "rate": "1005", "gst": "0.18", "value": 1005, "tax_amount": 180.9, "item_total_amount": 1185.9 });
items_list.push({"description": "Spoons", "brand": "VIP", "hsn": "11", "unit": "PCS", "qty": "1", "rate": "1005", "gst": "0.18", "value": 1005, "tax_amount": 180.9, "item_total_amount": 1185.9 });

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
    newItem["gst"] = $("#gst").val();

    item_calculated_amounts = calculate_amounts(newItem["qty"], newItem["rate"], newItem["gst"]);
    console.log(item_calculated_amounts);

    newItem["value"] = item_calculated_amounts["value"];
    newItem["tax_amount"] = item_calculated_amounts["tax_amount"]
    newItem["item_total_amount"] = item_calculated_amounts["item_total_amount"];

    items_list.push(newItem);
    eleModal = $(this).parent().parent().parent().parent();
    eleModal.modal('hide');

    createTable();
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

function createTable(){
    eleTableBody = $("#item_list_table tbody");

    eleTableBody.html('');

    for (var i=0; i<items_list.length; i++){
        eleTableBody.append(renderItemRow(i, items_list[i]));
        console.log(items_list[i]);
    }
}

function renderItemRow(index, item){
    var render = `` +
        `<tr>
            <td>${index+1}</td>
            <td>${item["description"]}</td>
            <td>${item["brand"]}</td>
            <td>${item["hsn"]}</td>
            <td>${item["unit"]}</td>
            <td>${item["qty"]}</td>
            <td>${toIndianCurrency(item["rate"])}</td>
            <td>${toIndianCurrency(item["value"])}</td>
            <td>${item["gst"]*100}</td>
            <td>${toIndianCurrency(item["tax_amount"])}</td>
            <td>${toIndianCurrency(item["item_total_amount"])}</td>
            <td>
                <button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;

    return render;
}

function validateItem(item){
    
}
