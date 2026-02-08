# useDebounce Hook

Extended hook for debouncing values with additional functionality.

## Key Features:

- ✅ Backward compatibility with the previous version
- ✅ Callback on value change
- ✅ Immediate execution (immediate mode)
- ✅ Force flush
- ✅ Cancel pending updates
- ✅ Pending status

## Usage Examples:

### Basic usage (backward compatibility):
```tsx
const debouncedValue = useDebounce(searchQuery, 500)
```

### Extended usage:
```tsx
const {
  debouncedValue,
  flush,
  cancel,
  isPending
} = useDebounce(searchQuery, {
  delay: 500,
  callback: (value) => {
    console.log('Debounced value changed:', value)
  },
  immediate: false
})
```

### Search with loading indicator:
```tsx
const SearchComponent = () => {
  const [query, setQuery] = useState('')
  
  const { debouncedValue, isPending } = useDebounce(query, {
    delay: 300,
    callback: (searchQuery) => {
      if (searchQuery) {
        performSearch(searchQuery)
      }
    }
  })

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <span>🔍 Searching...</span>}
    </div>
  )
}
```

### Debounce control:
```tsx
const ControlledExample = () => {
  const [value, setValue] = useState('')
  
  const { debouncedValue, flush, cancel } = useDebounce(value, 1000)

  return (
    <div>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={flush}>Apply now</button>
      <button onClick={cancel}>Cancel</button>
      <p>Debounced: {debouncedValue}</p>
    </div>
  )
}
```

### Immediate mode:
```tsx
// Value is set immediately on first render,
// subsequent changes are debounced
const { debouncedValue } = useDebounce(initialValue, {
  delay: 500,
  immediate: true
})
``` 