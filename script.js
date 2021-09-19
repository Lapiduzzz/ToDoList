const input = document.querySelector('.input')
const list = document.querySelector('.list')
let tasks

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

input.addEventListener('focus', () => {input.classList.add('focus')})
input.addEventListener('blur', () => input.classList.remove('focus'))
input.addEventListener('change', (e) => addTask(e))

const templateTask = (task, index) => {
    return ` <div class="list-item" style="opacity: ${task.completed ? 0.5 : 1}">
                <input type="checkbox" class="completed" onclick="completedTask(${index})" ${task.completed ? 'checked' : ''}>
                <p class="list-text">${task.text}</p>
                <img src="http://cdn.onlinewebfonts.com/svg/img_233606.png" class="delete" onclick="removeTask(${index})">
             </div>`
}

const filterTask = () =>{
    const activeTask = tasks.filter(el => el.completed === false)
    const completedTask = tasks.filter(el => el.completed === true)
    tasks = [...activeTask, ...completedTask]
}

const fillTasksList = () => {
    list.innerHTML = ''
    if (tasks.length > 0) {
        filterTask()
        tasks.forEach((item, index) => {
            list.innerHTML += templateTask(item, index)
        })
        input.value = ''
    }
}
fillTasksList()

const updateStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = (e) => {
    tasks.push({text: e.target.value, completed: false})
    updateStorage()
    fillTasksList()
}

const completedTask = (index) => {
    tasks[index].completed = !tasks[index].completed
    updateStorage()
    fillTasksList()
}

const removeTask = (index) =>{
    let listItem = document.querySelectorAll('.list-item')
    listItem[index].classList.add('del')
    setTimeout(() => {
        tasks.splice(index,1)
        updateStorage()
        fillTasksList()
    }, 300);
}
