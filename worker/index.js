const demoSite = {
  id: "demo-site-01",
  customer_id: "demo-customer-01",
  customer_name: "Demo-installatie · Lectro",
  name: "Demo woning · Antwerpen",
  address: "Fictieve testlocatie",
  provider: "simulator",
  created_at: "2026-10-23T07:00:00Z",
};

const providers = [
  { id: "homewizard", name: "HomeWizard", status: "prototype", modes: ["local gateway"], note: "Officiële lokale API; P1 v1 en Plug-In Battery v2." },
  { id: "shelly", name: "Shelly", status: "planned", modes: ["cloud", "local gateway"], note: "Cloud API en lokale RPC; commerciële rechten te bevestigen." },
  { id: "sma", name: "SMA", status: "planned", modes: ["cloud"], note: "Developer API's; productcontract en toegang vereist." },
  { id: "huawei", name: "Huawei FusionSolar", status: "planned", modes: ["cloud"], note: "Partner/API-toegang en commerciële voorwaarden te verifiëren." },
  { id: "solaredge", name: "SolarEdge", status: "planned", modes: ["cloud"], note: "Officiële developer REST API; OAuth 2.0." },
  { id: "marstek", name: "Marstek Venus", status: "planned", modes: ["cloud", "local gateway"], note: "Officiële interface en externe commerciële toegang te verifiëren." },
  { id: "anker-solix", name: "Anker SOLIX", status: "planned", modes: ["cloud", "local gateway"], note: "Officiële partner-API en rechten te verifiëren." },
  { id: "ev-charging", name: "Laadpalen / OCPP", status: "planned", modes: ["cloud", "OCPP"], note: "Per fabrikant of OCPP-backend; schrijfcommando's blijven uit." },
];

