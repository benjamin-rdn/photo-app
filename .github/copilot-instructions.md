- When creating or editing a React component always use simple function syntax and named exports. Example:

```
interface MyComponentProps {
    prop1: string,
    prop2: number,
}
function MyComponent({ prop1, prop2 }: MyComponentProps) {
    // component logic here
}
```