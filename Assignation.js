class Assignation {
  static #tabAssignations = [];

  static getTab() {
    return Assignation.#tabAssignations;
  }

  static assign({ employe, tache, dateAssignation }) {
    Assignation.#tabAssignations.push({ employe, tache, dateAssignation });
  }


  static dropAssign(employe) {
    if (employe) {
      Assignation.#tabAssignations = Assignation.#tabAssignations.filter(
        (ass) => ass.employe.nom !== employe.nom
      );
    }
  }


  static getEmpAssign(employe) {
    if (employe) {
      return Assignation.#tabAssignations
        .filter(ass => ass.employe.nom === employe.nom)
        .map(ass => ({
          tache: ass.tache,
          dateAssignation: ass.dateAssignation,
        }));
    }
    return [];
  }

  static getTacheAssign(tache) {
    if (tache) {
      return Assignation.#tabAssignations
        .filter(ass => ass.tache.nom === tache.nom)
        .map(ass => ({
          employe: ass.employe
        }));
    }
    return [];
  }
}

export { Assignation };
