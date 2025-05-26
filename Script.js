let id = 0;

const app = {};

document.addEventListener("DOMContentLoaded", function(){
    app.input = document.getElementById("taskName");
    app.list = document.getElementById("taskList");
    app.finishedTaskList = document.getElementById("finishedTaskList");
    app.topElemFirst = document.getElementById("bottomElemFirst");
    app.topElemSecond = document.getElementById("bottomElemSecond");

    // app.list.prepend(localStorage.getItem("topElem"));

    date = new Date();
    const currDate = "Today is " + date.toLocaleDateString();
    document.getElementById("date").textContent = currDate;

    loadData();
});



function addTask(){
    if(app.input.value === '')
        alert("Input cannot be empty!");
    else{
        let li = document.createElement("li");
        let span = document.createElement("span");

        li.innerHTML = app.input.value;
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.setAttribute("draggable", true);
        li.setAttribute("ondragstart", "onDragStart(event)");
        li.setAttribute("id", id);
        id++;

        app.list.prepend(li);
    }

    app.input.value = '';
    saveData();
}

document.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        if(e.target.parentElement.id == "taskList")
            app.finishedTaskList.prepend(e.target);
        else if(e.target.parentElement.id == "finishedTaskList")
            app.list.prepend(e.target);
        
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

function saveData(){
    let data = [...app.list.children]
                .filter(el => el.tagName === "LI" && el.getAttribute("class") !== "bottomElem")
                .map(li => {
                    let tmp = li.textContent.slice(0, -1).trim();
                    return tmp; 
                });

    localStorage.setItem("toDos", data);

    data = [...app.finishedTaskList.children]
            .filter(el => el.tagName === "LI" && el.getAttribute("class") !== "bottomElem")
            .map(li => {
                let tmp = li.textContent.slice(0, -1).trim();
                return tmp; 
            });

    localStorage.setItem("finished", data);
}
function loadData(){
    //TODO: Extract this shit into a separate function it looks horrendous.
    let data = localStorage.getItem("toDos").split(',');


    for (let i = 0; i < data.length; i++){
        let li = document.createElement("li");
        let span = document.createElement("span");

        li.innerHTML = data[i];
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.setAttribute("draggable", true);
        li.setAttribute("ondragstart", "onDragStart(event)");
        li.setAttribute("id", id);
        id++;

        app.list.prepend(li);
    }

    data = localStorage.getItem("finished");
    console.log(data);

    for (let i = 0; i < data.length; i++){
        let li = document.createElement("li");
        let span = document.createElement("span");

        li.innerHTML = data[i];
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.setAttribute("draggable", true);
        li.setAttribute("ondragstart", "onDragStart(event)");
        li.setAttribute("id", id);
        id++;

        app.finishedTaskList.prepend(li);
    }
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
    console.log("The id is: " + elemId);
    if(e.target.id === "bottomElemFirst"){
        if(elem.classList.contains("checked"))
            elem.classList.remove("checked");
        
        app.list.insertBefore(elem, e.target);
    }
    else if(e.target.id === "bottomElemSecond"){
        if(!elem.classList.contains("checked"))
            elem.classList.add("checked");
        
        app.finishedTaskList.insertBefore(elem, e.target);
    }
}