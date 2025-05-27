function saveData(){
    let data = [...app.list.children]
                .filter(el => el.tagName === "LI" && !el.classList.contains("bottomElem"))
                .map(li => {
                    return li.textContent.slice(0, -1).trim(); // slice() is to remove the <span> at the end.
                });

    localStorage.setItem("toDos", data);

    data = [...app.finishedTaskList.children]
            .filter(el => el.tagName === "LI" && !el.classList.contains("bottomElem"))
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