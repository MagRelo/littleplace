'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'littleplace-secret',

  GOOGLE_ID: '501628826959-ci34rfptsdsnlfpk6ct22s2k1mrc0tug.apps.googleusercontent.com',
  GOOGLE_SECRET: '5GQecMgCYS2GMCbnj5cBvmnn',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
//# sourceMappingURL=local.env.js.map
