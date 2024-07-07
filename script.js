const url = "https://todo-crudl.deno.dev/shaadsajjad/todos"
const todoInput = document.getElementById("todoinput");
const inputBtn = document.getElementById("inputbtn")
const todoList = document.getElementById("todo-list")
const progressList = document.getElementById("progress-list")
const completeList = document.getElementById("complete-list")
todoInput.addEventListener("input", () => {
    const errorMsg = document.getElementById("error-msg")
    errorMsg.classList.add("hidden")
})
inputBtn.addEventListener("click", async () => {

    const a = todoInput.value
    if(a=="") {
        const errorMsg = document.getElementById("error-msg")
        errorMsg.classList.remove("hidden")
        errorMsg.innerHTML = "String must contain at least 1 character(s)"
        return
    }
    const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            title: a
        })
    })
    show()

    if (!request.ok) {
        //     console.log(request)
        // const res =await request.json()
        // console.log(res)
        const errorMsg = document.getElementById("error-msg")
        errorMsg.classList.remove("hidden")
        const data = await request.json()
        const error = data.fieldErrors.title[0];
        console.log(error)
        errorMsg.innerHTML = error
        console.log(errorMsg);
    }
    todoInput.value=''
})
var data = [];
async function show() {
    //     const todoContainer=document.getElementsByClassName("todoContainer")
    //     console.log(todoContainer)
    // todoContainer.innerText=""
    document.getElementById("todo-list").innerHTML = ''
    document.getElementById("progress-list").innerHTML = ''
    document.getElementById("complete-list").innerHTML=''

    data = []
    const response = await fetch(url);
    data = await response.json();
    for (let i = 0; i < data.length; i++) {
        if (data[i].status === "todo") {
            console.log(data[i].status)
            const todos = document.createElement("div");

            todos.classList.add("mb-3", "p-2", "todoContainer")
            todos.classList.add("flex", "justify-between")
            const checkBox = document.createElement("input");
            const title = document.createElement("p");
            const cross = document.createElement("img");
            cross.src = "/images/th.jpeg"
            checkBox.type = "checkbox"
            cross.classList.add("w-[15px]", "h-10px")
            checkBox.addEventListener("input", () => changeStatus(i));
            cross.addEventListener("click", () => deleted(i));

            title.innerHTML = data[i].title
            todoList.appendChild(todos)
            todos.appendChild(checkBox)
            todos.appendChild(title)
            todos.appendChild(cross)
        }
        else if (data[i].status === "pending") {
            const todos = document.createElement("div");

            todos.classList.add("mb-3", "p-2", "todoContainer")
            todos.classList.add("flex", "justify-between")
            const checkBox = document.createElement("input");
            const title = document.createElement("p");
            const cross = document.createElement("img");
            cross.src = "/images/th.jpeg"
            checkBox.type = "checkbox"
            cross.classList.add("w-[15px]", "h-10px")
            checkBox.addEventListener("input", () => changeStatus(i));
            cross.addEventListener("click", () => deleted(i));

            title.innerHTML = data[i].title
            progressList.appendChild(todos)
            todos.appendChild(checkBox)
            todos.appendChild(title)
            todos.appendChild(cross)
        }
        else {
            const todos = document.createElement("div");

            todos.classList.add("mb-3", "p-2", "todoContainer")
            todos.classList.add("flex", "justify-between")
            // const checkBox = document.createElement("input");
            const title = document.createElement("p");
            const cross = document.createElement("img");
            cross.src = "/images/th.jpeg"
            // checkBox.type = "checkbox"
             cross.classList.add("w-[15px]", "h-10px")
            // checkBox.addEventListener("input", () => changeStatus(i));
            cross.addEventListener("click", () => deleted(i));

            title.innerHTML = data[i].title
            completeList.appendChild(todos)
            // todos.appendChild(checkBox)
            todos.appendChild(title)
            todos.appendChild(cross)
        }
    }
}

show();
async function deleted(number) {
    console.log(number)
    const url2 = `https://todo-crudl.deno.dev/shaadsajjad/todos/${data[number].id}`
    const response = await fetch(url2, {
        method: "delete",
        body: JSON.stringify({
            id: data[number].id,
        })
    });
    console.log(data[number].id)
    show();
}
async function changeStatus(number) {
    const url2 = `https://todo-crudl.deno.dev/shaadsajjad/todos/${data[number].id}`
    if (data[number].status == "pending") {
        const response = await fetch(url2, {
            method: "put",
            body: JSON.stringify({
                status: "complete"
            })
        });
    }
    else {
        const response = await fetch(url2, {
            method: "put",
            body: JSON.stringify({
                status: "pending"
            })
        });
    }
    console.log(data[number].id)
    show();
}


