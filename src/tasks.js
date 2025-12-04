import {writable, derived} from "svelte/store";

export const tasks = writable([])
export const searchText = writable('');
export const statusFilter = writable('all');

export const filteredTasks = derived(
    [tasks, searchText, statusFilter],
        ([$tasks, $searchText, $statusFilter]) => {

        let result = $tasks;

        if ($searchText !== '') {
            result = result.filter((task) => task.title.includes($searchText));
        }

        if ($statusFilter === 'active') {
            result = result.filter((task) => task.status === false);

        } else if ($statusFilter === 'completed') {
            result = result.filter((task) => task.status === true);
        }

        return result;
    }
);

let nextId = 0;


export const addTask = (text) => {
    if (text === '') return;
    const task = {
        id: nextId,
        title: text,
        status: false,
    };

    nextId = nextId + 1;

    tasks.update((list) =>{
        list.push(task);
        return list;
    });
}

export const removeTask = (id) => {
    tasks.update((list) => {
        return list.filter((task) =>{
            return task.id !== id;
        });
    });
}

export const toggleTask = (id) => {
    tasks.update((list) => {
        return list.map((task) => {
            if (task.id === id) {
                task.status = !task.status;
            }
            return task;
        })
    })
}