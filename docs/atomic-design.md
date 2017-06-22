# Atomic Design

Horseman is designed to be used alongside the patterns described in
[atomic design][http://atomicdesign.bradfrost.com/].

The component directory structure is built around these principles.

```
components/
├── atoms/
│   ├── Button/
|   │   ├── Button.jsx
│   ├── Input/
|   │   ├── Input.jsx
├── molecules/
│   ├── ButtonGroup/
|   │   ├── ButtonGroup.jsx
├── organisms/
│   ├── LoginForm/
|   │   ├── LoginForm.jsx
├── templates/
│   ├── LoginTemplate/
|   │   ├── LoginTemplate.jsx
```

The [`horseman-cli`][hcli] can be used to easily create components in this
structure.

[hcli]: https://github.com/blendmarketing/horseman-cli
