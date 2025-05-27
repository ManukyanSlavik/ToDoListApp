let id = 0;

const app = {};

document.addEventListener("DOMContentLoaded", function(){
    app.input = document.getElementById("taskName");
    app.list = document.getElementById("taskList");
    app.finishedTaskList = document.getElementById("finishedTaskList");
    app.topElemFirst = document.getElementById("bottomElemFirst");
    app.topElemSecond = document.getElementById("bottomElemSecond");


    date = new Date();
    const currDate = "Today is " + date.toLocaleDateString();
    document.getElementById("date").textContent = currDate;

    loadData();
});


function addTask(){
    if(app.input.value === '')
        alert("Input cannot be empty!");
    else{
        let li = buildTask(app.input.value);

        app.list.prepend(li);
    }

    app.input.value = "";
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
                    return li.textContent.slice(0, -1).trim(); // slice() is to remove the <span> at the end.
                });

    localStorage.setItem("toDos", data);

    data = [...app.finishedTaskList.children]
            .filter(el => el.tagName === "LI" && el.getAttribute("class") !== "bottomElem")
            .map(li => {
                return li.textContent.slice(0, -1).trim(); // slice() is to remove the <span> at the end.
            });

    localStorage.setItem("finished", data);
}
function loadData(){
    let data = localStorage.getItem("toDos");
    if (data !== null && data !== ''){
        data = data.split(','); 
    
        for (let i = 0; i < data.length; i++){
            let li = buildTask(data[i]);
    
            app.list.prepend(li);
        }
    }

    data = localStorage.getItem("finished");
    if (data !== null && data !== ''){
        data = data.split(',');
    
        for (let i = 0; i < data.length; i++){
            let li = buildTask(data[i]);

            li.classList.toggle("checked");
    
            app.finishedTaskList.prepend(li);
        }
    }
}

