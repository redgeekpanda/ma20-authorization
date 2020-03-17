# Authorization examples

Shows authorization using:

- [Basic](https://en.wikipedia.org/wiki/Basic_access_authentication) authentication
- [JWT](https://jwt.io/) authentication

## List of allowed api requests:

- `GET: /basic/info` - Should contain `Authorization: Basic <<login>:<password> in base64>` header, returns secured information
- `POST: /jwt/register` - Accepts `login` and `password`, saves it and returns token for JWT authentication
- `POST: /jwt/login` - Accepts `login` and `password`, checks if it is saved before and returns token for JWT authorization
- `GET: /jwt/info` - Should contain `Authorization: Bearer <jwt-token>`, returns secured information
