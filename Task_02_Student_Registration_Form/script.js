var selectedRow = null
function onFormSubmit(e) {
    event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null)
        {
            insertNewRecord(formData);
		}
        else
        {
            updateRecord(formData);
		}
        resetForm();    
    }
 
function readFormData() {
    var formData = {};
    formData["FName"] = document.getElementById("FName").value;
    formData["LName"] = document.getElementById("LName").value;
    formData["Contact"] = document.getElementById("Contact").value;
    formData["Email"] = document.getElementById("Email").value;
    formData["Branch"] = document.getElementById("Branch").value;
    formData["DOB"] = document.getElementById("DOB").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.FName;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.LName;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.Contact;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.Email;
    cell5= newRow.insertCell(4);
        cell5.innerHTML = data.Branch;
    cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.DOB;
    cell6 =newRow.insertCell(6);
        cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("FName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("LName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Contact").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Branch").value = selectedRow.cells[4].innerHTML;
    document.getElementById("DOB").value = selectedRow.cells[5].innerHTML;

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.FName;
    selectedRow.cells[1].innerHTML = formData.LName;
    selectedRow.cells[2].innerHTML = formData.Contact;
    selectedRow.cells[3].innerHTML = formData.Email;
    selectedRow.cells[4].innerHTML = formData.Branch;
    selectedRow.cells[5].innerHTML = formData.DOB;
}

function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('studentList').deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("FName").value = '';
    document.getElementById("LName").value = '';
    document.getElementById("Contact").value = '';
    document.getElementById("Email").value = '';
    document.getElementById("Branch").value = '';
    document.getElementById("DOB").value = '';
  
    selectedRow = null;
}