const page = `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0a1019"><title>Lectro EMS</title>
  <style>
    :root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;color:#eef3f5;background:#0a1019;font-synthesis:none;text-rendering:optimizeLegibility;--panel:#111a26;--panel2:#151f2c;--line:#253241;--muted:#94a3b1;--mint:#80e1bd;--blue:#8fb8ff;--amber:#f1c577;--red:#f28f8f}
    *{box-sizing:border-box}body{margin:0;min-height:100vh}button,input,select{font:inherit}button{cursor:pointer}.app{min-height:100vh;display:grid;grid-template-columns:238px minmax(0,1fr)}aside{border-right:1px solid var(--line);padding:24px 16px;display:flex;flex-direction:column;gap:24px;background:#0c131d}.brand{display:flex;align-items:center;gap:12px;padding:0 8px}.logo{width:36px;height:36px;border-radius:12px;background:var(--mint);color:#092017;font-weight:900;display:grid;place-items:center;font-size:20px}.brand strong{font-size:16px;letter-spacing:.04em}.brand small{display:block;color:var(--muted);font-size:11px;margin-top:3px}.nav-label{padding:0 12px;color:#647384;text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:700}.nav{display:grid;gap:5px}.nav button{display:flex;align-items:center;gap:12px;text-align:left;background:transparent;color:#acbac7;border:0;border-radius:10px;padding:11px 12px}.nav button.active,.nav button:hover{background:#1b2938;color:#f6fafc}.nav .ico{width:19px;text-align:center;color:#8193a3}.aside-bottom{margin-top:auto;background:#121e2a;border:1px solid var(--line);border-radius:12px;padding:14px;color:var(--muted);font-size:12px;line-height:1.5}.aside-bottom b{color:var(--mint);display:block;font-size:12px;margin-bottom:5px}main{min-width:0;padding:26px clamp(18px,3.4vw,48px) 48px}.topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:26px}.crumb{color:var(--muted);font-size:13px}.crumb b{color:#e5edf3;font-weight:600}.top-actions{display:flex;align-items:center;gap:10px}.badge{font-size:11px;font-weight:700;letter-spacing:.04em;border:1px solid #315649;background:#10251f;color:var(--mint);border-radius:99px;padding:7px 10px}.avatar{height:34px;width:34px;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center;color:#cbd7df;font-size:12px}.heading{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin:0 0 20px}.heading h1{font-size:clamp(24px,3vw,34px);letter-spacing:-.04em;margin:0 0 7px}.heading p{color:var(--muted);margin:0;font-size:13px}.btn{border:1px solid var(--line);background:#182432;color:#e9f1f5;padding:10px 13px;border-radius:9px;font-size:12px;font-weight:650}.btn:hover{border-color:#4a6578}.btn.primary{background:var(--mint);border-color:var(--mint);color:#072117}.btn.ghost{background:transparent}.btn:disabled{opacity:.45;cursor:not-allowed}.notice{border:1px solid #594a2d;background:#211e18;color:#dbc99e;border-radius:10px;padding:11px 14px;font-size:12px;margin-bottom:18px;display:flex;gap:9px;align-items:flex-start}.notice strong{color:#f2d38b}.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.card{background:linear-gradient(145deg,#141f2c,#111923);border:1px solid var(--line);border-radius:13px;padding:16px}.kpi-head{display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:12px}.kpi-icon{width:27px;height:27px;display:grid;place-items:center;background:#1d2b39;border-radius:8px;color:var(--mint)}.kpi-value{font-size:26px;font-weight:720;letter-spacing:-.04em;margin:16px 0 4px}.kpi-foot{font-size:11px;color:#82909e}.positive{color:var(--mint)}.blue{color:var(--blue)}.amber{color:var(--amber)}.section-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(285px,.85fr);gap:14px;margin-top:14px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:14px}.section-head h2{font-size:14px;margin:0;font-weight:650}.section-head span{color:var(--muted);font-size:11px}.chart{height:207px;position:relative;padding:4px 0 20px}.chart svg{height:100%;width:100%;overflow:visible}.gridline{stroke:#293746;stroke-width:1;stroke-dasharray:3 5}.chart-label{fill:#718190;font-size:10px}.chart-area{fill:url(#area)}.chart-line{fill:none;stroke:var(--mint);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}.chart-line2{fill:none;stroke:#8fb8ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.legend{display:flex;gap:16px;font-size:11px;color:#9eacb9}.legend i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background:var(--mint)}.legend .l2{background:var(--blue)}.flow{display:grid;gap:12px}.flow-row{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #202c38;padding:0 0 11px;font-size:12px}.flow-row:last-child{border:0;padding-bottom:0}.flow-name{display:flex;align-items:center;gap:9px;color:#bbc7d1}.dot{width:8px;height:8px;background:var(--mint);border-radius:50%}.dot.blue-dot{background:var(--blue)}.dot.amber-dot{background:var(--amber)}.flow-row strong{font-size:13px;font-weight:650}.bar{height:5px;background:#263442;border-radius:9px;margin-top:7px;overflow:hidden}.bar span{display:block;height:100%;background:var(--mint);border-radius:9px}.bottom-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:14px;margin-top:14px}.table{width:100%;border-collapse:collapse;font-size:12px}.table th{text-align:left;color:#7f8e9c;font-size:10px;text-transform:uppercase;letter-spacing:.08em;font-weight:650;padding:0 8px 10px}.table td{border-top:1px solid #22303d;padding:11px 8px;color:#c5d0d9}.table tr:first-child td{border-top:1px solid #22303d}.state{display:inline-flex;align-items:center;gap:6px;font-size:10px;color:var(--mint)}.state.offline{color:var(--red)}.state .dot{width:6px;height:6px}.gateway{display:flex;gap:12px;align-items:flex-start}.gateway-icon{height:38px;width:38px;display:grid;place-items:center;background:#1b2d39;color:var(--mint);border-radius:10px;font-size:18px}.gateway p{color:var(--muted);font-size:11px;line-height:1.5;margin:5px 0 12px}.connector-list{display:grid;gap:9px}.connector-row{display:flex;justify-content:space-between;gap:10px;align-items:center;border-bottom:1px solid #202c38;padding:8px 0}.connector-row:last-child{border:0}.connector-row strong{font-size:12px;font-weight:600}.connector-row small{display:block;color:var(--muted);font-size:10px;margin-top:3px}.pill{font-size:10px;color:#bdc9d2;border:1px solid #334352;padding:4px 7px;border-radius:99px;white-space:nowrap}.pill.live{color:var(--mint);border-color:#315649;background:#10251f}.page-view{display:none}.page-view.active{display:block}.subnav{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.subnav button{font-size:12px;background:#131e2a;color:#a8b6c2;border:1px solid var(--line);padding:8px 12px;border-radius:8px}.subnav button.active{color:var(--mint);border-color:#3c6859;background:#132720}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.field label{display:block;color:#aab8c4;font-size:11px;margin:0 0 6px}.field input,.field select{width:100%;border:1px solid #31404d;background:#0d151f;color:#edf3f6;border-radius:8px;padding:10px}.field input::placeholder{color:#586877}.customer-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0;border-top:1px solid #22303d}.customer-row:first-child{border:0}.customer-row b{font-size:12px}.customer-row small{display:block;color:var(--muted);font-size:10px;margin-top:4px}.toast{position:fixed;right:20px;bottom:20px;background:#17292a;border:1px solid #3c7462;color:#d8fff1;padding:12px 16px;border-radius:10px;font-size:12px;display:none;box-shadow:0 10px 30px #0008}.simulator-strip{display:flex;align-items:center;justify-content:space-between;gap:12px}.simulator-strip p{margin:5px 0 0;color:var(--muted);font-size:11px}.safe-label{font-size:10px;color:var(--amber);border:1px solid #5d4a29;background:#292115;padding:5px 8px;border-radius:7px;white-space:nowrap}.muted{color:var(--muted)}.hidden{display:none!important}
    @media(max-width:1040px){.kpis{grid-template-columns:repeat(2,1fr)}.section-grid,.bottom-grid{grid-template-columns:1fr}}
    @media(max-width:700px){.app{grid-template-columns:1fr}aside{padding:12px 15px;border-right:0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center}.brand{padding:0}.nav-label,.aside-bottom{display:none}.nav{display:flex;overflow-x:auto;grid-column:1/-1;gap:4px}.nav button{white-space:nowrap;padding:8px 10px;font-size:11px}.nav .ico{display:none}main{padding:18px 14px 32px}.topbar{margin-bottom:20px}.heading{align-items:flex-start}.heading .btn{padding:9px}.kpis{gap:8px}.card{padding:13px}.kpi-value{font-size:22px}.table th:nth-child(3),.table td:nth-child(3){display:none}}
  </style>
</head>
<body>
<div class="app">
  <aside>
    <div class="brand"><div class="logo">L</div><div><strong>LECTRO EMS</strong><small>Energy Management</small></div></div>
    <div class="nav-label">Werkruimte</div>
    <nav class="nav" aria-label="Hoofdnavigatie">
      <button class="active" data-page="dashboard"><span class="ico">◫</span> Overzicht</button>
      <button data-page="customers"><span class="ico">♙</span> Klanten & installaties</button>
      <button data-page="devices"><span class="ico">⌁</span> Integraties</button>
      <button data-page="gateway"><span class="ico">▣</span> Gateways</button>
      <button data-page="settings"><span class="ico">⚙</span> Strategie & tarieven</button>
    </nav>
    <div class="aside-bottom"><b>● TESTOMGEVING</b>Alle getoonde metingen zijn fictief. Toestelsturing is uitgeschakeld.</div>
  </aside>
  <main>
    <div class="topbar"><div class="crumb">Lectro / <b id="crumb-label">Overzicht</b></div><div class="top-actions"><span class="badge">TESTOMGEVING</span><div class="avatar" aria-label="Lectro beheerder">LV</div></div></div>

    <section class="page-view active" id="page-dashboard">
      <div class="heading"><div><h1>Energieoverzicht</h1><p id="site-subtitle">Demo woning · Antwerpen <span class="muted">· laatst bijgewerkt net nu</span></p></div><button class="btn" id="refresh">↻ &nbsp;Vernieuwen</button></div>
      <div class="notice"><span>ⓘ</span><div><strong>Fictieve demo-installatie.</strong> Dit dashboard gebruikt gegenereerde meetwaarden; er zijn geen echte accounts, toestellen of klantgegevens gekoppeld.</div></div>
      <div class="kpis">
        <article class="card"><div class="kpi-head">Zonneproductie <span class="kpi-icon">☀</span></div><div class="kpi-value" id="solar">4,82 <small>kW</small></div><div class="kpi-foot positive">↑ 12% tegenover gisteren</div></article>
        <article class="card"><div class="kpi-head">Verbruik <span class="kpi-icon">⌂</span></div><div class="kpi-value" id="load">1,74 <small>kW</small></div><div class="kpi-foot">Huidig totaalvermogen</div></article>
        <article class="card"><div class="kpi-head">Net <span class="kpi-icon">⇄</span></div><div class="kpi-value blue" id="grid">−2,31 <small>kW</small></div><div class="kpi-foot">Injectie naar het net</div></article>
        <article class="card"><div class="kpi-head">Batterij <span class="kpi-icon">▰</span></div><div class="kpi-value" id="soc">68<small>%</small></div><div class="kpi-foot positive" id="battery-state">Laadt met 0,77 kW</div></article>
      </div>
      <div class="section-grid">
        <article class="card"><div class="section-head"><h2>Vermogen vandaag</h2><span>Laatste 12 uur · kW</span></div><div class="chart"><svg viewBox="0 0 640 190" preserveAspectRatio="none" role="img" aria-label="Fictieve energieproductie en verbruik doorheen de dag"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#80e1bd" stop-opacity=".2"/><stop offset="1" stop-color="#80e1bd" stop-opacity="0"/></linearGradient></defs><path class="gridline" d="M30 35H630M30 80H630M30 125H630M30 170H630"/><text class="chart-label" x="0" y="38">6</text><text class="chart-label" x="0" y="83">4</text><text class="chart-label" x="0" y="128">2</text><text class="chart-label" x="0" y="173">0</text><path class="chart-area" d="M30 170 C80 166 91 152 126 145 S180 108 217 95 S276 54 307 39 S364 25 396 46 S453 81 486 101 S550 148 630 162 L630 170Z"/><path class="chart-line" d="M30 170 C80 166 91 152 126 145 S180 108 217 95 S276 54 307 39 S364 25 396 46 S453 81 486 101 S550 148 630 162"/><path class="chart-line2" d="M30 151 C75 148 96 149 126 143 S178 144 217 139 S272 146 307 132 S363 145 396 136 S453 143 486 139 S553 145 630 141"/><text class="chart-label" x="30" y="188">06:00</text><text class="chart-label" x="170" y="188">09:00</text><text class="chart-label" x="310" y="188">12:00</text><text class="chart-label" x="450" y="188">15:00</text><text class="chart-label" x="600" y="188">18:00</text></svg></div><div class="legend"><span><i></i>Productie</span><span><i class="l2"></i>Verbruik</span></div></article>
        <article class="card"><div class="section-head"><h2>Energiestroom</h2><span>Actueel</span></div><div class="flow"><div><div class="flow-row"><span class="flow-name"><i class="dot"></i>Zonnepanelen</span><strong id="flow-solar">4,82 kW</strong></div><div class="bar"><span style="width:82%"></span></div></div><div><div class="flow-row"><span class="flow-name"><i class="dot blue-dot"></i>Woning</span><strong id="flow-load">1,74 kW</strong></div><div class="bar"><span style="width:34%;background:var(--blue)"></span></div></div><div><div class="flow-row"><span class="flow-name"><i class="dot amber-dot"></i>Batterij</span><strong id="flow-battery">+0,77 kW</strong></div><div class="bar"><span style="width:44%;background:var(--amber)"></span></div></div><div><div class="flow-row"><span class="flow-name"><i class="dot blue-dot"></i>Netinjectie</span><strong id="flow-grid">2,31 kW</strong></div><div class="bar"><span style="width:53%;background:var(--blue)"></span></div></div></div></article>
      </div>
      <div class="bottom-grid">
        <article class="card"><div class="section-head"><h2>Installatie</h2><span>Fictieve data</span></div><table class="table"><thead><tr><th>Toestel</th><th>Type</th><th>Laatste data</th><th>Status</th></tr></thead><tbody><tr><td>Demo P1-meter</td><td>HomeWizard</td><td>nu</td><td><span class="state"><i class="dot"></i>Online</span></td></tr><tr><td>Demo PV-omvormer</td><td>Simulator</td><td>nu</td><td><span class="state"><i class="dot"></i>Online</span></td></tr><tr><td>Demo thuisbatterij</td><td>Simulator</td><td>nu</td><td><span class="state"><i class="dot"></i>Online</span></td></tr><tr><td>Virtuele gateway</td><td>ESP32 simulator</td><td id="gateway-time">net</td><td><span class="state"><i class="dot"></i>Verbonden</span></td></tr></tbody></table></article>
        <article class="card"><div class="section-head"><h2>Virtuele ESP32</h2><span class="pill live">HTTPS · online</span></div><div class="simulator-strip"><div class="gateway"><div class="gateway-icon">▣</div><div><strong style="font-size:12px">EMS-GW-DEMO-01</strong><p>Testgateway · DHCP · HTTPS poll<br>Laatste heartbeat <span id="heartbeat">zojuist</span></p></div></div></div><div style="display:flex;gap:8px;margin-top:7px"><button class="btn primary" id="send-test">Stuur testmeting</button><button class="btn ghost" id="poll-config">Haal config op</button></div><p class="muted" style="font-size:10px;line-height:1.5;margin:12px 0 0">Simulatormodus. Configuratie is alleen-lezen; apparaatbesturing is niet beschikbaar.</p></article>
      </div>
    </section>

    <section class="page-view" id="page-customers">
      <div class="heading"><div><h1>Klanten & installaties</h1><p>Beheer demo-klanten en hun EMS-installaties.</p></div><button class="btn primary" id="new-customer">＋ &nbsp;Klant toevoegen</button></div>
      <div class="notice"><span>ⓘ</span><div>Deze ontwikkelomgeving bevat alleen fictieve data. Klanten die je hier toevoegt blijven in de testdatabase.</div></div>
      <article class="card"><div class="section-head"><h2>Klanten</h2><span id="customer-count">1 klant · 1 installatie</span></div><div id="customer-list"></div></article>
      <article class="card hidden" id="customer-form-card" style="margin-top:14px"><div class="section-head"><h2>Demo-klant toevoegen</h2><button class="btn ghost" id="cancel-customer">Sluiten</button></div><form id="customer-form"><div class="form-grid"><div class="field"><label for="customer-name">Klantnaam</label><input id="customer-name" required placeholder="Bijvoorbeeld Testbedrijf BV"></div><div class="field"><label for="site-name">Installatienaam</label><input id="site-name" required placeholder="Bijvoorbeeld Kantoor Gent"></div><div class="field"><label for="site-address">Plaats (optioneel)</label><input id="site-address" placeholder="Gemeente"></div><div class="field"><label for="site-mode">Databron</label><select id="site-mode"><option value="simulator">Simulator (fictief)</option></select></div></div><div style="margin-top:14px"><button class="btn primary" type="submit">Opslaan in testomgeving</button></div></form></article>
    </section>

    <section class="page-view" id="page-devices">
      <div class="heading"><div><h1>Integraties</h1><p>Uitbreidbaar connectorregister met expliciete status per koppeling.</p></div></div>
      <div class="notice"><span>ⓘ</span><div><strong>Geen leverancierstoegang ingesteld.</strong> Er zijn geen API-sleutels opgeslagen. Alleen de HomeWizard meetdata-normalizer en simulator zijn in deze ontwikkelversie opgenomen.</div></div>
      <article class="card"><div class="section-head"><h2>Merken en protocollen</h2><span>Monitoring eerst · sturing uitgeschakeld</span></div><div id="connectors" class="connector-list"></div></article>
      <article class="card" style="margin-top:14px"><div class="section-head"><h2>HomeWizard · officiële lokale API</h2><span class="pill live">Proefconnector</span></div><p style="color:#a9b6c2;font-size:12px;line-height:1.7;margin:0">De eerste connector is voorbereid voor uitlezen via de ESP32-gateway. HomeWizard documenteert lokale HTTP API v1 en HTTPS API v2. P1 is beschikbaar; de Plug-In Battery werkt via v2. Deze prototypeversie bevat een schema-validatie en normalisatiepad, maar nog geen live apparaatverbinding. Commercieel hergebruik moet nog door HomeWizard bevestigd worden.</p><div style="margin-top:12px"><button class="btn" id="test-homewizard">Test fictieve HomeWizard-respons</button></div><pre id="connector-result" class="hidden" style="white-space:pre-wrap;color:#b8c9d4;font-size:11px;background:#0b121b;padding:12px;border-radius:8px;margin-top:12px"></pre></article>
    </section>

    <section class="page-view" id="page-gateway">
      <div class="heading"><div><h1>Gateways</h1><p>HTTPS communicatie en registratie zonder MQTT-broker.</p></div><button class="btn" id="gateway-test">Gatewaycontrole uitvoeren</button></div>
      <div class="section-grid"><article class="card"><div class="section-head"><h2>Virtuele gateway</h2><span class="pill live">Verbonden</span></div><div class="gateway"><div class="gateway-icon">▣</div><div><strong>EMS-GW-DEMO-01</strong><p>ESP32-S3 · USB-C · Ethernet (gesimuleerd)<br>Transport: HTTPS POST + periodieke config-poll<br>IP-adres: 192.0.2.42 (gereserveerd testadres)</p></div></div><table class="table"><tbody><tr><td>Firmwarekanaal</td><td>stable · demo</td></tr><tr><td>Meetinterval</td><td>15 seconden</td></tr><tr><td>Laatste heartbeat</td><td id="gateway-heartbeat">zojuist</td></tr><tr><td>Besturingsopdrachten</td><td class="amber">uitgeschakeld</td></tr></tbody></table></article><article class="card"><div class="section-head"><h2>Protocoltest</h2><span>Alleen testdata</span></div><div class="flow"><div class="flow-row"><span>HTTPS health check</span><span class="state"><i class="dot"></i>Geslaagd</span></div><div class="flow-row"><span>Virtuele meting uploaden</span><span class="state"><i class="dot"></i>Actief</span></div><div class="flow-row"><span>Configuratie ophalen</span><span class="state"><i class="dot"></i>Actief</span></div><div class="flow-row"><span>Lokale HTTP/Modbus TCP scan</span><span class="pill">Nog niet actief</span></div><div class="flow-row"><span>OTA firmware-update</span><span class="pill">Ontwerp</span></div></div></article></div>
      <article class="card" style="margin-top:14px"><div class="section-head"><h2>Beveiligingsstatus</h2><span class="safe-label">DEMO · GEEN TOESTELSTURING</span></div><p style="font-size:12px;color:#aab7c3;line-height:1.7;margin:0">De testgateway gebruikt een vaste demo-token die alleen in de fixturetest werkt. Voor productie worden unieke apparaatcredentials, een eenmalige claimcode, tokenrotatie, beperkte rechten en firmwareondertekening vereist. Geen geheime sleutels staan in de browserbundel.</p></article>
    </section>

    <section class="page-view" id="page-settings">
      <div class="heading"><div><h1>Strategie & tarieven</h1><p>Veilige testweergave voor EMS-regels. Geen live opdrachten.</p></div></div>
      <div class="notice"><span>ⓘ</span><div>Regelstrategieën zijn in deze versie alleen beschrijvend. Alle automatische sturing is uitgeschakeld.</div></div>
      <div class="section-grid"><article class="card"><div class="section-head"><h2>Actieve demo-strategie</h2><span class="pill">alleen simulatie</span></div><div class="flow"><div class="flow-row"><span>1 · Zonne-energie eerst naar eigen verbruik</span><span class="positive">actief</span></div><div class="flow-row"><span>2 · Batterij opladen met overschot</span><span class="positive">gesimuleerd</span></div><div class="flow-row"><span>3 · EV laden tijdens zonneoverschot</span><span class="muted">nog niet ingesteld</span></div><div class="flow-row"><span>4 · Dynamisch tarief / kwartierpiek</span><span class="muted">nog niet ingesteld</span></div></div></article><article class="card"><div class="section-head"><h2>Tariefinstellingen</h2><span class="pill">demo</span></div><div class="flow"><div class="flow-row"><span>Inkoopprijs</span><strong>€0,28 / kWh</strong></div><div class="flow-row"><span>Injectievergoeding</span><strong>€0,06 / kWh</strong></div><div class="flow-row"><span>Tariefbron</span><strong>fictief</strong></div><div class="flow-row"><span>België · kwartierpiek</span><strong>nog niet berekend</strong></div></div></article></div>
    </section>
  </main>
</div><div class="toast" id="toast" role="status"></div>
<script>
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const toast=(m)=>{const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2600)};
const pages={dashboard:'Overzicht',customers:'Klanten & installaties',devices:'Integraties',gateway:'Gateways',settings:'Strategie & tarieven'};
$$('.nav button').forEach(b=>b.onclick=()=>{ $$('.nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.page-view').forEach(x=>x.classList.remove('active'));$('#page-'+b.dataset.page).classList.add('active');$('#crumb-label').textContent=pages[b.dataset.page];if(b.dataset.page==='customers')loadCustomers();if(b.dataset.page==='devices')loadConnectors();});
async function api(path,options={}){const r=await fetch(path,{...options,headers:{'content-type':'application/json',...(options.headers||{})}});if(!r.ok)throw new Error('API '+r.status);return r.json()}
async function loadOverview(){try{const x=await api('/api/v1/overview');$('#solar').innerHTML=x.telemetry.pv_kw.toFixed(2).replace('.',',')+' <small>kW</small>';$('#load').innerHTML=x.telemetry.load_kw.toFixed(2).replace('.',',')+' <small>kW</small>';$('#grid').innerHTML=(x.telemetry.grid_kw<0?'−':'＋')+Math.abs(x.telemetry.grid_kw).toFixed(2).replace('.',',')+' <small>kW</small>';$('#soc').innerHTML=Math.round(x.telemetry.battery_soc)+'<small>%</small>';$('#flow-solar').textContent=x.telemetry.pv_kw.toFixed(2)+' kW';$('#flow-load').textContent=x.telemetry.load_kw.toFixed(2)+' kW';$('#flow-battery').textContent=(x.telemetry.battery_kw>=0?'+':'−')+Math.abs(x.telemetry.battery_kw).toFixed(2)+' kW';$('#flow-grid').textContent=Math.abs(x.telemetry.grid_kw).toFixed(2)+' kW';$('#battery-state').textContent=x.telemetry.battery_kw>=0?'Laadt met '+x.telemetry.battery_kw.toFixed(2)+' kW':'Ontlaadt met '+Math.abs(x.telemetry.battery_kw).toFixed(2)+' kW';$('#site-subtitle').innerHTML=x.site.name+' <span class="muted">· laatst bijgewerkt net nu</span>';}catch(e){toast('Dashboarddata niet bereikbaar');}}
async function loadCustomers(){try{const x=await api('/api/v1/customers');$('#customer-count').textContent=x.customers.length+' klant(en) · '+x.installation_count+' installatie(s)';$('#customer-list').innerHTML=x.customers.map(c=>'<div class="customer-row"><div><b>'+escapeHtml(c.name)+'</b><small>'+c.installations.map(i=>escapeHtml(i.name)+' · '+escapeHtml(i.address||'Plaats niet ingesteld')).join('<br>')+'</small></div><span class="pill">testdata</span></div>').join('')||'<p class="muted">Nog geen klanten.</p>';}catch(e){toast('Klantenlijst niet bereikbaar');}}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function loadConnectors(){try{const x=await api('/api/v1/connectors');$('#connectors').innerHTML=x.connectors.map(c=>'<div class="connector-row"><div><strong>'+escapeHtml(c.name)+'</strong><small>'+escapeHtml(c.modes.join(' · '))+' — '+escapeHtml(c.note)+'</small></div><span class="pill '+(c.status==='prototype'?'live':'')+'">'+(c.status==='prototype'?'prototype':'in voorbereiding')+'</span></div>').join('');}catch(e){toast('Integraties niet bereikbaar');}}
$('#refresh').onclick=()=>{loadOverview();toast('Testdashboard vernieuwd')};
$('#new-customer').onclick=()=>$('#customer-form-card').classList.remove('hidden');$('#cancel-customer').onclick=()=>$('#customer-form-card').classList.add('hidden');
$('#customer-form').onsubmit=async e=>{e.preventDefault();try{await api('/api/v1/customers',{method:'POST',body:JSON.stringify({name:$('#customer-name').value,installation:{name:$('#site-name').value,address:$('#site-address').value}})});e.target.reset();$('#customer-form-card').classList.add('hidden');await loadCustomers();toast('Fictieve klant opgeslagen');}catch(e){toast('Opslaan mislukt');}};
$('#send-test').onclick=async()=>{try{const r=await api('/api/v1/gateway/telemetry',{method:'POST',headers:{'x-demo-gateway-token':'demo-virtual-gateway-lectro-2026'},body:JSON.stringify({gateway_id:'EMS-GW-DEMO-01'})});$('#heartbeat').textContent='net';$('#gateway-time').textContent='net';loadOverview();toast('Testmeting via HTTPS ontvangen · '+r.measurement_id.slice(0,8));}catch(e){toast('Gatewaytest mislukt');}};
$('#poll-config').onclick=async()=>{try{const r=await api('/api/v1/gateway/config',{headers:{'x-demo-gateway-token':'demo-virtual-gateway-lectro-2026'}});toast('Configuratie opgehaald · '+r.commands.length+' opdrachten');}catch(e){toast('Config-poll mislukt');}};
$('#gateway-test').onclick=async()=>{try{const h=await api('/api/health');await api('/api/v1/gateway/config',{headers:{'x-demo-gateway-token':'demo-virtual-gateway-lectro-2026'}});toast('HTTPS API actief · '+h.environment);}catch(e){toast('Gatewaycontrole mislukt');}};
$('#test-homewizard').onclick=async()=>{const r=await api('/api/v1/connectors/homewizard/fixture',{method:'POST'});$('#connector-result').textContent=JSON.stringify(r,null,2);$('#connector-result').classList.remove('hidden');};
loadOverview();
</script></body></html>`;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}

