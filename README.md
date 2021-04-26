# course-manager
## Process env usage:
- Import /utils/env which inclues "is" and "env"
- Use "is" for checking NODE_ENV
- Use "env" for process.env. Ex: process.env.PORT -> env.PORT
## Logging:
- Import logger from /utils/logger
## Command:
- To start application npm run start or yarn start
- To lint: npm run lint or yarn lint
- To fix lint: npm run lint:fix or yarn lint:fix
## Run debugger
- Check attached .vscode/launch.json
- Run by the debugger feature of VSCode
- If you run debugger, do not use the yarn start. May cause conflict in port.
