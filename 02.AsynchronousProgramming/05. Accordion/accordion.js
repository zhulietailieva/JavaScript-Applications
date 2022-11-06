async function solution() {
    const url='http://localhost:3030/jsonstore/advanced/articles/list';
    const additionalUrl='http://localhost:3030/jsonstore/advanced/articles/details/';
    let response = await fetch(url);
    let data=await response.json();
   
    const mainSection=document.getElementById('main');

    for (const item of Object.entries(data) ) {
        let mainDiv=document.createElement('div');
        mainDiv.classList.add('accordion');

        let headDiv=document.createElement('div');
        headDiv.classList.add('head');
        
        let titleSpan=document.createElement('span');
       
        titleSpan.textContent=item[1].title;

        let btn=document.createElement('button');
        btn.classList.add('button');
        btn.textContent="More";
        btn.setAttribute('id',item[1]._id);
        

        let extraDiv=document.createElement('div');
        extraDiv.classList.add('extra');
        let pEl=document.createElement('p');

        let response2=await fetch(`${additionalUrl}${item[1]._id}`)
        let additionalData=await response2.json();
        pEl.textContent=additionalData.content;
        extraDiv.appendChild(pEl);

        btn.addEventListener('click',moreInfo)
                //append
        extraDiv.appendChild(pEl);

        headDiv.appendChild(titleSpan);
        headDiv.appendChild(btn);
        
        mainDiv.appendChild(headDiv);
        mainDiv.appendChild(extraDiv);
        console.log(mainDiv);
        mainSection.appendChild(mainDiv);
        async function moreInfo(e){
            e.preventDefault();
                if(btn.textContent=="More"){
                   extraDiv.style.display='block';
                    btn.textContent="Show less";
                }
                else if(btn.textContent=="Show less"){
                    extraDiv.style.display='none';
                    btn.textContent="More";
                }
            }
        }
    }
   


solution();