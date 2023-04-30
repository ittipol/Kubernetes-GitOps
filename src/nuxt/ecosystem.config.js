// pm2 start ecosystem.config.js --env production
module.exports = {
    apps: [
      {
        name: 'NuxtAppName',
        port: '3150',
        exec_mode: 'cluster',
        instances: 2,
        script: './.output/server/index.mjs',
        // env: {
        //   "PORT": 3100,
        //   "NODE_ENV": "development"
        // },
        // env_production: { // --env production
        //     "PORT": 3150,
        //     "NODE_ENV": "production",
        // }
      }
    ]
  }
  