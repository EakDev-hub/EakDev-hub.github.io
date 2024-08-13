function flattenObject(obj, parent = '', res = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const propName = parent ? `${parent}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                flattenObject(obj[key], propName, res);
            } else {
                res[propName] = obj[key];
            }
        }
    }
    return res;
}

function generateTable() {
    const jsonInput = document.getElementById('jsonInput').value.trim();
    let jsonData;

    try {
        jsonData = JSON.parse(jsonInput);
    } catch (e) {
        alert("Invalid JSON. Please check your input.");
        return;
    }

    const tableBody = document.querySelector("#jsonTable tbody");

    // Clear any existing table content
    tableBody.innerHTML = "";

    // Flatten the object
    const flattenedData = flattenObject(jsonData);

    // Create table rows for each key-value pair
    for (let key in flattenedData) {
        if (flattenedData.hasOwnProperty(key)) {
            const tr = document.createElement("tr");

            // Key cell
            const keyCell = document.createElement("td");
            keyCell.textContent = key;
            tr.appendChild(keyCell);

            // Value cell
            const valueCell = document.createElement("td");
            valueCell.textContent = flattenedData[key];
            tr.appendChild(valueCell);

            tableBody.appendChild(tr);
        }
    }
}
