angular.module('Eggly', [

    ])
    .controller('MainCtrl', function($scope) {
        $scope.categories = [{
            "id": 0,
            "name": "Development"
        }, {
            "id": 1,
            "name": "Design"
        }, {
            "id": 2,
            "name": "Exercise"
        }, {
            "id": 3,
            "name": "Humor"
        }];

        $scope.bookmarks = [{
            "id": 0,
            "title": "AngularJS",
            "url": "http://angularjs.org",
            "category": "Development"
        }, {
            "id": 1,
            "title": "Egghead.io",
            "url": "http://angularjs.org",
            "category": "Development"
        }, {
            "id": 2,
            "title": "A List Apart",
            "url": "http://alistapart.com/",
            "category": "Design"
        }, {
            "id": 3,
            "title": "One Page Love",
            "url": "http://onepagelove.com/",
            "category": "Design"
        }, {
            "id": 4,
            "title": "MobilityWOD",
            "url": "http://www.mobilitywod.com/",
            "category": "Exercise"
        }, {
            "id": 5,
            "title": "Robb Wolf",
            "url": "http://robbwolf.com/",
            "category": "Exercise"
        }, {
            "id": 6,
            "title": "Senor Gif",
            "url": "http://memebase.cheezburger.com/senorgif",
            "category": "Humor"
        }, {
            "id": 7,
            "title": "Wimp",
            "url": "http://wimp.com",
            "category": "Humor"
        }, {
            "id": 8,
            "title": "Dump",
            "url": "http://dump.com",
            "category": "Humor"
        }];

        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.currentCategory = null;
        $scope.editedBookmark = null;

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        function setCurrentCategory(category) {
            $scope.currentCategory = category;

            cancelCreating();
            cancelEditing();
        }

        $scope.isCurrentCategory = isCurrentCategory;
        $scope.setCurrentCategory = setCurrentCategory;

        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        function resetCreateForm() {
            $scope.newBookmark = {
                title: '',
                url: '',
                category: $scope.currentCategory
            };
        }

        $scope.addBookmark = function() {
            $scope.bookmarks.push($scope.newBookmark);
            resetCreateForm();
        };

        //-------------------------------------------------------------------------------------------------
        // CRUD
        //-------------------------------------------------------------------------------------------------
        function createBookmark(bookmark) {
            bookmark.id = $scope.bookmarks.length;
            $scope.bookmarks.push(bookmark);

            resetCreateForm();
        }

        $scope.createBookmark = createBookmark;

        $scope.editedBookmark = null;

        $scope.setEditedBookmark = function(bookmark) {
            $scope.editedBookmark = angular.copy(bookmark);
        };

        $scope.updateBookmark = function(bookmark) {
            var index = _.findIndex($scope.bookmarks, function(b) {
                return b.id === bookmark.id;
            });
            $scope.bookmarks[index] = bookmark;
            $scope.setEditedBookmark(null);
            $scope.isEditing = false;
        };

        //-------------------------------------------------------------------------------------------------
        // CREATING AND EDITING STATES
        //-------------------------------------------------------------------------------------------------

        $scope.isSelectedBookmark = function(bookmarkId) {
            return $scope.editedBookmark !== null && bookmarkId === $scope.editedBookmark.id;
        };

        function shouldShowCreating() {
            return $scope.currentCategory && !$scope.isEditing;
        }

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;
            resetCreateForm();
        }
        function cancelCreating() {
            $scope.isCreating = false;
        }

        $scope.shouldShowCreating = shouldShowCreating;
        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;

        function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating;
        }

        function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
            $scope.editedBookmark = null;
        }

        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.shouldShowEditing = shouldShowEditing;
    });
