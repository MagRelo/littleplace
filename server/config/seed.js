/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import mongoose from 'mongoose';
import Group from '../api/group/group.model';
import User from '../api/user/user.model';

const adminUserId = mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a")
const testUserId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61")
const rockyUserId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42")
const billUserId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bae32")

User.find({}).removeAsync()
  .then(() => {
    User.createAsync(
      {
        _id: billUserId,
        provider: 'local',
        name: 'bill',
        email: 'bill',
        password: 'bill'
      },
      {
        _id: rockyUserId,
        provider: 'local',
        name: 'rocky',
        email: 'rocky',
        password: 'rocky'
      },
      {
        _id: testUserId,
        provider: 'local',
        name: 'Test User',
        email: 'test',
        password: 'test'
      },
      {
        _id: adminUserId,
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin',
        password: 'admin'
      }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });


Group.find({}).removeAsync()
  .then(() => {
    console.log('finished populating groups');
  });


