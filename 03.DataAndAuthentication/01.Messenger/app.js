function attachEvents() {
    const initUrl='http://localhost:3030/jsonstore/messenger';  
    let messages=document.getElementById('messages');

    const postBtn=document.getElementById('submit')
    .addEventListener('click',async ()=>{
        let author=document.getElementsByTagName('input')[0].value;
        let content=document.getElementsByTagName('input')[1].value;
        let message={
            author:author,
            content:content
        };
        await fetch(initUrl,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(message)
        })
    })
    const refreshBtn=document.getElementById('refresh')
    .addEventListener('click',async ()=>{
        let response=await fetch(initUrl);
        let data=await response.json();
        let res=[];
        for (const item of Object.values(data)) {
            console.log(item);
           let currUser=`${item.author}: ${item.content}`;
            res.push(currUser);
        }
        messages.value=res.join('\n');
    })
}

attachEvents();