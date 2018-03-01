# sarah-harissis

CMS:

JIRA Project:

Epic:

##Project Info:

### Static Repo Versions

**SASS Boilerplate**: 2.3.0

**SASS Mixins**: 1.1.1

**Grunt Config**: 1.1.1

**Assemble Structure**: 1.2.1

**Assemble Helpers**: 1.2.0

##Commands

Setup:
- Install Node Modules and Bower Components.
    - `npm install`
    - `bower install`

Coding, testing:
- Spins up a server, starts compass, auto refreshes on save.
	- `grunt server`

- Runs JSLint, maybe other validations down the road.
	- `grunt check`

Build:
- Compresses and concatenates all files and copies them to ./dist.
	- `grunt`

Deploy:
- Deploys the built code to deploy/site/\_files
	- `grunt deploy`
