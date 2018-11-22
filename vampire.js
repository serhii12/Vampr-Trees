class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods * */

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires += 1;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    ) {
      return true;
    }
    return false;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    let vampire;
    // eslint-disable-next-line no-restricted-syntax
    for (const offspring of this.offspring) {
      vampire = offspring.vampireWithName(name);
      if (vampire !== null) {
        return vampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    totalDescendents += this.numberOfOffspring;

    this.offspring.forEach(offspring => {
      totalDescendents += offspring.totalDescendents;
    });

    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = []; // 1
    if (this.yearConverted > 1980) {
      vampires.push(this); // 2
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const offspring of this.offspring) {
      const newVampires = offspring.allMillennialVampires;
      if (newVampires !== null) {
        vampires = vampires.concat(newVampires);
      }
    }
    return vampires;
  }

  closestCommonAncestor(vampire) {
    let ancestor1 = this;
    let ancestor2 = vampire;
    while (ancestor1 !== ancestor2) {
      ancestor2 = ancestor2.creator;

      if (ancestor2 === null) {
        ancestor2 = vampire;
        ancestor1 = ancestor1.creator;
      }
    }
    return ancestor1;
  }
}

module.exports = Vampire;
