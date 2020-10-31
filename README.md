# nexus-prisma

## ecommerce api

- ```npm install```
- ```npm run dev```
- navigate to ```http://localhost:4000```

### Sample query

```javascript
query {
  products {
    id
    name
    price
    reviews {
      title
      body
    }
    categories {
      id
      name
      products {
        name
        description
      }
    }
  }
}
```
