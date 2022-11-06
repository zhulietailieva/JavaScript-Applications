async function lockedProfile() {
   const initUrl='http://localhost:3030/jsonstore/advanced/profiles';
   
    let response=await fetch(initUrl);
    let data=await response.json();

    let mainEl=document.getElementById('main');
    let profileDiv=document.getElementsByClassName('profile')[0];

    for (const item of Object.entries(data)) {
        let newProfile=profileDiv.cloneNode(true);  
        newProfile.children[8].value=item[1].username;
        newProfile.children[9].children[2].value=item[1].email;
        newProfile.children[9].children[4].value=item[1].age;
        newProfile.children[9].style.display='none';
        mainEl.appendChild(newProfile);
    }
    mainEl.removeChild(profileDiv);
    const buttons=document.querySelectorAll('button');
    for (const button of buttons) {
        button.addEventListener('click',unclockProfile)
    }   
    function unclockProfile(e){
       if(!e.target.parentElement.children[2].checked
        &&e.target.textContent!="Hide it"){
        //profile is unlocked
        e.target.parentElement.children[9].style.display='block';
        e.target.textContent="Hide it";
       }
       else if(!e.target.parentElement.children[2].checked
        &&e.target.textContent=="Hide it"){
            //hide info
            e.target.parentElement.children[9].style.display='none';
            e.target.textContent="Show more";
        }
    }
}