const link = function (path, label) {
  this.path = path;
  this.label = label;
};

const links = [new link("/", "Home")];

export default links;
