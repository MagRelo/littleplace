/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

// import Group from '../api/group/group.model';
// import User from '../api/user/user.model';

// const BenId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61")
// const ToddId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42")
// const GrodeId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bae32")
// const MattId = mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a")

// User.find({}).removeAsync()
//   .then(() => {
//     User.createAsync(
//       {
//         _id: BenId,
//         provider: 'local',
//         name: 'ben',
//         email: 'ben',
//         password: 'ben'
//       },
//       {
//         _id: ToddId,
//         provider: 'local',
//         name: 'todd',
//         email: 'todd',
//         password: 'todd'
//       },
//       {
//         _id: GrodeId,
//         provider: 'local',
//         name: 'grode',
//         email: 'grode',
//         password: 'grode'
//       },
//       {
//         _id: MattId,
//         provider: 'local',
//         role: 'admin',
//         name: 'matt',
//         email: 'matt',
//         password: 'matt'
//       }
//     )
//     .then(() => {
//       console.log('finished populating users');
//     });
//   });

// Group.find({}).removeAsync()
//   .then(() => {
//     console.log('finished populating groups');
//   });
//# sourceMappingURL=seed.js.map
