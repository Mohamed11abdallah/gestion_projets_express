import express from "express";
import bodyParser from "body-parser";
import { Employee } from "./employee.js";
import { Task } from "./task.js";
import { Assignation } from "./Assignation.js";

const app = express();
const port = 3080;
app.use(bodyParser.json());


const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};


const formatEmployee = (employee) => ({
  nom: employee.nom,
  prenom: employee.prenom,
  email: employee.email,
  poste: employee.poste,
  dateEmbauche: formatDate(employee.dateEmbauche),
  statut: employee.statut
});


const formatTask = (task) => ({
  nom: task.nom,
  description: task.description,
  dateDebut: formatDate(task.dateDebut),
  dateFin: formatDate(task.dateFin),
  statut: task.statut,
  priorite: task.priorite
});


const formatAssignation = (assignation) => ({
  employe: assignation.employe,
  tache: assignation.tache,
  dateAssignation: formatDate(assignation.dateAssignation)
});


app.get("/", (req, res) => {
  res.send("Bienvenue dans l'application de gestion des employés, des tâches et des assignations");
});


app.post("/employees", (req, res) => {
  const { nom, prenom, email, poste, dateEmbauche, statut } = req.body;
  const employee = new Employee();
  employee.createEmployee({ nom, prenom, email, poste, dateEmbauche, statut });
  res.status(201).json({
    employee: formatEmployee(employee.getEmployee()),
    message: "Employé créé avec succès"
  });
});


app.get("/employees/:nom", (req, res) => {
  const { nom } = req.params;
  const employee = employees.find(emp => emp.nom === nom);
  if (employee) {
    res.status(200).json({ employee: formatEmployee(employee) });
  } else {
    res.status(404).json({ message: "Employé non trouvé" });
  }
});


app.put("/employees/:nom", (req, res) => {
  const { nom } = req.params;
  const { prenom, email, poste, dateEmbauche, statut } = req.body;
  const employee = employees.find(emp => emp.nom === nom);
  if (employee) {
    employee.editEmployee({ prenom, email, poste, dateEmbauche, statut });
    res.status(200).json({
      employee: formatEmployee(employee),
      message: "Employé mis à jour avec succès"
    });
  } else {
    res.status(404).json({ message: "Employé non trouvé" });
  }
});


app.delete("/employees/:nom", (req, res) => {
  const { nom } = req.params;
  const index = employees.findIndex(emp => emp.nom === nom);
  if (index !== -1) {
    employees.splice(index, 1);
    
    Assignation.dropAssign(employees[index]);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Employé non trouvé" });
  }
});


app.post("/tasks", (req, res) => {
  const { nom, description, dateDebut, dateFin, statut, priorite } = req.body;
  const task = new Task();
  task.createTask({ nom, description, dateDebut, dateFin, statut, priorite });
  res.status(201).json({
    task: formatTask(task.getTask()),
    message: "Tâche créée avec succès"
  });
});


app.get("/tasks/:nom", (req, res) => {
  const { nom } = req.params;
  const task = tasks.find(t => t.nom === nom);
  if (task) {
    res.status(200).json({ task: formatTask(task) });
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
});


app.put("/tasks/:nom", (req, res) => {
  const { nom } = req.params;
  const { description, dateDebut, dateFin, statut, priorite } = req.body;
  const task = tasks.find(t => t.nom === nom);
  if (task) {
    task.editTask({ description, dateDebut, dateFin, statut, priorite });
    res.status(200).json({
      task: formatTask(task),
      message: "Tâche mise à jour avec succès"
    });
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
});


app.delete("/tasks/:nom", (req, res) => {
  const { nom } = req.params;
  const index = tasks.findIndex(t => t.nom === nom);
  if (index !== -1) {
    tasks.splice(index, 1);
 
    Assignation.getTacheAssign(tasks[index]).forEach(ass => {
      Assignation.dropAssign(ass.employe);
    });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
});


app.post("/assignations", (req, res) => {
  const { employe, tache, dateAssignation } = req.body;
  Assignation.assign({ employe, tache, dateAssignation });
  res.status(201).json({
    assignation: formatAssignation({ employe, tache, dateAssignation }),
    message: "Assignation créée avec succès"
  });
});


app.get("/assignations/employe/:nom", (req, res) => {
  const { nom } = req.params;
  const employee = employees.find(emp => emp.nom === nom);
  if (employee) {
    const tasks = Assignation.getEmpAssign(employee);
    res.status(200).json({ tasks });
  } else {
    res.status(404).json({ message: "Employé non trouvé" });
  }
});


app.get("/assignations/tache/:nom", (req, res) => {
  const { nom } = req.params;
  const task = tasks.find(t => t.nom === nom);
  if (task) {
    const employees = Assignation.getTacheAssign(task);
    res.status(200).json({ employees });
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
});

app.delete("/assignations/:dateAssignation", (req, res) => {
  const { dateAssignation } = req.params;
  const initialLength = Assignation.getTab().length;
  Assignation.dropAssign({ dateAssignation });
  if (Assignation.getTab().length < initialLength) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Assignation non trouvée" });
  }
});

app.listen(port, () => {
  console.log(`L'application est en écoute sur le port ${port}`);
});
