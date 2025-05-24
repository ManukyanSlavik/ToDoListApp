const input = document.getElementById("input");
const list = document.getElementById("taskList");

window.onload = function(){
    const date = new Date();
        const currDate = "Today is " + date.toLocaleDateString();
        console.log(currDate)
        document.getElementById("date").textContent = currDate;
};

function addTask(){
    if(input.value === ''){
        alert("Input cannot be empty!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = input.value;
        list.appendChild(li);
    }
}