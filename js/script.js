var selectedRow = null;

function onFormSubmit(){
    console.log(formData);
    if(validate()){
        var formData = readFormData();
        console.log(formData);
        if(selectedRow == null){
            insertNewRecord(formData);
        }else{
            updateRecord(formData);
        }
        
        resetForm();
    }
}

function readFormData(){

    var formData = {};
    formData["nomComplet"] = document.getElementById("nomComplet").value;
    formData["code"] = document.getElementById("code").value;
    formData["genre"] = document.getElementById("genre").value;
    formData["adresse"] = document.getElementById("adresse").value;
    formData["contact"] = document.getElementById("contact").value;
    formData["unite"] = document.getElementById("unite").value;

    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell2 = newRow.insertCell(0);
    cell2.innerHTML = data.code;

    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.nomComplet;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.genre;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.adresse;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.contact;

    cell4 = newRow.insertCell(5);
    cell4.innerHTML = data.unite;

    cell4 = newRow.insertCell(6);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a  onClick="onDelete(this)">Delete</a>`;
}

function resetForm(){
    document.getElementById('code').value = '';
    document.getElementById('nomComplet').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('adresse').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('unite').value = '';
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('code').value = selectedRow.cells[0].innerHTML;
    document.getElementById('nomComplet').value = selectedRow.cells[1].innerHTML;
    document.getElementById('genre').value = selectedRow.cells[2].innerHTML;
    document.getElementById('adresse').value = selectedRow.cells[3].innerHTML;
    document.getElementById('contact').value = selectedRow.cells[4].innerHTML;
    document.getElementById('unite').value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData){

    selectedRow.cells[0].innerHTML = formData.code;
    selectedRow.cells[1].innerHTML = formData.nomComplet;
    selectedRow.cells[2].innerHTML = formData.genre;
    selectedRow.cells[3].innerHTML = formData.adresse;
    selectedRow.cells[4].innerHTML = formData.contact;
    selectedRow.cells[5].innerHTML = formData.unite;

}

function onDelete(td){
    if(confirm('vous etes sur de vouloir suprimer?')){
        row = td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }
    
}

function validate(){
    isValid = true;
    if(document.getElementById('nomComplet').value == ""){
        isValid = false;
        document.getElementById('nomCompletValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('nomCompletValidationError').classList.remove("hide")){
            document.getElementById('nomCompletValidationError').classList.add("hide");
        }
    }

    return isValid;
}