# dash-ui-kit

Dash ui kit is a UI component library with TypeScript, TailwindCSS v4, and class-variance-authority (CVA) support.

## ⚡ Quick Start

### Installation

```bash
npm install AlexeyTripleA/dash-ui-kit
```

### Setup with Tailwind CSS v4

```css
/* main.css */
@import "tailwindcss";
@import "dash-ui/theme";
@import "dash-ui/styles";
```

```jsx
import { Button } from 'dash-ui/react';

<Button colorScheme="brand">Button</Button>
```

## 📦 Components

- **Button** - Flexible buttons with multiple variants and color schemes
- **Text** - Typography component with theming support
- **ThemeProvider** - Theme context for dark/light mode

## 🎨 Features

- ✅ **Single source of truth**: All styles from one `styles.pcss` file
- ✅ **Tailwind v4**: Modern CSS-first architecture with `@theme` and `@layer`
- ✅ **Auto-generated**: Theme CSS automatically built from source
- ✅ **TypeScript**: Full type safety and IntelliSense support
- ✅ **Lightweight**: Minimal bundle size impact

## 🚀 Usage Examples

### Button Component

```jsx
import { Button } from 'dash-ui/react';

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
import { Text } from 'dash-ui/react';

<Text size="xl" weight="bold" color="blue">
  Styled Text
</Text>
```

## 📚 Documentation

For detailed integration guides and examples, see [INTEGRATION.md](./INTEGRATION.md)

## 🔧 Development

```bash
npm run build        # Build library
npm run test         # Run tests
npm run storybook    # Start Storybook
```

## License

MIT
