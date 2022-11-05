function solve() {
    const url=`http://localhost:3030/jsonstore/bus/schedule/depot`;
    const departBtn=document.getElementById('depart');
    const arriveBtn=document.getElementById('arrive');
    const infoEl=document.getElementById('info');
    async function depart() {
       let response =await fetch(url);
       let data= await response.json();
        infoEl.textContent=`Next stop ${data.name}`;

       departBtn.disabled='true';
       arriveBtn.removeAttribute('disabled');
    }

    function arrive() {
        infoEl.textContent=`Arriving at ${data.name}`;

        departBtn.removeAttribute('disabled');
        arriveBtn.disabled='true';
    }

    return {
        depart,
        arrive
    };
}

let result = solve();