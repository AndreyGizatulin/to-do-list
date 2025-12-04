<script>
    import {addTask, removeTask, toggleTask, searchText, statusFilter, filteredTasks} from './tasks.js';

    let text = '';

</script>

<div class="container">
    <h1>To‑Do</h1>

    <input
        placeholder="Поиск"
        bind:value={$searchText}
    />

    <div class="filters">
        <button
            class:active={$statusFilter === 'all'}
            on:click={() => $statusFilter = 'all'}
        >
            Все
        </button>
        <button
            class:active={$statusFilter === 'active'}
            on:click={() => $statusFilter = 'active'}
        >
            Активные
        </button>
        <button
            class:active={$statusFilter === 'completed'}
            on:click={() => $statusFilter = 'completed'}
        >
            Выполненные
        </button>
    </div>

    <input
        placeholder="Новая задача"
        bind:value={text}
        on:keydown={(event) => {
            if (event.key === 'Enter') {
                addTask(text);
                text = '';
            }
        }}
    />


    <button on:click={() =>{
    addTask(text);
    text = '';
  }}>
        Добавить
    </button>

    <ul>
        {#each $filteredTasks as item (item.id)}
            <li>
                <input
                        type="checkbox"
                        checked={item.status}
                        on:change={() => toggleTask(item.id)}
                />
                <span class:completed={item.status}>
                    {item.title}
                </span>
                <button on:click={() => {removeTask(item.id);}}>
                    Удалить
                </button>
            </li>
        {/each}
    </ul>
</div>

<style>
    .container {
        margin: 0 auto;
        width: 300px;
    }

    h1 {
        color: Teal;
        margin: 0 0 12px;
        font-size: 36px;
    }

    input {
        border: none;
        border-radius: 6px;
        margin-right: 8px;
        padding: 6px 8px;
    }

    button {
        border: none;
        border-radius: 4px;
        color: LightYellow;
        background-color: Teal;
        padding: 6px 10px;
        margin: 2px;
    }

    button:hover {
        background-color: MediumAquamarine;
        cursor: pointer;
    }

    button.active {
        background-color: MediumAquamarine;
        font-weight: bold;
    }

    .filters {
        margin: 10px 0;
    }

    .completed {
        text-decoration: line-through;
        color: gray;
    }

    li {
        margin: 6px 0;
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>
