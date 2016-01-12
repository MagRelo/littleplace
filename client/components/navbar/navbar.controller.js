'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {'title': 'Main', 'state': 'main'},
    {'title': 'Home', 'state': 'home'},
    {'title': 'My Groups', 'state': 'group'}
  ];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('littleplaceApp')
  .controller('NavbarController', NavbarController);
