export class Employee {
  constructor() {}

  createEmployee(employee) {
    this.nom = employee.nom;
    this.prenom = employee.prenom;
    this.email = employee.email;
    this.poste = employee.poste;
    this.dateEmbauche = new Date(employee.dateEmbauche);
    this.statut = employee.statut;
    console.log(`Employé: ${this.nom}, ${this.prenom} a été créé`);
  }

  getEmployee() {
    return {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      poste: this.poste,
      dateEmbauche: this.dateEmbauche,
      statut: this.statut
    };
  }

  editEmployee(newEmployee) {
    this.nom = newEmployee.nom || this.nom;
    this.prenom = newEmployee.prenom || this.prenom;
    this.email = newEmployee.email || this.email;
    this.poste = newEmployee.poste || this.poste;
    this.dateEmbauche = newEmployee.dateEmbauche ? new Date(newEmployee.dateEmbauche) : this.dateEmbauche;
    this.statut = newEmployee.statut || this.statut;
    console.log(`Employé: ${this.nom}, ${this.prenom} a été mis à jour`);
  }

  deleteEmployee() {
    console.log(`Employé: ${this.nom}, ${this.prenom} a été supprimé`);
  }
}
