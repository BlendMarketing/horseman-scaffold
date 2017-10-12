yarn install &&
(cd node_modules/react-docgen && yarn install && yarn build) &&
rm -rf node_modules/react-styleguidist/node_modules/react-docgen && ln -s ./node_modules/react-docgen node_modules/react-styleguidist/node_modules/react-docgen
