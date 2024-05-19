#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Define the Student class
class Student {
    static counter = 1000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 1000;
    }

    // Method to enroll a student in a course
    enroll_course(course: string) {
        this.courses.push(course);
    }

    // Method to view a student's balance
    view_balance() {
        console.log(chalk.blue.bold.bgGray(`\nBalance for ${this.name}: $${this.balance}\n`));
    }

    // Method to pay student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(chalk.green.bold.bgGreenBright(`\n$${amount} Fees paid successfully for ${this.name}!\n`));
        this.view_balance();
    }

    // Method to display student status
    show_status() {
        console.log(chalk.yellow.bold(`Student ID: ${this.id}`));
        console.log(chalk.yellow.bold(`Name: ${this.name}`));
        console.log(chalk.yellow.bold(`Courses: ${this.courses.join(", ")}`));
        console.log(chalk.yellow.bold(`Balance: $${this.balance}`));
    }
}

// Defining a StudentManager class to manage students
class StudentManager {
    students: Student[] = [];

    // Method to add a new student
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green.bold.bgYellowBright(`\nStudent: ${name} added successfully. Student ID: ${student.id}\n`));
    }

    // Method to enroll a student in a course
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.green.bold.bgBlueBright(`\nStudent: ${student.name} enrolled in ${course} successfully.\n`));
        } else {
            console.log(chalk.red.bold.bgRed("\nStudent not found. Please enter a correct student ID.\n"));
        }
    }

    // Method to view a student's balance
    view_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log(chalk.red.bold.bgRed("\nStudent not found. Please enter a correct student ID.\n"));
        }
    }

    // Method to pay student fees
    pay_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        } else {
            console.log(chalk.red.bold.bgRed("\nStudent not found. Please enter a correct student ID.\n"));
        }
    }

    // Method to display student status
    show_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        } else {
            console.log(chalk.red.bold.bgRed("\nStudent not found. Please enter a correct student ID.\n"));
        }
    }

    // Method to find a student by student_id
    find_student(student_id: number) {
        return this.students.find((student) => student.id === student_id);
    }
}

// Main function to run the program
async function main() {
    console.log(chalk.bold("-".repeat(70)));
    console.log(chalk.cyan.bold.bgMagentaBright.italic("\n\tWelcome to 'Ammad Amin' - Student Management System\n\t"));
    console.log(chalk.bold("-".repeat(70)));

    let student_manager = new StudentManager();

    // While loop to keep the program running
    while (true) {
        const { option } = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "Select an option:",
                choices: [
                    "Add student",
                    "Enroll a student in a course",
                    "View a student's balance",
                    "Pay student fees",
                    "Show student status",
                    "Exit",
                ],
            },
        ]);

        // Using switch statement for user choice
        switch (option) {
            case "Add student":
                const { name } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter the student name:",
                    },
                ]);
                student_manager.add_student(name);
                break;
            case "Enroll a student in a course":
                const { student_id: enroll_student_id, course } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter the student ID:",
                    },
                    {
                        type: "input",
                        name: "course",
                        message: "Enter the course name:",
                    },
                ]);
                student_manager.enroll_student(parseInt(enroll_student_id), course);
                break;
            case "View a student's balance":
                const { student_id: view_balance_id } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter the student ID:",
                    },
                ]);
                student_manager.view_balance(parseInt(view_balance_id));
                break;
            case "Pay student fees":
                const { student_id: pay_fees_id, amount } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter the student ID:",
                    },
                    {
                        type: "input",
                        name: "amount",
                        message: "Enter the amount:",
                    },
                ]);
                student_manager.pay_fees(parseInt(pay_fees_id), parseInt(amount));
                break;
            case "Show student status":
                const { student_id: show_status_id } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "student_id",
                        message: "Enter the student ID:",
                    },
                ]);
                student_manager.show_status(parseInt(show_status_id));
                break;
            case "Exit":
                console.log(chalk.red.bold.italic.bgRedBright("\nExiting the program...\n"));
                process.exit();
        }
    }
}

// Calling the main function to start the program
main();

