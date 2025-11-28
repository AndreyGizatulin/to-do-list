import {writable} from "svelte/store";

export const tasks = writable([])

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