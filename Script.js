let input;
let list;
let finishedTaskList;
let topElemFirst; // ToDo's top element
let topElemSecond; // Finished tasks' top element
let date;
let id = 0;


window.onload = function(){
    input = document.getElementById("taskName");
    list = document.getElementById("taskList");
    finishedTaskList = document.getElementById("finishedTaskList");
    topElemFirst = document.getElementById("topElemFirst");
    topElemSecond = document.getElementById("topElemSecond");
    
    date = new Date();
    const currDate = "Today is " + date.toLocaleDateString();
    document.getElementById("date").textContent = currDate;

    loadData();
};

function addTask(){
    if(input.value === '')
        alert("Input cannot be empty!");
    else{
        let li = document.createElement("li");
        let span = document.createElement("span");

        li.innerHTML = input.value;
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.setAttribute("draggable", true);
        li.setAttribute("ondragstart", "onDragStart(event)")
        li.setAttribute("id", id);
        id++;

        list.prepend(li);
    }

    input.value = '';
    saveData();
}

document.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        if(e.target.parentElement.id == "taskList")
            finishedTaskList.insertBefore(e.target, topElemSecond);
        else if(e.target.parentElement.id == "finishedTaskList")
            list.insertBefore(e.target, topElemFirst);
    }
    else if(e.target.tagName === "SPAN")
        e.target.parentElement.remove();

    saveData();
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

function saveData(){
    localStorage.setItem("toDos", list.innerHTML);
    localStorage.setItem("finished", finishedTaskList.innerHTML);
}
function loadData(){
    list.innerHTML = localStorage.getItem("toDos");
    finishedTaskList.innerHTML = localStorage.getItem("finished");
}

function onDragStart(e){
    e.dataTransfer.setData("id", e.target.id);
}
function dragOverHandler(e){
    e.preventDefault();
}
function dropHandler(e){
    e.preventDefault(); 
    const elemId = e.dataTransfer.getData("id");
    const elem = document.getElementById(elemId);
    
    if(e.target.id === "topElemFirst"){
        if(elem.classList.contains("checked"))
            elem.classList.remove("checked");
        
        list.insertBefore(elem, e.target);
    }
    else if(e.target.id === "topElemSecond"){
        if(!elem.classList.contains("checked"))
            elem.classList.add("checked");
        
        finishedTaskList.insertBefore(elem, e.target);
    }
}