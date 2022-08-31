const tasks =JSON.parse(localStorage.getItem('allTasks'));

const render =(data)=>{
    const element = document.getElementById("content");
    element.innerHTML ='';
    data.map((val, key)=>{
        element.innerHTML += `
        <div class="card border-0 shadow-sm mt-3">
        <div class="card-body">
        <h4 class="task-capitalize">${val.todo}</h4>
        <button class="btn" onclick="edit(${key})"><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>Edit</button>
        <button class="btn" onclick="trash(${key})"><i class="fa-solid fa-trash-can" aria-hidden="true"></i>Trash</button>
        <span class="badge float-end ${
            val.status =='pending'? "bg-secondary"
            :val.status =='in-progress'? "bg-warning": "bg-success" 
            }">${val.status}</span>
        </div>
        </div>
        `  
    });
   localStorage.setItem('allTasks' , JSON.stringify(data));
}

render(tasks);


var addModal = new bootstrap.Modal(document.getElementById('addModal'))
var editModal = new bootstrap.Modal(document.getElementById('editModal'))

document.getElementById("addform").addEventListener("submit", (e)=>{
    e.preventDefault();
    let todo= document.getElementById("addtask").value;
   tasks.push({todo:todo, status:'pending'})
   render(tasks);
  document.getElementById("addtask").value ='',
   addModal.hide();
})

// edit
const edit=(id)=>{
    editModal.show();
    document.getElementById("edittask").value=tasks[id].todo
    document.getElementById("editStatus").value=tasks[id].status
    document.getElementById("taskId").value=id
    //localStorage.setItem("taskId", id);
}


//save edit

document.getElementById("editform").addEventListener("submit", (e)=>{
    e.preventDefault();
    let todo= document.getElementById("edittask").value;
    let status= document.getElementById("editStatus").value;
    let id= document.getElementById("taskId").value;
    // let id = localStorage.getItem("taskId")
  tasks[id].todo=todo;
  tasks[id].status=status;
//    tasks.push({todo:todo, status:'pending'})
   render(tasks);
   document.getElementById("success").innerHTML='Changes Made!'
//    editModal.toggle();
})

//trash
const trash =(id)=>{
    if(confirm("Are you sure you want to delete this task?")){
        
    }
    tasks.splice(id, 1)
    render(tasks);
}

