import {writable, derived} from "svelte/store";

export const tasks = writable([])
export const searchText = writable('');
export const statusFilter = writable('all');

export const filteredTasks = derived(
    [tasks, searchText, statusFilter],
    function ([$tasks, $searchText, $statusFilter]) {

        let result = $tasks;

        if ($searchText !== '') {
            result = result.filter(function(task){
                return task.title.includes($searchText);
            });
        }

        if ($statusFilter === 'active') {
            result = result.filter(function(task){
                return task.status === false;
            });
        } else if ($statusFilter === 'completed') {
            result = result.filter(function (task) {
                return task.status === true;
            });
        }

        return result;
    }
)

let nextId = 0;


export function addTask(text) {
    if (text === '') return;
    const task = {
        id: nextId,
        title: text,
        status: false,
    };

    nextId = nextId + 1;

    tasks.update(function(list){
        list.push(task);
        return list;
    });
}

export function removeTask(id) {
    tasks.update(function(list){
        return list.filter(function(task){
            return task.id !== id;
        });
    });
}

export function toggleTask(id) {
    tasks.update(function(list){
        return list.map(function(task){
            if (task.id === id) {
                task.status = !task.status;
            }
            return task;
        })
    })
}