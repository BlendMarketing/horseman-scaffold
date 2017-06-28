# Styled Components

Horseman utilizes [styled-components][sc] to manage all css styling throughout
the application.

By default we provide a single theme file to manage shared bits of style
information. This theme file is located in `src/themes/main.js`.

## Media Queries

Horseman uses the `styleUtils/media.js` helper for generating media queries.
You can define custom media queries in this file and use them in your
components.

```
import media from 'path/to/styleUtils/media';

const StyledDiv = styled.div`
  background: tomato;
  ${media.smAndUp`
    background: orange
  `}
`;
```



[sc]: https://www.styled-components.com/
