<script>
  import { tasks, addTask, removeTask } from './tasks.js';

  let text = '';
</script>

<div class="center">
  <h1>To‑Do</h1>

  <input
    placeholder="Новая задача"
    bind:value={text}
    on:keydown={function(event) {
      if (event.key === 'Enter') {
        addTask(text);
        text = '';
      }
    }}
  />

  <button on:click={function(){
    addTask(text);
    text = '';
  }}>
    Добавить
  </button>

  <ul>
    {#each $tasks as t (t.id)}
      <li>
        {t.title}
        <button on:click={function () {removeTask(t.id);}}>
        Удалить
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .center {
    text-align: center;
    margin: 0 auto;
    width: 300px;
  }

  h1 { color: #05386b; margin: 0 0 12px; font-size: 36px; }
  input { border: none; border-radius: 6px; margin-right: 8px; padding: 6px 8px; }
  button { border: none; border-radius: 4px; color: #edf5e1; background-color: #05386b; padding: 6px 10px; }
  button:hover { background-color: #379683; cursor: pointer; }
  li { margin: 6px 0; }
</style>
