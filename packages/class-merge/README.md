# @repo/class-merge

A utility package for intelligently merging CSS class names, combining the power of `clsx` and `tailwind-merge`.

## Features

- ✅ Conditional class names with `clsx`
- ✅ Intelligent Tailwind CSS class merging with `tailwind-merge`
- ✅ TypeScript support
- ✅ Handles conflicting Tailwind classes (last one wins)

## Installation

This package is internal to the monorepo. Add it to your app's `package.json`:

```json
{
  "dependencies": {
    "@repo/class-merge": "*"
  }
}
```

## Usage

```typescript
import { cn } from '@repo/class-merge';

// Basic usage
cn('px-2 py-1', 'bg-blue-500');
// => 'px-2 py-1 bg-blue-500'

// Conflicting Tailwind classes (last one wins)
cn('px-2 py-1', 'px-4');
// => 'py-1 px-4'

// Conditional classes
cn('text-base', isActive && 'text-blue-500', 'font-bold');
// => 'text-base font-bold' (if isActive is false)
// => 'text-base text-blue-500 font-bold' (if isActive is true)

// Object notation
cn({
  'bg-blue-500': true,
  'bg-red-500': false,
  'text-white': true
});
// => 'bg-blue-500 text-white'

// Array of classes
cn(['px-4', 'py-2'], 'rounded-lg');
// => 'px-4 py-2 rounded-lg'

// Combined usage (common in components)
function Button({ className, isActive }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg',
        'hover:bg-blue-600 transition-colors',
        isActive && 'bg-blue-500 text-white',
        !isActive && 'bg-gray-200 text-gray-700',
        className
      )}
    />
  );
}
```

## Why this package?

Instead of installing `clsx` and `tailwind-merge` in every app/package, we centralize the utility here. This provides:

1. **Consistency**: Same class merging behavior across all apps
2. **Maintainability**: Update the logic in one place
3. **Type Safety**: Shared TypeScript types
4. **Convenience**: One import instead of two

## API

### `cn(...inputs: ClassValue[])`

Accepts any number of arguments which can be:
- `string`: Class name string
- `number`: Converted to string
- `boolean | undefined | null`: Ignored (useful for conditional classes)
- `object`: Keys are class names, values are booleans
- `Array<ClassValue>`: Recursively processes array items

Returns a merged string of class names with Tailwind conflicts resolved.

## Examples in Components

### Server Component
```typescript
import { cn } from '@repo/class-merge';

export default function Card({ className, children }) {
  return (
    <div className={cn('rounded-lg shadow-md p-4', className)}>
      {children}
    </div>
  );
}
```

### Client Component with State
```typescript
'use client';

import { useState } from 'react';
import { cn } from '@repo/class-merge';

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={cn(
        'px-4 py-2 rounded-lg transition-colors',
        isOn ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
      )}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

## Dependencies

- `clsx`: ^2.1.1 - For conditional class name construction
- `tailwind-merge`: ^2.8.0 - For intelligent Tailwind CSS class merging

