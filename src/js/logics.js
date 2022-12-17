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
items_list.push({"description": "Cup Saucer", "brand": "Borosil", "hsn": "11", "unit": "PCS", "qty": "1", "rate": "1005", "gst": "0.12", "value": 1005, "tax_amount": 180.9, "item_total_amount": 1185.9 });
items_list.push({"description": "Spoons", "brand": "VIP", "hsn": "11", "unit": "PCS", "qty": "1", "rate": "1005", "gst": "0.18", "value": 1005, "tax_amount": 180.9, "item_total_amount": 1185.9 });

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

function createTable(){
    eleTableBody = $("#item_list_table tbody");

    eleTableBody.html('');

    for (var i=0; i<items_list.length; i++){
        eleTableBody.append(renderItemRow(i, items_list[i]));
    }

    let total_tax_amount = 0;
    let total_item_total_amount = 0;

    for (let item_index in items_list){
        let item = items_list[item_index];
        total_tax_amount += item["tax_amount"];
        total_item_total_amount += item["item_total_amount"];
    }
    
    total_rows = `` +
        `<tr>
            <td class="text-right" colspan="10"><b>Total Tax:</b></td>
            <td><b>${toIndianCurrency(total_tax_amount)}</b></td>
        </tr>
        <tr>
            <td class="text-right" colspan="10"><b>Total Amount:</b></td>
            <td><b>${toIndianCurrency(total_item_total_amount)}</b></td>
        </tr>`;
    
    eleTableBody.append(total_rows);
}

function renderItemRow(index, item){
    var render = `` +
        `<tr id='item_${index}'>
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
                <button type="button" class="btn btn-success edit"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger delete"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;

    return render;
}