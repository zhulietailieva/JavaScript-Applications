const initUrl='http://localhost:3030/jsonstore/collections/students';

const formEl=document.getElementById('form');
const tableEl=document.getElementById('results');

async function getStudents(){
    let response=await fetch(initUrl);
    let data=await response.json();
for (const student of Object.values(data)) {
    console.log(student);
    let fName=student.firstName;
    let lName=student.lastName;
    let facultyNumber=student.facultyNumber;
    let grade=student.grade;
    let id=student._id;
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
//clear inp fields
})