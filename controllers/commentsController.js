angular.module("realTimeComments")
    .constant("commentUrl", "http://localhost:8080/RealTimeComments-web/api/comments.json")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("commentCtrl", function ($scope, $resource, commentUrl) {
        $scope.commentsResource = $resource(commentUrl + ":id", {id: "@id"});
        $scope.listcomments = function () {
            $scope.comments = $scope.commentsResource.query();
        }
        $scope.deletecomment = function (comment) {
            comment.$delete().then(function () {
                $scope.comments.splice($scope.comments.indexOf(comment), 1);
            });
        }
        $scope.createcomment = function (comment) {
            new $scope.commentsResource(comment).$save().then(function (newcomment) {
                $scope.comments.push(newcomment);
                /** @namespace $scope.comment */
                $scope.comment.text = "";
                $scope.editedcomment = null;
            });
        }
        $scope.updatecomment = function (comment) {
            comment.$save();
            $scope.editedcomment = null;
        }
        $scope.startEdit = function (comment) {
            $scope.editedcomment = comment;
        }
        $scope.cancelEdit = function () {
            $scope.editedcomment = null;
        }
        $scope.listcomments();
    });