function demoTelemetry() {
  const t = Date.now() / 60000;
  const pv = Math.max(0, 4.5 + Math.sin(t / 12) * 0.42);
  const load = 1.55 + (Math.sin(t / 5) + 1) * 0.28;
  const battery = Math.max(15, Math.min(94, 68 + Math.sin(t / 18) * 3));
  const charge = Math.max(0, Math.min(1.1, (pv - load) * 0.26));
  return { timestamp: new Date().toISOString(), pv_kw: Number(pv.toFixed(2)), load_kw: Number(load.toFixed(2)), grid_kw: Number((load + charge - pv).toFixed(2)), battery_soc: Number(battery.toFixed(1)), battery_kw: Number(charge.toFixed(2)), ev_kw: 0, data_quality: "synthetic" };
}

export function normalizeHomeWizardV1(device, measurement) {
  if (!device || device.api_version !== "v1" || !["HWE-P1", "HWE-KWH1", "HWE-KWH3"].includes(device.product_type)) throw new Error("Unsupported HomeWizard v1 device");
  if (!measurement || !Number.isFinite(measurement.active_power_w)) throw new Error("HomeWizard response is missing active_power_w");
  const gridKw = measurement.active_power_w / 1000;
  return { provider: "homewizard", product_type: device.product_type, serial: device.serial, timestamp: new Date().toISOString(), grid_kw: Number(gridKw.toFixed(3)), active_power_w: measurement.active_power_w, energy_import_kwh: measurement.total_power_import_kwh ?? null, energy_export_kwh: measurement.total_power_export_kwh ?? null, pv_kw: null, data_quality: "device" };
}

