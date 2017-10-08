const express = require('express');
const router = express.Router();
const db = require('../db/db');
const datetime = require('../common/datetime')
const ObjectId = require('mongodb').ObjectId;
const links = require('../common/links.js');

var setHeadJson = function (res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since');
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Content-Type', 'text/json');
}

router.get('/new', async (req, res) => {
  res.render('./wiki/new');
});

router.get('/edit/:name', async (req, res) => {

  let query = {
    collection: 'wiki',
    condition: { name: req.params.name },
    projection: {},
    sort: { time: -1 },
    limit: 0,
    skip: 0
  };

  let wiki = await db.find(query);
  if (wiki.length > 0) {
    wiki = wiki[0];
    res.render('./wiki/edit', {
      _id: wiki._id,
      name: wiki.name,
      details: wiki.details
    });
  }
  else {
    res.render('./wiki/new', {
      name: req.params.name
    });
  }
});

router.get('/s=:name', async (req, res) => {

  let query = {
    collection: 'wiki',
    condition: { name: req.params.name },
    projection: {},
    sort: { time: -1 },
    limit: 0,
    skip: 0
  };

  let wiki = await db.find(query);
  if (wiki.length > 0) {
    wiki = wiki[0];

    /* 处理 [[XXX]] */
    wiki.details = links.format(wiki.details);

    res.render('./wiki/wiki', {
      name: wiki.name,
      details: wiki.details
    });
  }
  else {
    res.render('./wiki/new', {
      name: req.params.name
    });
  }
});

router.get('/id=:id', async (req, res) => {

  let query = {
    collection: 'wiki',
    condition: { _id: ObjectId(req.params.id) },
    projection: {},
    sort: { time: -1 },
    limit: 0,
    skip: 0
  };

  let wiki = await db.find(query);
  
  if (wiki.length > 0) {
    wiki = wiki[0];

    /* 处理 [[XXX]] */
    wiki.details = links.format(wiki.details);

    res.render('./wiki/wiki', {
      name: wiki.name,
      details: wiki.details
    });
  }
  else {
    res.render('./wiki/new', {
      name: req.params.name
    });
  }
});

router.post('/new', async (req, res) => {
  setHeadJson(res);
  let data = JSON.parse(JSON.stringify(req.body));
  let result = await db.insert({
    collection: 'wiki',
    data: {
      "name": data.name,
      "details": data.details,
      "time": new Date()
    }
  });
  res.send(result);
});

router.post('/set', async (req, res) => {
  setHeadJson(res);
  let data = JSON.parse(JSON.stringify(req.body));
  let result = await db.update({
    collection: 'wiki',
    condition: {
      _id: ObjectId(data._id),
    },
    data: {
      "name": data.name,
      "details": data.details,
      "time": new Date()
    }
  });
  res.send(result);
});

module.exports = router;
