'use strict';

import chai from 'chai';
import {Instance} from '../../lib.compiled/Microservice/Instance';
import {Injectable} from '../../lib.compiled/Microservice/Injectable';
import Core from 'deep-core';

suite('Microservice/Instance', function() {
  let rawResources = 'rawResources';
  let identifier = 'identifier';
  let instance = new Instance(identifier, rawResources);

  test('Class Instance exists in Microservice/Instance', function() {
    chai.expect(typeof Instance).to.equal('function');
  });

  test('Check constructor sets _isRoot=false', function() {
    chai.expect(instance.isRoot).to.be.equal(false);
  });

  test('Check constructor sets _identifier', function() {
    chai.expect(instance.identifier).to.be.equal(identifier);
  });

  test('Check constructor sets _rawResources', function() {
    chai.expect(instance.rawResources).to.be.equal(rawResources);
  });

  test('Check toString() method returns _identifier', function() {
    chai.expect(instance.toString()).to.be.equal(instance.identifier);
  });

  test('Check isRoot getter/setter', function() {
    chai.expect(instance.isRoot).to.be.equal(false);
    instance.isRoot = true;
    chai.expect(instance.isRoot).to.be.equal(true);
    instance.isRoot = false;
    chai.expect(instance.isRoot).to.be.equal(false);
  });

  test('Check createVector() static method returns valid vector', function() {
    let globalConfig = {
      microservices: {
        deepRoot: 'CoreRoot',
        deepAuth: 'Auth',
        deepBilling: 'Billing',
      },
    };
    let actualResult = Instance.createVector(globalConfig);

    //check if all items are objects of Instance
    chai.expect(actualResult.length).to.be.equal(3);
    for (let result of actualResult) {
      chai.assert.instanceOf(result, Instance, ' is an instance of Instance');
    }
  });

  test('Check inject() method throws \'Core.Exception.InvalidArgumentException\' exception', function() {
    let error = null;
    let invalidInstance = 'invalidInstance';
    try {
      instance.inject(invalidInstance);
    } catch (e) {
      error = e;
    }

    chai.expect(error).to.be.not.equal(null);
    chai.expect(error).to.be.an.instanceof(Core.Exception.InvalidArgumentException);
    chai.expect(error.message).to.be.contains('Invalid argument');
  });

  test('Check inject() method returns valid object', function() {
    let error = null;
    let validInstance = new Injectable();
    let actualResult = null;
    try {
      actualResult = instance.inject(validInstance);
    } catch (e) {
      error = e;
    }

    chai.expect(error).to.be.equal(null);
    chai.assert.instanceOf(actualResult, Injectable, 'is an instance of Injectable');
    chai.assert.instanceOf(actualResult.microservice, Instance, 'is an instance of Instance');
  });
});