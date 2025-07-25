# React Components

- Use function syntax and named exports for components. Example:

```
interface MyComponentProps {
    prop1: string,
    prop2: number,
}
function MyComponent({ prop1, prop2 }: MyComponentProps) {
    // component logic here
}
```

- The return type of each component is `ReactElement`
- When there is children always use PropsWithChildren<PropsType> when there are other props or just PropsWithChildren there is none other than children

- For typescript import use the absolute path using `@` as a prefix (it points to the `src` directory). Example:

```
import MyComponent from '@/components/MyComponent';
```
