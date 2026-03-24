let editIndex=-1;

let students=
JSON.parse(localStorage.getItem("students"))||[];

function addStudent(){
    let id= document.getElementById("id").value.trim();
    let name= document.getElementById("name").value.trim();
    let age= document.getElementById("age").value.trim();
    let branch= document.getElementById("branch").value.trim();
   
     

    if(!id||!name||!age||!branch){
        alert("please enter all details");
        return;
    }

    if(editIndex===-1){

    

    let exists=students.some(s=>s.id==id);

    if(exists){
        alert("ID already exists");
        return;
    }
    
     let student= {id, name, age,branch};
    students.push(student);
   }else{
      students[editIndex]={id,name,age,branch};
      editIndex=-1;

      document.getElementById("btn").innerText="Add Student";
    }
 

    localStorage.setItem("students",
    JSON.stringify(students));

    displayStudents();

    document.getElementById("id").value="";
    document.getElementById("name").value="";
    document.getElementById("age").value="";
    document.getElementById("branch").value="";


}
function displayStudents(){
    let table= document.getElementById("tableBody");
    table.innerHTML="";

    students.forEach((s,index) => {
        table.innerHTML+=`
    <tr>
    <td>${s.id}</td>
    <td>${s.name}</td>
    <td>${s.age}</td>
    <td>${s.branch}</td>
    <td>
    <button class="edit-btn" onClick="editStudent(${index})">Edit</button>
    <button class="del-btn" onClick="deleteStudent(${index})">Delete</button>
    </td>
    </tr>
    `;

    });
}
function deleteStudent(index){
    if(confirm("Are you sure?")){
    students.splice(index, 1);

     localStorage.setItem("students",
    JSON.stringify(students));

    displayStudents();
     }
}

function searchStudent(){
    let word=document.getElementById("search").value.toLowerCase();
     
    let table= document.getElementById("tableBody");
    table.innerHTML="";

    students.forEach((s,index) => {
        if(s.name.toLowerCase().includes(word)){
        table.innerHTML+=`
    <tr>
    <td>${s.id}</td>
    <td>${s.name}</td>
    <td>${s.age}</td>
    <td>${s.branch}</td>
    <td><button onClick="deleteStudent(${index})">Delete</button></td>
    </tr>
    `;
        }

    });
}

function editStudent(index){
    let s=students[index];
    document.getElementById("id").value=s.id;
    document.getElementById("name").value=s.name;
    document.getElementById("age").value=s.age;
    document.getElementById("branch").value=s.branch;


    editIndex=index;

    document.getElementById("btn").innerText="Update Student";
}

function sortByName(){
    students.sort((a,b)=>a.name.localeCompare(b.name));

    localStorage.setItem("students",
    JSON.stringify(students));

    displayStudents();
}

function sortByAge(){
    students.sort((a,b)=>a.age-b.age);

      localStorage.setItem("students",
    JSON.stringify(students));

    displayStudents();
}
displayStudents();