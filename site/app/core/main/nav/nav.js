export default ngModule => {
  require('./nav.scss');

  ngModule.directive('navBar', function navBar() {
    return {
      template: require('./nav.jade'),
    };
  });
};
