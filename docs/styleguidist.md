# Styleguide

Horseman comes with [React Styleguidist][rs] built in.

React Styleguidist expects components to be organized using [atomic design][ad].
In order to generate a styleguide entry, you must create a markdown file in the
same directory as the component with the same name as the component.

All fenced code blocks

```
\`\`\`
<MyComponent />
\`\`\`
```

Will be parsed as examples and be able to be live edited from within the
styleguide.

## Usage with blendbox

If you are using the scaffold within blendbox, the styleguide will automatically
be available to you at the `styleguide.{domain}` url.

## Usage outside blendbox

To start the styleguide server you can run `yarn styleguide`. The styleguide
will then be available on port `6060` of the server it's running on.


[rs]: https://react-styleguidist.js.org/
[ad]: ./atomic-design.md
