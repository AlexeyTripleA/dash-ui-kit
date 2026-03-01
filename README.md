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

## 📱 React Native Support

Dash UI Kit now includes **7 ported components** for React Native with full NativeWind support.

### Installation

```bash
npm i dash-ui-kit
npm i nativewind twrnc
npm i react-native-svg
```

### Usage

```tsx
import { Avatar, Badge, BigNumber, ValueCard } from 'dash-ui-kit/react-native';

// Avatar with identicon
<Avatar identifier="user123" size="md" />

// Badge with status
<Badge colorScheme="success">Active</Badge>

// BigNumber with formatting
<BigNumber variant="space">1234567.89</BigNumber>

// ValueCard container
<ValueCard label="Balance" value="$1,234.56" size="sm" />
```

### Available React Native Components

- **Avatar** - Unique identicons from usernames/IDs with full customization
- **Badge** - Status indicators with color schemes and sizes
- **BigNumber** - Large number formatting with space/comma variants
- **ValueCard** - Flexible labeled value containers
- **Identifier** - Transaction/document ID display with copy functionality
- **CopyButton** - Copy-to-clipboard with visual feedback
- **NotActive** - Inactive state indicator component
- **useDebounce** - Custom hook for debouncing values

### Peer Dependencies

React Native setup requires:
- `react-native` >= 0.70
- `nativewind` for styling (using twrnc)
- `react-native-svg` for SVG rendering

### Documentation

For detailed porting guide and technical details, see [REACT_NATIVE_PORT_GUIDE.md](./REACT_NATIVE_PORT_GUIDE.md)

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
