# Lectro EMS

Prototype for a multi-customer energy management platform. This first milestone is deliberately in demo mode: all dashboard readings are generated, device control is disabled, and no customer/vendor credentials are present.

## Current shape

- One browser dashboard and HTTPS JSON API.
- A Cloudflare Worker runtime for the private ChatGPT Sites development Site; D1 is used for customer/installations/telemetry records.
- The API core is also runnable with the included Node/SQLite adapter and Docker files. The same routes and data model serve both runtimes.
- A virtual gateway polls read-only configuration, normalizes HomeWizard P1 API v1 data and posts telemetry over HTTPS when an EMS HTTPS URL is configured.
- No MQTT broker, WebSocket, port forwarding, inbound customer connection, or active control loop.
- Local HomeWizard API access is an optional gateway-side path, not required to use the EMS.

## Local development

Requires Node.js 22.13+ for the built-in SQLite module.

```sh
node --experimental-sqlite server.mjs
node gateway/virtual-gateway.mjs
```

The dashboard is at `http://localhost:8080`. To use a real HomeWizard P1 device on the same LAN (only for a controlled developer test), set `HOMEWIZARD_BASE_URL=http://<device-ip>` before running the virtual gateway. The device's local API must be enabled in the HomeWizard app. By default, the simulator uses a fixed fictional response.

Docker:

```sh
docker compose up --build
```

The example publishes only to `127.0.0.1`. Keep it behind an HTTPS reverse proxy and add authentication/authorization before allowing customer traffic. The standalone demo API does not yet include production account or role management.

## API v1

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Liveness and runtime metadata |
| GET | `/api/v1/overview` | Demo installation and current synthetic energy values |
| GET | `/api/v1/telemetry` | Synthetic historical power points |
| GET | `/api/v1/connectors` | Supported integration registry and maturity |
| GET | `/api/v1/gateway/config` | Read-only gateway configuration poll (demo credential only) |
| POST | `/api/v1/gateway/telemetry` | Upload a normalized sample from the virtual gateway |
| GET/POST | `/api/v1/customers` | List/add customer and demo installation records |

All test API responses use `cache-control: no-store`. The gateway routes accept only the local demo credential in this milestone. That credential is not suitable for production; production registration, per-device secret rotation, authorization, and rate limiting are outstanding.

## First connector: HomeWizard P1 v1

`gateway/virtual-gateway.mjs` discovers the device at `/api`, checks that it reports API v1, reads `/api/v1/data`, and passes the response through `normalizeHomeWizardV1`. The connector uses the officially documented `product_type`, `api_version`, `active_power_w`, and cumulative import/export fields. It reports net power; it does not infer PV output or battery state from P1 data.

HomeWizard's official docs describe its API as local-device access for personal automation, home automation, and graphing, and require the application to share the device's network. Written confirmation for commercial, multi-customer use is still required before this adapter is enabled in a customer service. Plug-In Battery is v2-only; its endpoint/authentication and control permissions have not yet been implemented. The EMS does not send device-control commands.

## Integrations and release gates

Provider status is in `worker/index.js` and returned by `/api/v1/connectors`. D1/SQLite schema migrations live in `drizzle/`; do not edit an applied migration. Official APIs and permissions must be reviewed per vendor before enabling production credentials. OAuth/API secrets belong in an encrypted server-side store, never in the browser or firmware source. Device control must remain off until separate installation-level consent, limits, and safety checks are implemented and approved.

## Site hosting vs. independent hosting

ChatGPT Sites can host a private Worker application with HTTPS and D1 storage, which is used for this development preview. That is a development host, not a hosting-independent production commitment. The `Dockerfile`, `compose.yaml`, Node adapter, SQL schema, and provider-neutral API routes are the migration path to an EU VPS or Lectro server. A production move still needs operational authentication, backup/restore, monitoring, secret encryption/key rotation, and an HTTPS reverse proxy. No ChatGPT authentication or connector is part of the domain model or API protocol.

## Scope still to implement

Real cloud connectors, commercial-use confirmations, role-based installer/customer accounts, client-specific access policies, real device enrollment codes, signed OTA updates, firmware for ESP32-S3 Ethernet, OCPP charging integrations, dynamic electricity prices, Belgian capacity-tariff/quarter-hour peak calculations, historical report exports, alarms, and automatic control strategies.
