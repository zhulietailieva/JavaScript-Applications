function solve() {
    const initUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    let stopId = 'depot';
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    const infoEl = document.querySelector('.response');
   
    let stopName = '';

    async function depart() {
        let response = await fetch(`${initUrl}/${stopId}`);
        let data = await response.json();
        stopName = data.name;

        infoEl.textContent = `Next stop ${stopName}`;
        stopId = data.next;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        infoEl.textContent = `Arriving at ${stopName}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let data = solve();