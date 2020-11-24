<h1 align="center">cbnu-alrimi 🌏 server</h1>
<p align="center">A Node.js server application that powers the <b><a href="https://github.com/CBNU-CMI/cbnu-alrimi">충림이</a></b></p>

<p align="center">
  <img src="https://img.shields.io/github/license/payw-org/eodiro-server" />
  <a href="https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V13.md#13.10.1">
    <img alt="npm" src="https://img.shields.io/badge/node-v13.14.0-brightgreen">
  </a>
</p>

---

## 📦 Spec

Node.js running on NGINX using reverse proxy.

### NGINX

**SSL:** [Let's Encrypt](https://letsencrypt.org/) and [Certbot](https://certbot.eff.org/) python plugin

**Resolve 413 Request Entity Too Large**

```nginx
server {
    client_max_body_size 3M;
}
```

**Don't forget**

- to set timezone correctly of both system and database

### Database

It uses MariaDB internally as its database.

---

## 📚 API References

**REST**

- [Allow](#Allow)
- [Error](#Error)
- [Notice](#Notice)
- [Cafeteria](#Cafeteria)
- [Schedule](#Schedule)

---

## Allow

### Response

- Server responds with `400` HTTP response code when there are some problems while processing the APIs
- Provides a response to whether notifications are allowed or not

---

## Error

### Response
- Provides a response to whether notifications crawler and cafeteria crawler are an error.

---

### Notice

**Params**

| Key        | Type       |
| ---------- | ---------- |
| `noticeId`     | `number`   |
| `site_id` | `number` |
| `token`   | `number`   |
| `list`   | `array`   |


**Queries**

| Key       | Type     | 
| --------- | -------- | 
| `notice?` | `string` |
| `offset?` | `number` | 

---

### Cafeteria

**Params**

| Key        | Type       |
| ---------- | ---------- |
| `date`     | `date`   |
| `place` | `string` |

**Queries**

| Key       | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `menu`       | `string` | Search menu                            |

---

## Schedule

**Params**

| Key        | Type       |
| ---------- | ---------- |
| `month`     | `number`   |

**Queries**

| Key       | Type     |
| --------- | -------- |
| `schdeule?`    | `string`    |

---

## Dev Prerequisites

### Dev Tools

**Node >= 13**

**MariaDB >= 10**

**Visual Studio Code**: We enforce you to use VSCode as an editor for developing the eodiro server.

- **Essential Extensions**
  - ESLint
  - Prettier
  - sort-imports

### Config

**Example** : config.json

```
{
  "host": "",
  "user": "",
  "password": "",
  "database": ""
}
```

## NPM Scripts

You can run the scripts below by `npm run [script-name]`.

**Application**

- `dev`: Runs in development mode (listens at port `config.DEV_PORT`)
  - `--nomail`: Use this argument if you want to bootstrap the application without an email feature
- `build`: Generate JavaScript artifacts into `build` directory
- `start`: Start the production server using the build outputs (listens at port `config.PORT`)
  - `--nomail`: Same as above

**Database**

- `sync-db:prod`: Syncs the database models with the database described in `config.DB_NAME`.
- `sync-db:dev`: Same as the previous one but instead syncs with `config.DB_NAME_DEV`.

**CDN**

- `cdn:dev`: Starts the CDN server in development mode (listens at `config.CDN_DEV_PORT`)
- `cdn`: Starts the CDN server in production mode (listens at `config.CDN_PORT`)
