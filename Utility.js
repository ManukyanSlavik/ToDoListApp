function buildTask(taskName){
    let li = document.createElement("li");
    let span = document.createElement("span");
    
    li.innerHTML = taskName;
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    li.setAttribute("draggable", true);
    li.setAttribute("ondragstart", "onDragStart(event)");
    li.setAttribute("class", "task");
    li.setAttribute("id", id);
    id++;

    return li;
}