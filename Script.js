let input;
let list;
let finishedTaskList;
let date;

window.onload = function(){
    input = document.getElementById("taskName");
    list = document.getElementById("taskList");
    finishedTaskList = document.getElementById("finishedTaskList");

    date = new Date();
    const currDate = "Today is " + date.toLocaleDateString();
    document.getElementById("date").textContent = currDate;
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

        list.appendChild(li);
    }

    input.value = '';
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
});