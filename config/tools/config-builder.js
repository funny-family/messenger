/**
 * @class ObjectConfig
 */
class ObjectConfig {
  /**
   * @param {object} object
   */
  constructor(object) {
    this.object = object;
  }
}

exports.ObjectConfig = ObjectConfig;

/**
 * @class ObjectFactory
 */
class ObjectFactory {
  /**
   * @param {array} objectArray
   */
  constructor(objectArray) {
    this.objectArray = objectArray;
    this.modifiedObjectContainer = [];
  }


  modifyObjectFromArray() {
    return this.objectArray.forEach((currentValue) => {
      this.modifiedObjectContainer.push(currentValue.object);
    });
  }

  run() {
    this.modifyObjectFromArray();

    return Object.assign({}, ...this.modifiedObjectContainer);
  }
}

exports.ObjectFactory = ObjectFactory;
