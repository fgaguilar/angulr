module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
    gtx.alias('build:dev',  ['recess:app', 'copy:dev']);
    gtx.alias('build:dist', ['clean:dist', 'copy:dist', 'clean:dists', 'recess:min', 'concat:dist', 'uglify:dist']);

    gtx.alias('release', ['bower-install-simple', 'build:dev', 'bump-commit']);
    gtx.alias('release-patch', ['bump-only:patch', 'release']);
    gtx.alias('release-minor', ['bump-only:minor', 'release']);
    gtx.alias('release-major', ['bump-only:major', 'release']);
    gtx.alias('prerelease', ['bump-only:prerelease', 'release']);

    gtx.finalise();
    grunt.loadNpmTasks('grunt-connect-proxy');

    grunt.loadNpmTasks('grunt-wiredep');

wiredep: {

  task: {

    // Point to the files that should be updated when
    // you run `grunt wiredep`
    src: [
      'app/views/**/*.html',   // .html support...
      'app/views/**/*.jade',   // .jade support...
      'app/styles/main.scss',  // .scss & .sass support...
      'app/config.yml'         // and .yml & .yaml support out of the box!
    ],

    options: {
      // See wiredep's configuration documentation for the options
      // you may pass:

      // https://github.com/taptapship/wiredep#configuration
    }
  }
}

}