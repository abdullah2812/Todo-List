//elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{ 
    let userEnteredValue = inputBox.value;//untuk mendapatkan value yang sudah diinput
    if (userEnteredValue.trim() != 0){//mengecek value apakah sudah diinput
        addBtn.classList.add("active");//active btn
    }else{
        addBtn.classList.remove("active");//unactive btn
    }
}

showTasks(); //call func showTasks

addBtn.onclick = () =>{//ketika user click button +
    let userEnteredValue = inputBox.value; //mengambil value yang diinput
    let getLocalStorageData = localStorage.getItem("New Todo");//membuat localstorage
    if(getLocalStorageData == null){//mengecek apakah data kosong
        listArray = [];//membuat array kosong
    }else{
        listArray = JSON.parse(getLocalStorageData);//mengubah json string ke json object
    }
    listArray.push(userEnteredValue);//menambahkan data value ke array
    localStorage.setItem("New Todo", JSON.stringify(listArray));//mengubah json object ke json array
    showTasks();
    addBtn.classList.remove("active");//unactive btn
}
function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

deleteAllBtn.onclick = ()=>{
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorageData);
        listArray= [];
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}


