let id = 0;

const app = {};

document.addEventListener("DOMContentLoaded", function(){
    app.input = document.getElementById("taskName");
    app.list = document.getElementById("taskList");
    app.finishedTaskList = document.getElementById("finishedTaskList");
    app.bottomElemFirst = document.getElementById("bottomElemFirst");
    app.bottomElemSecond = document.getElementById("bottomElemSecond");


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



