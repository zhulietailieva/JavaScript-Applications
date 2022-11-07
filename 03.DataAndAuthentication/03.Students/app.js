const initUrl='http://localhost:3030/jsonstore/collections/students';

const formEl=document.getElementById('form');
const tableEl=document.getElementById('results');

async function getStudents(){
    tableEl.children[1].innerHTML='';
    let response=await fetch(initUrl);
    let data=await response.json();
for (const student of Object.values(data)) {
   // console.log(student);
    let fName=student.firstName;
    let lName=student.lastName;
    let facultyNumber=student.facultyNumber;
    let grade=student.grade;
    let id=student._id;
    
    let trStudent=document.createElement('tr');
    
    let tdFName=document.createElement('td');
    tdFName.textContent=fName;
    let tdLName=document.createElement('td');
    tdLName.textContent=lName;
    let tdFNumber=document.createElement('td');
    tdFNumber.textContent=facultyNumber;
    let tdGrade=document.createElement('td');
    tdGrade.textContent=grade; 

    trStudent.appendChild(tdFName);
    trStudent.appendChild(tdLName);
    trStudent.appendChild(tdFNumber);
    trStudent.appendChild(tdGrade);

    tableEl.children[1].appendChild(trStudent);
}

}
getStudents();
formEl.addEventListener('submit',async(e)=>{
e.preventDefault();
let data=new FormData(form);
let studentObj=Object.fromEntries(data.entries());
if(Object.values(studentObj).includes('')){
    return;
}
//no epmty values
//console.log(studentObj);
await fetch(initUrl,{
    method:'post',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(studentObj)
})
getStudents();
//clear inp fields
formEl.reset();
})