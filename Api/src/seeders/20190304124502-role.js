const now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Roles', [{
      id: 1,
      role: 'customer',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 2,
      role: 'caterer',
      createdAt: now,
      updatedAt: now,
    }], {}); 
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
