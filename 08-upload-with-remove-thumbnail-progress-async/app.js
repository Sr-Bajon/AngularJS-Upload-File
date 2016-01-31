//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyController', ['$scope', 'Upload', '$timeout', '$q',
  function ($scope, Upload, $timeout, $q) {
    var myCtrl           = this;
    myCtrl.filesToUpload = [];
    myCtrl.progressBar   = {};
    var cont             = 0;

    myCtrl.addToList = function (files) {
      if (!files) return;
      for (var i = 0; i < files.length; i++) {
        files[i].id                     = cont;
        cont++;
        myCtrl.progressBar[files[i].id] = 0;
        myCtrl.filesToUpload.push(files[i]);
      }
    };

    myCtrl.remove = function (index) {
      var arrayTemp = [];
      myCtrl.filesToUpload.forEach(function (item, indice) {
        if (indice === index) return true;
        arrayTemp.push(item);
      });

      myCtrl.filesToUpload = arrayTemp;
    };

    $scope.$watch('myCtrl.files', function () {
      myCtrl.addToList(myCtrl.files);
    });

    //$scope.$watch('file', function () {
    //  if (myCtrl.file != null) {
    //    myCtrl.files = [myCtrl.file];
    //  }
    //});

    $scope.log = '';


    myCtrl.upload = function (files) {
      if (files && files.length) {
        var promiseArray = [];
        files.forEach(function (item) {
          if (!item.$error) {

            var promiseUpload = Upload.upload({
              url : 'https://angular-file-upload-cors-srv.appspot.com/upload',
              data: {
                file: item
              }
            });

            promiseUpload.xhr(function (xhr) {
              xhr.upload.addEventListener('progress', function (evt) {
                myCtrl.progressBar[item.id] = parseInt(100.0 * evt.loaded / evt.total);
              });
            });

            promiseArray.push(promiseUpload);

          }
        });

        $q.all(promiseArray).then(function (respuesta) {
          respuesta.forEach(function (resp) {
            $timeout(function () {
              $scope.log = 'file: ' +
                resp.config.data.file.name +
                ', Response: ' + JSON.stringify(resp.data) +
                '\n' + $scope.log;
            });
          });
        }, function (err) {
          console.log(err);
        }, function (evt) {
          console.log(evt);
        });
      }
    };
  }]);
