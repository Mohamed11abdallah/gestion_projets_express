export class Task {
  constructor() {}

  createTask(task) {
    this.nom = task.nom;
    this.description = task.description;
    this.dateDebut = new Date(task.dateDebut);
    this.dateFin = new Date(task.dateFin);
    this.statut = task.statut;
    this.priorite = task.priorite;
    console.log(`Tâche: ${this.nom} a été créée`);
  }

  getTask() {
    return {
      nom: this.nom,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      statut: this.statut,
      priorite: this.priorite
    };
  }

  editTask(newTask) {
    this.nom = newTask.nom || this.nom;
    this.description = newTask.description || this.description;
    this.dateDebut = newTask.dateDebut ? new Date(newTask.dateDebut) : this.dateDebut;
    this.dateFin = newTask.dateFin ? new Date(newTask.dateFin) : this.dateFin;
    this.statut = newTask.statut || this.statut;
    this.priorite = newTask.priorite || this.priorite;
    console.log(`Tâche: ${this.nom} a été mise à jour`);
  }

  deleteTask() {
    console.log(`Tâche: ${this.nom} a été supprimée`);
  }
}