'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stores', [
      {
        'store_id': 1,
        'store_name': 'Santa Cruz Bikes',
        'phone': '(831) 476-4321',
        'email': 'santacruz@bikes.shop',
        'street': '3700 Portola Drive',
        'city': 'Santa Cruz',
        'state': 'CA',
        'zip_code': '95060',
      },
      {
        'store_id': 2,
        'store_name': 'Baldwin Bikes',
        'phone': '(516) 379-8888',
        'email': 'baldwin@bikes.shop',
        'street': '4200 Chestnut Lane',
        'city': 'Baldwin',
        'state': 'NY',
        'zip_code': '11432',
      },
      {
        'store_id': 3,
        'store_name': 'Rowlett Bikes',
        'phone': '(972) 530-5555',
        'email': 'rowlett@bikes.shop',
        'street': '8000 Fairway Avenue',
        'city': 'Rowlett',
        'state': 'TX',
        'zip_code': '75088',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
