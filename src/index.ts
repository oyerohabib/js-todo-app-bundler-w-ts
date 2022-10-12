import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

const todoItems = document.querySelector<HTMLUListElement>("#list-item");
const todoForm = document.getElementById("todo-form") as HTMLFormElement | null;
const todoTitle = document.querySelector<HTMLInputElement>("#todo-title");

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

const loadTasks = (): Task[] => {
  const tasksJSON = localStorage.getItem("TASKS");
  if (tasksJSON === null) return [];
  return JSON.parse(tasksJSON);
};

const tasks: Task[] = loadTasks();

todoForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoTitle?.value === "" || todoTitle?.value === null) return;
  if (todoTitle?.value) {
    const newTodo: Task = {
      id: uuidV4(),
      title: todoTitle?.value,
      isCompleted: false,
      createdAt: new Date(),
    };
    addTodoItem(newTodo);
    tasks.push(newTodo);
    saveTasks();
  }
  if (todoTitle?.value) todoTitle.value = "";
});

const addTodoItem = (todo: Task) => {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    todo.isCompleted = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = todo.isCompleted;
  label.append(checkbox, todo.title);
  item.append(label);
  todoItems?.append(item);
};

tasks.forEach(addTodoItem);