async function readCustomers(db) {
  if (!db) return [{ id: demoSite.customer_id, name: "Demo-klant · Lectro", installations: [{ id: demoSite.id, name: demoSite.name, address: demoSite.address, mode: "simulator" }] }];
  const rows = await db.prepare("SELECT c.id AS customer_id, c.name AS customer_name, i.id AS installation_id, i.name AS installation_name, i.address, i.mode FROM customers c LEFT JOIN installations i ON i.customer_id = c.id ORDER BY c.created_at").all();
  const map = new Map([[demoSite.customer_id, { id: demoSite.customer_id, name: "Demo-klant · Lectro", installations: [{ id: demoSite.id, name: demoSite.name, address: demoSite.address, mode: "simulator" }] }]]);
  for (const row of rows.results || []) {
    if (!map.has(row.customer_id)) map.set(row.customer_id, { id: row.customer_id, name: row.customer_name, installations: [] });
    if (row.installation_id) map.get(row.customer_id).installations.push({ id: row.installation_id, name: row.installation_name, address: row.address, mode: row.mode });
  }
  return [...map.values()];
}

async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type,authorization,x-demo-gateway-token" } });
  if (path === "/api/health" && request.method === "GET") return json({ ok: true, service: "lectro-ems", api_version: "0.1.0", environment: env.ENVIRONMENT || "demo", persistence: env.DB_KIND || (env.DB ? "d1" : "ephemeral"), control_enabled: false, timestamp: new Date().toISOString() });
  if (path === "/api/v1/overview" && request.method === "GET") return json({ site: demoSite, telemetry: demoTelemetry(), connectors: providers.length });
  if (path === "/api/v1/telemetry" && request.method === "GET") return json({ installation_id: url.searchParams.get("installation_id") || demoSite.id, points: Array.from({ length: 24 }, (_, i) => { const hour = i; const solar = Math.max(0, 5.3 * Math.sin((hour - 6) * Math.PI / 12)); const load = 1.2 + ((hour > 7 && hour < 9) || (hour > 17 && hour < 22) ? 1.15 : 0.35); return { timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(), pv_kw: Number(solar.toFixed(2)), load_kw: Number(load.toFixed(2)), grid_kw: Number((load - solar).toFixed(2)), data_quality: "synthetic" }; }), unit: "kW", data_quality: "synthetic" });
  if (path === "/api/v1/connectors" && request.method === "GET") return json({ connectors: providers });
  if (path === "/api/v1/connectors/homewizard/fixture" && request.method === "POST") {
    const normalized = { ...normalizeHomeWizardV1({ api_version: "v1", product_type: "HWE-P1", serial: "000000000001" }, { active_power_w: -2310, total_power_import_kwh: 1042.8, total_power_export_kwh: 392.3 }), data_quality: "synthetic" };
    return json({ ok: true, fixture: "synthetic", normalized });
  }
  if (path === "/api/v1/customers" && request.method === "GET") {
    const customers = await readCustomers(env.DB);
    return json({ customers, installation_count: customers.reduce((n, c) => n + c.installations.length, 0) });
  }
  if (path === "/api/v1/customers" && request.method === "POST") {
    let body; try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const siteName = typeof body.installation?.name === "string" ? body.installation.name.trim().slice(0, 120) : "";
    const address = typeof body.installation?.address === "string" ? body.installation.address.trim().slice(0, 160) : "";
    if (!name || !siteName) return json({ error: "name_and_installation_required" }, 422);
    if (!env.DB) return json({ error: "database_unavailable" }, 503);
    const customerId = crypto.randomUUID(), installationId = crypto.randomUUID(), now = new Date().toISOString();
    await env.DB.batch([
      env.DB.prepare("INSERT INTO customers (id, name, created_at) VALUES (?, ?, ?)").bind(customerId, name, now),
      env.DB.prepare("INSERT INTO installations (id, customer_id, name, address, mode, created_at) VALUES (?, ?, ?, ?, 'simulator', ?)").bind(installationId, customerId, siteName, address, now),
    ]);
    return json({ ok: true, customer: { id: customerId, name, installations: [{ id: installationId, name: siteName, address, mode: "simulator" }] } }, 201);
  }
  const demoToken = request.headers.get("x-demo-gateway-token");
  if (path === "/api/v1/gateway/config" && request.method === "GET") {
    if (demoToken !== "demo-virtual-gateway-lectro-2026") return json({ error: "unauthorized" }, 401);
    return json({ gateway_id: "EMS-GW-DEMO-01", poll_interval_s: 15, config_version: 1, mode: "demo-read-only", devices: [{ id: "hw-p1-demo", protocol: "homewizard-local-v1", address: "http://192.0.2.10" }], commands: [], control_enabled: false, server_time: new Date().toISOString() });
  }
  if (path === "/api/v1/gateway/telemetry" && request.method === "POST") {
    if (demoToken !== "demo-virtual-gateway-lectro-2026") return json({ error: "unauthorized" }, 401);
    let body; try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
    if (body.gateway_id !== "EMS-GW-DEMO-01") return json({ error: "unknown_demo_gateway" }, 404);
    const point = body.reading && body.reading.provider === "homewizard" ? body.reading : demoTelemetry();
    const synthetic = point.data_quality !== "device";
    if (env.DB) {
      const installed = await env.DB.prepare("SELECT id FROM installations WHERE id = ?").bind(demoSite.id).all();
      if (installed.results?.length) await env.DB.prepare("INSERT INTO telemetry (id, installation_id, captured_at, provider, payload_json, synthetic) VALUES (?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(), demoSite.id, point.timestamp || new Date().toISOString(), point.provider || "simulator", JSON.stringify(point), synthetic ? 1 : 0).run();
    }
    return json({ accepted: true, measurement_id: crypto.randomUUID(), gateway_id: body.gateway_id, data_quality: point.data_quality || "synthetic", received_at: new Date().toISOString() }, 202);
  }
  return json({ error: "not_found" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try { return await route(request, env); }
      catch (error) { return json({ error: "internal_error", message: env?.ENVIRONMENT === "development" ? String(error?.message || error) : "Unexpected server error" }, 500); }
    }
    if (url.pathname === "/" || url.pathname === "/index.html") return new Response(page, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    return new Response("Not found", { status: 404 });
  },
};
