'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('staffs', [
      {
        'staff_id': 1,
        'first_name': 'Fabiola',
        'last_name': 'Jackson',
        'email': 'fabiola.jackson@bikes.shop',
        'phone': '(831) 555-5554',
        'active': 1,
        'store_id': 1,
        'manager_id': null,
      },
      {
        'staff_id': 2,
        'first_name': 'Mireya',
        'last_name': 'Copeland',
        'email': 'mireya.copeland@bikes.shop',
        'phone': '(831) 555-5555',
        'active': 1,
        'store_id': 1,
        'manager_id': 1,
      },
      {
        'staff_id': 3,
        'first_name': 'Genna',
        'last_name': 'Serrano',
        'email': 'genna.serrano@bikes.shop',
        'phone': '(831) 555-5556',
        'active': 1,
        'store_id': 1,
        'manager_id': 2,
      },
      {
        'staff_id': 4,
        'first_name': 'Virgie',
        'last_name': 'Wiggins',
        'email': 'virgie.wiggins@bikes.shop',
        'phone': '(831) 555-5557',
        'active': 1,
        'store_id': 1,
        'manager_id': 2,
      },
      {
        'staff_id': 5,
        'first_name': 'Jannette',
        'last_name': 'David',
        'email': 'jannette.david@bikes.shop',
        'phone': '(516) 379-4444',
        'active': 1,
        'store_id': 2,
        'manager_id': 1,
      },
      {
        'staff_id': 6,
        'first_name': 'Marcelene',
        'last_name': 'Boyer',
        'email': 'marcelene.boyer@bikes.shop',
        'phone': '(516) 379-4445',
        'active': 1,
        'store_id': 2,
        'manager_id': 5,
      },
      {
        'staff_id': 7,
        'first_name': 'Venita',
        'last_name': 'Daniel',
        'email': 'venita.daniel@bikes.shop',
        'phone': '(516) 379-4446',
        'active': 1,
        'store_id': 2,
        'manager_id': 5,
      },
      {
        'staff_id': 8,
        'first_name': 'Kali',
        'last_name': 'Vargas',
        'email': 'kali.vargas@bikes.shop',
        'phone': '(972) 530-5555',
        'active': 1,
        'store_id': 3,
        'manager_id': 1,
      },
      {
        'staff_id': 9,
        'first_name': 'Layla',
        'last_name': 'Terrell',
        'email': 'layla.terrell@bikes.shop',
        'phone': '(972) 530-5556',
        'active': 1,
        'store_id': 3,
        'manager_id': 7,
      },
      {
        'staff_id': 10,
        'first_name': 'Bernardine',
        'last_name': 'Houston',
        'email': 'bernardine.houston@bikes.shop',
        'phone': '(972) 530-5557',
        'active': 1,
        'store_id': 3,
        'manager_id': 7,
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
