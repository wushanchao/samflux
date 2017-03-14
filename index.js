function isObject(obj) {
  return Object.prototype.toString.call(obj) == '[object Object]'
}

function extend(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (let i = 1, length = arguments.length; i < length; i++) {
    let source = arguments[i];

    for (let prop in source) {
      if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
        let propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
        Object.defineProperty(obj, prop, propertyDescriptor);
      } else {
        obj[prop] = source[prop];
      }
    }
  }
  return obj;
}

exports.createStore = function (definition) {
  definition = definition || {};

  function Store() {
    let t = this;
    t.data = null;
    extend(t, definition);
    t.trigger = function () {
      this.setState({});
    }

  }
  let store = new Store();
  return store;
};

exports.connect = function (listenable) {
  if(!isObject(listenable)){
    throw new Error('connect function\'s argument is not a object');
  }
  return {
    componentDidMount() {
      listenable.trigger = listenable.trigger.bind(this);
    },
    componentWillUnmount() {
      listenable.trigger = null;
    }
  };
}
