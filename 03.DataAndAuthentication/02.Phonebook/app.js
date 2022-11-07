function attachEvents() {
    const initUrl='http://localhost:3030/jsonstore/phonebook';
    const ulEl=document.getElementById('phonebook');

    const loadBtn=document.getElementById('btnLoad');
  loadBtn.addEventListener('click',load)
  async function load(){
    ulEl.innerHTML='';
    let response=await fetch(initUrl);
    let data=await response.json();
    for (const contact of Object.values(data)) {
        let liEl=document.createElement('li');
        liEl.textContent=`${contact.person}: ${contact.phone}`;
        liEl.id=contact._id;
        let deleteBtn=document.createElement('button');
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener('click',async(e)=>{
            let id=e.target.parentElement.id;
            await fetch(`${initUrl}/${id}`,{
                method:'delete'
            })
            document.getElementById(id).remove();
        });
        liEl.appendChild(deleteBtn)     
        ulEl.appendChild(liEl);
    }
  }
  const createBtn=document.getElementById('btnCreate')
  .addEventListener('click',async()=>{
    let personEl=document.getElementById('person');
    let phoneEl=document.getElementById('phone');
        let newContact={
            "person":personEl.value,
            "phone":phoneEl.value
        }
        await fetch(initUrl,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newContact)
        })
    personEl.value="";
    phoneEl.value="";
    load();
  })
}

attachEvents();