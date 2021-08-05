module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('User', [
      
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
