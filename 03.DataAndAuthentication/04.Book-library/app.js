const initUrl='http://localhost:3030/jsonstore/collections/books';

const loadBtn=document.getElementById('loadBooks')
    .addEventListener('click',loadBooks);
let tBodyEl=document.getElementsByTagName('tbody')[0];

async function loadBooks(){
    //clear the table
    tBodyEl.innerHTML="";
 const response=await fetch(initUrl);
        const data=await response.json();

       for (const book of Object.entries(data)) {
        //console.log(book[0]);
        let trBook=document.createElement('tr');
        
        let tdTitle=document.createElement('td');
        tdTitle.textContent=book[1].title;
        let tdAuthor=document.createElement('td');
        tdAuthor.textContent=book[1].author;

        let editBtn=document.createElement('button');
        editBtn.textContent='Edit';
        editBtn.setAttribute('id',book[0]);
        editBtn.addEventListener('click',editBook);

        let deleteBtn=document.createElement('button');
        deleteBtn.textContent='Delete';
        deleteBtn.setAttribute('id',book[0]);

        let tdButtons=document.createElement('td');
        tdButtons.appendChild(editBtn);
        tdButtons.appendChild(deleteBtn);

        trBook.appendChild(tdTitle);
        trBook.appendChild(tdAuthor);
        trBook.appendChild(tdButtons);
        tBodyEl.appendChild(trBook);
       }
}

async function editBook(e){
    //TO-DO: Implement functionality

    formEl.children[0].textContent='Edit FORM';
   console.log(e.target.parentElement
    .parentElement.children[1].textContent);
   let author=e.target.parentElement
   .parentElement.children[1].textContent;

   let title=e.target.parentElement
   .parentElement.children[0].textContent;

   formEl.children[2].value=title;
   formEl.children[4].value=author;

   formEl.children[5].textContent="Save";
   formEl.children[5].addEventListener('click',async ()=>{
   if(formEl.children[5].textContent=="Save") {
    //put request
    let id=editBook();
    // console.log(id);
     let newAutor=formEl.children[4].value;
     let newTitle=formEl.children[2].value;
     if(newAutor==''||newTitle==''){
         return;
     }
     let editedBook={
         'author':newAutor,
         'title':newTitle
     }
 await fetch(`${initUrl}/${id}`,{
     method:'put',
     headers:{
         'Content-Type':'application/json'
     },
     body:JSON.stringify(editedBook)
 })
 //old style
 loadBooks();
 formEl.children[0].textContent='FORM';
 formEl.reset();
 formEl.children[5].textContent="Sumbit";
   }

   })
    console.log(e.target.id);
}

const formEl=document.getElementsByTagName('form')[0];
formEl.addEventListener('submit',async (e)=>{
e.preventDefault();
    let data=new FormData(formEl);
    let bookObj=Object.fromEntries(data.entries());
    if(Object.values(bookObj).includes('')){
       return;
    }
    //no empty fields
    if(formEl.children[5].textContent=="Submit"){
        await fetch(initUrl,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(bookObj)
        })
        loadBooks();
        formEl.reset();
    }
    
})