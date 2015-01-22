define(
  'ephox.phoenix.gather.Seeker',

  [
    'ephox.perhaps.Option',
    'ephox.phoenix.gather.Walker',
    'ephox.phoenix.gather.Walking'
  ],

  function (Option, Walker, Walking) {
    var hone = function (universe, item, predicate, mode, direction, isRoot) {
      var next = Walker.go(universe, item, mode, direction);
      return next.bind(function (n) {
        if (isRoot(n.item())) return Option.none();
        else return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
      });
    };

    var left = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, Walker.sidestep, Walking.left(), isRoot);
    };

    var right = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, Walker.sidestep, Walking.right(), isRoot);
    };

    return {
      left: left,
      right: right
    };
  }
);