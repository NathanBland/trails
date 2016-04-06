(function() {
    'use strict';
    //get elements and such.
    nunjucks.configure('/views', {
        autoescape: true
    });
    var db = new PouchDB('trails');
    var remoteCouch = false;

    db.changes({
        since: 'now',
        live: true
    }).on('change', updateTrails);

    function sync() {
        //syncDom.setAttribute('data-sync-state', 'syncing');
        var opts = {
            live: true
        };
        db.sync(remoteCouch, opts, syncError);
    }

    function syncError() {
        console.log("err");
    }

    function addTrail(trail) {
        var Trail = {
            _id: new Date().toISOString(),
            name: trail.name,
            distance: trail.distance || 0.0,
            hike_time: trail.hikeTime || {
                up: 0,
                down: 0
            },
            elevation: {
                start: trail.elevationStart || 0,
                highest: trail.elevationHighest || 0,
                gain: trail.elevationGain || 0
            },
            difficulty: trail.difficulty || '',
            comments: trail.comments || '',
            navigation: trail.navigation || '',
            hike: trail.hike || '',
            other: trail.other || ''
        };
        db.put(Trail).then(function(result) {

        }).catch(function(err) {
            console.log("Adding trail failed.");
            console.log(err);
        });
    }

    function deleteTrail(trail) {
        db.remove(trail);
    }

    function createItemControls() {

    }

    function createTrailItem(trail) {
        return '';
    }

    function renderTrails(trails) {
        trails.forEach(function(trail) {
            //magic - createTrailItem 
        });
    }

    function showTrails() {
        db.allDocs({
                include_docs: true,
                descending: false
            })
            .then(function(doc) {
                renderTrails(doc.rows);
            }).catch(function(err) {
                console.log(err);
            });
    }

    function updateTrails() { //needs modifying.
        db.allDocs({
                include_docs: true,
                descending: false
            })
            .then(function(doc) {
                renderTrails(doc.rows);
            }).catch(function(err) {
                console.log(err);
            });
    }

    function createListener(el, action, callback) {
        el.addEventListener(action, callback);
    }

    function createTrail(e) {
        var trail = document.querySelector('#form--create-trail')
        e.preventDefault();
        var name = document.querySelector("#form--create-trail input");
        console.log('trail', name.value);
        if (name.value !== '') {
            var newTrail = {
                name: name.value
            };
            addTrail(newTrail);
        }
        trail.reset();
    }
    var fields = [{
        name: 'distance',
        ele: 'input',
        kind: 'number'
    }, {
        name: 'hikeUp',
        ele: 'input',
        kind: 'number'
    }, {
        name: 'hikeDown',
        ele: 'input',
        kind: 'number'
    }, {
        name: 'elevationStart',
        ele: 'input',
        kind: 'number'
    }, {
        name: 'elevationHighest',
        ele: 'input',
        kind: 'number'
    }, {
        name: 'elevationGain',
        ele: 'input',
        kind: 'number'
    }, {
        name: 'difficulty',
        ele: 'input',
        kind: 'text'
    }, {
        name: 'comments',
        kind: 'text'
    }, {
        name: 'navigation',
        kind: 'text'
    }, {
        name: 'hike',
        ele: 'textbox',
        kind: 'text'
    }, {
        name: 'other',
        kind: 'text'
    }];
    var res = nunjucks.render('fields.html', {
        "fields": fields
    }, function(err, res) {
        var trail = document.querySelector('#form--create-trail');
        createListener(trail, 'submit', createTrail);
        showTrails();
        if (remoteCouch) {
            sync();
        }
    });
})();