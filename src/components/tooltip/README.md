# Tooltip Component

A flexible and responsive tooltip component that displays helpful information when hovering over an icon or element.

## Features

- ✅ **Multiple Positions**: Top, bottom, left, right
- ✅ **Custom Icons**: Default question mark or custom icons
- ✅ **Responsive Design**: Optimized for mobile and tablet
- ✅ **Accessibility**: ARIA attributes and keyboard support
- ✅ **Customizable Delay**: Configurable show/hide timing
- ✅ **Click Outside**: Closes when clicking outside
- ✅ **Smooth Animations**: CSS transitions for smooth appearance
- ✅ **Dark Mode Support**: Adapts to system preferences

## Installation

```jsx
import Tooltip from './components/tooltip/js/Tooltip.jsx';
```

## Basic Usage

### Simple Tooltip with Default Icon

```jsx
<Tooltip content="This is a helpful tooltip message" />
```

### Tooltip with Custom Position

```jsx
<Tooltip 
  content="This tooltip appears at the bottom" 
  position="bottom" 
/>
```

### Tooltip with Custom Icon

```jsx
<Tooltip 
  content="Information tooltip" 
  icon="i" 
/>
```

### Tooltip with Custom Element

```jsx
<Tooltip content="Custom element tooltip">
  <button>Click me</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | Required | The text content to display in the tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position of the tooltip relative to the trigger |
| `icon` | `string` | `'?'` | Icon to display (only used when no children provided) |
| `delay` | `number` | `200` | Delay in milliseconds before showing the tooltip |
| `children` | `ReactNode` | `null` | Custom trigger element (overrides icon) |
| `className` | `string` | `''` | Additional CSS class name |

## Examples

### Form Field Help

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <label>Email Address</label>
  <Tooltip content="Enter your email address for account verification" />
</div>
```

### Different Positions

```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Tooltip content="Top tooltip" position="top" />
  <Tooltip content="Bottom tooltip" position="bottom" />
  <Tooltip content="Left tooltip" position="left" />
  <Tooltip content="Right tooltip" position="right" />
</div>
```

### Custom Icons

```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Tooltip content="Information" icon="i" />
  <Tooltip content="Help" icon="?" />
  <Tooltip content="Warning" icon="!" />
  <Tooltip content="Custom">
    <span style={{ 
      background: '#5485EE', 
      color: 'white', 
      padding: '4px 8px', 
      borderRadius: '4px',
      cursor: 'pointer'
    }}>
      Custom
    </span>
  </Tooltip>
</div>
```

### Different Delays

```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Tooltip content="Fast tooltip" delay={100} />
  <Tooltip content="Default tooltip" />
  <Tooltip content="Slow tooltip" delay={500} />
</div>
```

## Styling

The tooltip component uses styled-components and includes responsive styles for different screen sizes:

- **Desktop**: Full-size tooltips with larger padding
- **Tablet (≤768px)**: Slightly smaller tooltips with adjusted spacing
- **Mobile (≤480px)**: Compact tooltips optimized for touch

### Custom Styling

You can override styles by passing a `className` prop:

```jsx
<Tooltip 
  content="Custom styled tooltip" 
  className="my-custom-tooltip" 
/>
```

## Accessibility

The tooltip component includes:

- **ARIA attributes**: `role="tooltip"` and `aria-hidden`
- **Keyboard support**: Focus/blur events
- **Screen reader friendly**: Proper semantic markup
- **Click outside**: Closes when clicking outside the tooltip

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Optimized animations**: Uses CSS transitions for smooth performance
- **Debounced events**: Prevents excessive re-renders
- **Memory cleanup**: Properly cleans up event listeners and timeouts
- **Lazy rendering**: Only renders tooltip content when needed

## Testing

Use the `TooltipTest` component to see all features in action:

```jsx
import TooltipTest from './components/tooltip/js/TooltipTest.jsx';

// In your app
<TooltipTest />
``` 