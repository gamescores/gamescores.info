angular.module('GameScoresApp').factory('LeagueService', function ($q, $http) {
    var leagueList = null;
    var leagueMap = {};

    return {
        getLeagueList: function () {
            var deferred = $q.defer();
            if (leagueList === null) {
                $http.get('/api/leagues').then(function (response) {
                    leagueList = response.data;
                    for (var i = 0; i < leagueList.leagues.length; i++) {
                        var league = leagueList.leagues[i];
                        leagueMap[league.id] = league;
                    }
                    deferred.resolve(leagueList);
                });
            } else {
                deferred.resolve(leagueList);
            }
            return deferred.promise;
        },

        getLeague: function (leagueId) {
            var deferred = $q.defer();
            if (angular.isUndefined(leagueMap[leagueId])) {
                $http.get('/api/leagues/' + leagueId).then(function (response) {
                    var league = response.data;
                    leagueMap[league.id] = league;
                    deferred.resolve(league);
                });
            } else {
                deferred.resolve(leagueMap[leagueId]);
            }
            return deferred.promise;
        }
    };
});
