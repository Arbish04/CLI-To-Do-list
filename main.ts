import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];

console.log(chalk.blueBright("\n\tWelcome to Arbish's Todo-List Application\n"));

// Function to show the main menu
async function showMenu() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Add a new task",
                "View all tasks",
                "Remove a task",
                "Exit"
            ],
        }
    ]);

    switch (answers.action) {
        case "Add a new task":
            await addTask();
            break;
        case "View all tasks":
            viewTasks();
            break;
        case "Remove a task":
            await removeTask();
            break;
        case "Exit":
            console.log(chalk.green("Goodbye!"));
            return;
    }

    await showMenu(); // Show menu again after an action
}

// Function to add a task
async function addTask() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "task",
            message: "Enter the task:",
        }
    ]);

    if (answer.task) {
        todoList.push(answer.task);
        console.log(chalk.green("Task added successfully!"));
    } else {
        console.log(chalk.red("Task cannot be empty!"));
    }
}

// Function to view all tasks
function viewTasks() {
    console.log(chalk.yellow("\nYour Todo List:"));
    if (todoList.length === 0) {
        console.log(chalk.red("No tasks available."));
    } else {
        todoList.forEach((task, index) => {
            console.log(chalk.blueBright(`${index + 1}. ${task}`));
        });
    }
}

// Function to remove a task
async function removeTask() {
    if (todoList.length === 0) {
        console.log(chalk.red("No tasks to remove."));
        return;
    }

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "index",
            message: "Enter the task number to remove:",
            validate: (input: string) => {
                const index = parseInt(input);
                if (isNaN(index) || index < 1 || index > todoList.length) {
                    return "Please enter a valid task number.";
                }
                return true;
            },
        }
    ]);

    const index = parseInt(answer.index) - 1;
    const removedTask = todoList.splice(index, 1);
    console.log(chalk.green(`Task "${removedTask}" removed successfully!`));
}

// Start the application
showMenu();
