import { normalizeHomeWizardV1 } from "../worker/index.js";

const emsBase = (process.env.EMS_BASE_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
const homeWizardBase = process.env.HOMEWIZARD_BASE_URL?.replace(/\/$/, "");
const token = process.env.DEMO_GATEWAY_TOKEN || "demo-virtual-gateway-lectro-2026";
const gatewayId = process.env.GATEWAY_ID || "EMS-GW-DEMO-01";

async function readFixture() {
  return { ...normalizeHomeWizardV1(
    { api_version: "v1", product_type: "HWE-P1", serial: "000000000001" },
    { active_power_w: -2310, total_power_import_kwh: 1042.8, total_power_export_kwh: 392.3 },
  ), data_quality: "synthetic" };
}

async function readHomeWizardV1(base) {
  const infoResponse = await fetch(`${base}/api`, { signal: AbortSignal.timeout(4000) });
  if (!infoResponse.ok) throw new Error(`HomeWizard discovery returned HTTP ${infoResponse.status}`);
  const info = await infoResponse.json();
  if (info.api_version !== "v1") throw new Error(`Expected HomeWizard API v1; found ${info.api_version}. Use a v2 connector for this device.`);
  if (!info.api_enabled && info.api_enabled !== undefined) throw new Error("HomeWizard local API is disabled in the HomeWizard app");
  const dataResponse = await fetch(`${base}/api/v1/data`, { signal: AbortSignal.timeout(4000) });
  if (!dataResponse.ok) throw new Error(`HomeWizard measurement request returned HTTP ${dataResponse.status}`);
  return normalizeHomeWizardV1(info, await dataResponse.json());
}

const reading = homeWizardBase ? await readHomeWizardV1(homeWizardBase) : await readFixture();
const config = await fetch(`${emsBase}/api/v1/gateway/config`, { headers: { "x-demo-gateway-token": token }, signal: AbortSignal.timeout(5000) });
if (!config.ok) throw new Error(`EMS config poll returned HTTP ${config.status}`);
const settings = await config.json();
const response = await fetch(`${emsBase}/api/v1/gateway/telemetry`, {
  method: "POST",
  headers: { "content-type": "application/json", "x-demo-gateway-token": token },
  body: JSON.stringify({ gateway_id: gatewayId, reading }),
  signal: AbortSignal.timeout(5000),
});
if (!response.ok) throw new Error(`EMS telemetry upload returned HTTP ${response.status}: ${await response.text()}`);
const result = await response.json();
console.log(JSON.stringify({ gateway: gatewayId, poll_interval_s: settings.poll_interval_s, accepted: result.accepted, source: reading.provider, data_quality: reading.data_quality, grid_kw: reading.grid_kw, received_at: result.received_at }, null, 2));
