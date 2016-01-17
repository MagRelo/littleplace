'use strict';

class PostModalController {

  constructor(Modal, reviewService) {

    this.openModal = Modal.confirm.post(function(formData) {

      reviewService.save(formData)
        .then(function(response) {
          console.log('save post response:', response.statusCode);
        })
    });

  }

}

angular.module('littleplaceApp')
  .controller('postModalController', PostModalController);
