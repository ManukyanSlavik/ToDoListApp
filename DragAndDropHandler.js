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

    saveData();
}