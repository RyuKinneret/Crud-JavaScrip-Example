let records = [];

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button');
    button.addEventListener('click', createOrUpdateRecord);

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchRecords);

    loadRecords();
});

function loadRecords() {
    if (localStorage.getItem('records')) {
        records = JSON.parse(localStorage.getItem('records'));
        showRecords();
    }
}

function saveRecords() {
    localStorage.setItem('records', JSON.stringify(records));
}

function createOrUpdateRecord(event) {
    event.preventDefault();
    const button = document.getElementById('button');

    if (button.innerHTML === 'Submit') {
        createRecord();
    } else if (button.innerHTML === 'Update') {
        const id = parseInt(button.dataset.id);
        updateRecord(id);
    }
}

function createRecord() {
    let fullName = document.getElementById('fullName').value;
    let address = document.getElementById('District').value;
    let age = document.getElementById('age').value;
    let city = document.getElementById('city').value;

    let lastRecord = records[records.length - 1];
    let newId = lastRecord ? lastRecord.id + 1 : 1;

    let record = {
        id: newId,
        fullName: fullName,
        address: address,
        age: age,
        city: city
    };

    records.push(record);
    saveRecords();
    showRecords();
    clearForm();
}

function showRecords() {
    let recordsList = document.getElementById('userDetails');
    recordsList.innerHTML = '';

    records.forEach(record => {
        let row = recordsList.insertRow();
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.fullName}</td>
            <td>${record.address}</td>
            <td>${record.age}</td>
            <td>${record.city}</td>
            <td class="edit-cell"><img width="25" height="25" src="/Svg/edit-content.svg" alt="Edit Icon"></td>
            <td class="delete-cell"><img width="25" height="25" src="/Svg/delete-content.svg" alt="Delete Icon"></td>
        `;
    });

    // Agregar eventos de clic a las celdas de edición y eliminación
    let editCells = document.querySelectorAll('.edit-cell');
    editCells.forEach(cell => {
        cell.addEventListener('click', function() {
            let recordId = parseInt(cell.parentElement.cells[0].textContent);
            editRecord(recordId);
        });
    });

    let deleteCells = document.querySelectorAll('.delete-cell');
    deleteCells.forEach(cell => {
        cell.addEventListener('click', function() {
            let recordId = parseInt(cell.parentElement.cells[0].textContent);
            deleteRecord(recordId);
        });
    });
}

function clearForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('District').value = '';
    document.getElementById('age').value = '';
    document.getElementById('city').value = '';
}

function editRecord(id) {
    let record = records.find(record => record.id === parseInt(id));

    if (record) {
        document.getElementById('fullName').value = record.fullName;
        document.getElementById('District').value = record.address;
        document.getElementById('age').value = record.age;
        document.getElementById('city').value = record.city;

        let button = document.getElementById('button');
        button.innerHTML = 'Update';
        button.dataset.id = id;
    }
}

function updateRecord(id) {
    let fullName = document.getElementById('fullName').value;
    let address = document.getElementById('District').value;
    let age = document.getElementById('age').value;
    let city = document.getElementById('city').value;

    let index = records.findIndex(record => record.id === parseInt(id));

    if (index !== -1) {
        records[index] = {
            id: id,
            fullName: fullName,
            address: address,
            age: age,
            city: city
        };

        saveRecords();
        showRecords();
        clearForm();

        let button = document.getElementById('button');
        button.innerHTML = 'Submit';
        button.removeAttribute('data-id');
    }
}

function deleteRecord(id) {
    records = records.filter(record => record.id !== parseInt(id));
    saveRecords();
    showRecords();
}

function searchRecords() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredRecords = records.filter(record => 
        record.fullName.toLowerCase().includes(searchText) ||
        record.address.toLowerCase().includes(searchText) ||
        record.age.toString().includes(searchText) ||
        record.city.toLowerCase().includes(searchText) ||
        record.id.toString().includes(searchText)
    );
    
    let recordsList = document.getElementById('userDetails');
    recordsList.innerHTML = '';

    filteredRecords.forEach(record => {
        let row = recordsList.insertRow();
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.fullName}</td>
            <td>${record.address}</td>
            <td>${record.age}</td>
            <td>${record.city}</td>
            <td class="edit-cell"><img width="25" height="25" src="/Svg/edit-content.svg" alt="Edit Icon"></td>
            <td class="delete-cell"><img width="25" height="25" src="/Svg/delete-content.svg" alt="Delete Icon"></td>
        `;
    });

    // Agregar eventos de clic a las celdas de edición y eliminación
    let editCells = document.querySelectorAll('.edit-cell');
    editCells.forEach(cell => {
        cell.addEventListener('click', function() {
            let recordId = parseInt(cell.parentElement.cells[0].textContent);
            editRecord(recordId);
        });
    });

    let deleteCells = document.querySelectorAll('.delete-cell');
    deleteCells.forEach(cell => {
        cell.addEventListener('click', function() {
            let recordId = parseInt(cell.parentElement.cells[0].textContent);
            deleteRecord(recordId);
        });
    });
}
