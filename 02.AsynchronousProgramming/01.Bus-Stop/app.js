async function getInfo() {
    let stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const stopsList = document.getElementById('buses');

    try {
        let result = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);
        stopsList.innerHTML = '';
        let data = await result.json();

        stopName.textContent = data.name;
        for (const bus in data.buses) {
            let liEl = document.createElement('li');
            liEl.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
            stopsList.appendChild(liEl);
        }
    } catch (error) {
        stopName.textContent = 'Error';
        stopsList.innerHTML = '';
    }
}