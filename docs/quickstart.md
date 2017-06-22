# Quickstart

This scaffolding is designed for the dev environment of
[Blend Marketing](blend.marketing). We utilize a custom ubuntu virtual machine
to manage each of our projects within a docker container. It's technically
possible to run this project in a "non-docker" environment however.

## Horseman toolchain

This scaffolding come with horseman tooling built in.

* [Horseman CLI][hcli]
* [Horseman Core][hcore]
* [Horseman Components][hcomponents]

## Environment Setup

In order to initially configure your project you may need to adjust some
configuration options.

1. Run `yarn init` to update your package.json file with the correct project
   information
2. Update the `VIRTUAL_HOST` environment variable inside of the
   `docker-compose.yml` file to reflect the domain that this project will be
   served with.
3. Update the `/etc/hosts` file on your local machine to point your desired domain
   to the ip address of blendbox.

## Setup without blendbox

After cloning this project install dependencies

```
yarn install
```

If you haven't already you can update the package.json information for your
project by running `yarn init`.

The scaffolding in it's initial state is a fully functional react application.
The server can be starting by running `yarn start`. This will start up the
application on the port that you specify in `webpack.config.js`, so if you are
running this project on your local machine simply navigate to `localhost:{port}`
to view the start screen.

[hcore]: https://github.com/blendmarketing/horseman-core
[hcli]: https://github.com/blendmarketing/horseman-cli
[hcomponents]: https://github.com/blendmarketing/horseman-components
