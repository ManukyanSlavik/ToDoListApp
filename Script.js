let input;
let list;
let finishedTaskList;
let date;
let id = 0;

window.onload = function(){
    input = document.getElementById("taskName");
    list = document.getElementById("taskList");
    finishedTaskList = document.getElementById("finishedTaskList");

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

        list.appendChild(li);
    }

    input.value = '';
    saveData();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

document.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        if(e.target.parentElement.id == "taskList")
            finishedTaskList.appendChild(e.target);
        else if(e.target.parentElement.id == "finishedTaskList")
            list.appendChild(e.target);
    }
    else if(e.target.tagName === "SPAN")
        e.target.parentElement.remove();

    saveData();
});

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
    // e.target.getElementsByTagName('ul')[0].appendChild(document.getElementById(e.dataTransfer.getData("id")));
    const elemId = e.dataTransfer.getData("id");
    const elem = document.getElementById(elemId);

    elem.classList.toggle("checked");
    console.log(e.target);

    if(elem.classList.contains("checked"))
        finishedTaskList.appendChild(elem);
    else
        list.appendChild(elem);
}