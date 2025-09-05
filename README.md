# dash-ui-kit

Dash ui kit is a UI component library with TypeScript, TailwindCSS v4, and class-variance-authority (CVA) support.

At the moment the library is in its initial stage and is actively developed. More components will be added soon and more detailed documentation will be written.

You can see all the created components in the storybook - https://alexeytriplea.github.io/dash-ui-kit/

## ⚡ Quick Start

### Installation

from npm
```bash
npm i dash-ui-kit
```



### Setup with Tailwind CSS v4

```css
/* main.css */
@import "tailwindcss";
@import "dash-ui-kit/theme";
@import "dash-ui-kit/styles";
```

```jsx
import { Button } from 'dash-ui-kit/react';

<Button colorScheme="brand">Button</Button>
```

## 📦 Components

- **ThemeProvider** - Theme context for dark/light mode
- **Avatar** - Avatar component that creates unique identicons from usernames with customizable appearance. To create avatars for identities, documents, and other entities, you should use their identifiers.
- **Button** - Flexible buttons with multiple variants and color schemes
- **Select** - The component of the form for choosing one element from the set.
- **Text** - Typography component for text.
- **ValueCard** - A flexibly customized container.


## 🎨 Features

- ✅ **Tailwind v4**: Modern CSS-first architecture with `@theme` and `@layer`
- ✅ **Auto-generated**: Theme CSS automatically built from source
- ✅ **TypeScript**: Full type safety and IntelliSense support
- ✅ **Lightweight**: Minimal bundle size impact

## 🚀 Usage Examples

### Button Component

```jsx
import { Button } from 'dash-ui-kit/react';

// Color schemes
<Button colorScheme="brand">Brand Button</Button>
<Button colorScheme="mint">Mint Button</Button>
<Button colorScheme="gray">Gray Button</Button>
<Button colorScheme="red">Red Button</Button>

// Variants
<Button variant="solid">Solid Button</Button>
<Button variant="outline">Outline Button</Button>

// Sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
```

### Text Component

```jsx
import { Text } from 'dash-ui-kit/react';

<Text size="xl" weight="bold" color="blue">
  Styled Text
</Text>
```

## 🔧 Development

```bash
npm run build        # Build library
npm run test         # Run tests
npm run storybook    # Start Storybook
```

## License

MIT
