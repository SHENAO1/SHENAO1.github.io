(function () {
  const $ = (selector) => document.querySelector(selector);

  const COLORS = {
    ink: "#10202d",
    soft: "#394c5b",
    line: "rgba(16,32,45,.16)",
    teal: "#168f92",
    teal2: "#22b8b4",
    blue: "#315f9d",
    amber: "#c68421",
    red: "#b84a42",
    paper: "#fffdf8"
  };

  function num(id) {
    const node = $(id);
    return node ? Number(node.value) : 0;
  }

  function setText(id, value) {
    const node = $(id);
    if (node) node.textContent = value;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setupCanvas(canvas) {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width: rect.width, height: rect.height };
  }

  function clear(ctx, width, height, dark) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dark ? "#0b1924" : COLORS.paper;
    ctx.fillRect(0, 0, width, height);
  }

  function drawFrame(ctx, pad, width, height, xLabel, yLabel, dark) {
    const grid = dark ? "rgba(255,255,255,.12)" : COLORS.line;
    const text = dark ? "rgba(236,248,246,.82)" : COLORS.soft;
    const plotWidth = width - pad.l - pad.r;
    const plotHeight = height - pad.t - pad.b;

    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 4; i += 1) {
      const y = pad.t + plotHeight * i / 4;
      ctx.moveTo(pad.l, y);
      ctx.lineTo(width - pad.r, y);
    }
    for (let i = 0; i <= 5; i += 1) {
      const x = pad.l + plotWidth * i / 5;
      ctx.moveTo(x, pad.t);
      ctx.lineTo(x, height - pad.b);
    }
    ctx.stroke();

    ctx.strokeStyle = dark ? "rgba(255,255,255,.3)" : "rgba(16,32,45,.34)";
    ctx.strokeRect(pad.l, pad.t, plotWidth, plotHeight);

    ctx.fillStyle = text;
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(xLabel, pad.l + plotWidth / 2, height - 12);
    ctx.save();
    ctx.translate(18, pad.t + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
  }

  function plotSeries(ctx, series, pad, width, height, opts) {
    const options = opts || {};
    const allY = series.flatMap((item) => item.data.map((point) => point.y).filter(Number.isFinite));
    const allX = series.flatMap((item) => item.data.map((point) => point.x).filter(Number.isFinite));
    let minY = options.minY != null ? options.minY : Math.min(...allY, 0);
    let maxY = options.maxY != null ? options.maxY : Math.max(...allY, 1);
    const minX = options.minX != null ? options.minX : Math.min(...allX, 0);
    const maxX = options.maxX != null ? options.maxX : Math.max(...allX, 1);

    if (Math.abs(maxY - minY) < 1e-9) {
      maxY += 1;
      minY -= 1;
    }

    const plotWidth = width - pad.l - pad.r;
    const plotHeight = height - pad.t - pad.b;
    const xToPx = (x) => pad.l + ((x - minX) / (maxX - minX)) * plotWidth;
    const yToPx = (y) => pad.t + (1 - (y - minY) / (maxY - minY)) * plotHeight;

    if (minY < 0 && maxY > 0) {
      ctx.strokeStyle = "rgba(16,32,45,.32)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(pad.l, yToPx(0));
      ctx.lineTo(width - pad.r, yToPx(0));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    series.forEach((item) => {
      ctx.strokeStyle = item.color;
      ctx.lineWidth = item.width || 2.4;
      ctx.beginPath();
      item.data.forEach((point, index) => {
        const x = xToPx(point.x);
        const y = yToPx(point.y);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    if (options.legend) {
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      let x = pad.l + 8;
      const y = pad.t + 16;
      options.legend.forEach((item) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y - 9, 18, 3);
        ctx.fillStyle = options.dark ? "rgba(236,248,246,.82)" : COLORS.soft;
        ctx.fillText(item.label, x + 24, y - 5);
        x += item.label.length * 12 + 56;
      });
    }
  }

  function inputValue(type, amp, t) {
    if (type === "phase") return amp;
    if (type === "freq") return amp * t;
    return 0.5 * amp * t * t;
  }

  function simulateLoop(config) {
    const options = config || {};
    const order = options.order || 2;
    const wn = options.wn || 8;
    const zeta = options.zeta || 0.707;
    const a3 = options.a3 || 1.1;
    const b3 = options.b3 || 2.4;
    const type = options.type || "freq";
    const amp = options.amp || 4;
    const duration = options.duration || 4;
    const dt = options.dt || 0.002;
    const data = [];

    let thetaL = 0;
    let q1 = 0;
    let q2 = 0;
    const a2 = 2 * zeta;
    const steps = Math.floor(duration / dt);

    for (let i = 0; i <= steps; i += 1) {
      const t = i * dt;
      const thetaI = inputValue(type, amp, t);
      const err = thetaI - thetaL;
      let control = 0;
      if (order === 1) {
        control = wn * err;
      } else if (order === 2) {
        q1 += err * dt;
        control = a2 * wn * err + wn * wn * q1;
      } else {
        q1 += err * dt;
        q2 += q1 * dt;
        control = b3 * wn * err + a3 * wn * wn * q1 + Math.pow(wn, 3) * q2;
      }
      thetaL += control * dt;
      if (i % 8 === 0) data.push({ x: t, input: thetaI, local: thetaL, err: err });
    }

    return data;
  }

  function theoreticalError(order, type, amp, wn) {
    if (type === "phase") return "0";
    if (type === "freq") return order === 1 ? (amp / wn).toFixed(3) : "0";
    if (type === "ramp") {
      if (order === 1) return "inf";
      if (order === 2) return (amp / (wn * wn)).toFixed(3);
      return "0";
    }
    return "0";
  }

  function bandwidth(order, wn, zeta, a3, b3) {
    if (order === 1) return wn / 4;
    if (order === 2) return wn / 8 * (4 * zeta + 1 / zeta);
    const denom = 4 * (a3 * b3 - 1);
    return denom > 0 ? ((a3 * b3 * b3 + a3 * a3 - b3) / denom) * wn : NaN;
  }

  function hMag(order, omega, wn, zeta, a3, b3) {
    const jw = { re: 0, im: omega };
    const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
    const add = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
    const divMag = (n, d) => Math.hypot(n.re, n.im) / Math.max(1e-12, Math.hypot(d.re, d.im));

    if (order === 1) {
      return wn / Math.hypot(wn, omega);
    }

    if (order === 2) {
      const a2 = 2 * zeta;
      const s2 = mul(jw, jw);
      const numerator = add({ re: wn * wn, im: 0 }, { re: 0, im: a2 * wn * omega });
      const denominator = add(add(s2, { re: wn * wn, im: 0 }), { re: 0, im: a2 * wn * omega });
      return divMag(numerator, denominator);
    }

    const s2 = mul(jw, jw);
    const s3 = mul(s2, jw);
    const numerator = add(
      add({ re: Math.pow(wn, 3), im: 0 }, { re: 0, im: a3 * wn * wn * omega }),
      { re: b3 * wn * s2.re, im: b3 * wn * s2.im }
    );
    const denominator = add(
      add(add(s3, { re: b3 * wn * s2.re, im: b3 * wn * s2.im }), { re: 0, im: a3 * wn * wn * omega }),
      { re: Math.pow(wn, 3), im: 0 }
    );
    return divMag(numerator, denominator);
  }

  function drawHero() {
    const order = Math.round(num("#heroOrder"));
    const wn = num("#heroWn");
    const alpha = num("#heroAccel");
    const canvas = setupCanvas($("#heroCanvas"));
    if (!canvas) return;
    setText("#heroOrderOut", order);
    setText("#heroWnOut", wn.toFixed(1));
    setText("#heroAccelOut", alpha.toFixed(1));

    clear(canvas.ctx, canvas.width, canvas.height, true);
    const pad = { l: 54, r: 22, t: 26, b: 46 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "t / s", "phase / rad", true);
    const data = simulateLoop({ order: order, wn: wn, type: "ramp", amp: alpha, duration: 3.2, dt: 0.0015 });
    plotSeries(
      canvas.ctx,
      [
        { data: data.map((item) => ({ x: item.x, y: item.input })), color: "#ecf8f6", width: 2.4 },
        { data: data.map((item) => ({ x: item.x, y: item.local })), color: COLORS.teal2, width: 2.8 },
        { data: data.map((item) => ({ x: item.x, y: item.err })), color: COLORS.amber, width: 2.2 }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        legend: [
          { label: "input", color: "#ecf8f6" },
          { label: "local", color: COLORS.teal2 },
          { label: "error", color: COLORS.amber }
        ],
        dark: true
      }
    );
    const lastErr = data[data.length - 1].err;
    canvas.ctx.fillStyle = "rgba(236,248,246,.78)";
    canvas.ctx.font = "13px sans-serif";
    canvas.ctx.textAlign = "left";
    canvas.ctx.fillText(
      `tail error ${lastErr.toFixed(3)} rad, Bn ~ ${bandwidth(order, wn, 0.707, 1.1, 2.4).toFixed(2)} Hz`,
      pad.l + 8,
      canvas.height - 18
    );
  }

  function drawD1() {
    const k = num("#d1Gain");
    const dw = num("#d1Freq");
    const step = num("#d1Step");
    const canvas = setupCanvas($("#d1Canvas"));
    if (!canvas) return;
    setText("#d1GainOut", k.toFixed(1));
    setText("#d1FreqOut", dw.toFixed(1));
    setText("#d1StepOut", step.toFixed(1));
    setText("#d1Err", (dw / k).toFixed(2));
    setText("#d1Tau", `${(1 / k).toFixed(2)}s`);

    clear(canvas.ctx, canvas.width, canvas.height, false);
    const pad = { l: 54, r: 22, t: 24, b: 44 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "t / s", "phase / rad", false);
    const data = [];
    let local = 0;
    const dt = 0.004;
    for (let t = 0; t <= 5; t += dt) {
      const input = step + dw * t;
      const err = input - local;
      local += k * err * dt;
      if (Math.round(t / dt) % 4 === 0) data.push({ x: t, input: input, local: local, err: err });
    }
    plotSeries(
      canvas.ctx,
      [
        { data: data.map((item) => ({ x: item.x, y: item.input })), color: COLORS.blue },
        { data: data.map((item) => ({ x: item.x, y: item.local })), color: COLORS.teal },
        { data: data.map((item) => ({ x: item.x, y: item.err })), color: COLORS.amber }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        legend: [
          { label: "theta_i", color: COLORS.blue },
          { label: "theta_l", color: COLORS.teal },
          { label: "error", color: COLORS.amber }
        ]
      }
    );
  }

  function drawD2() {
    const order = Math.round(num("#d2Order"));
    const wn = num("#d2Wn");
    const zeta = num("#d2Zeta");
    const a3 = num("#d2A3");
    const b3 = num("#d2B3");
    const bn = bandwidth(order, wn, zeta, a3, b3);
    const canvas = setupCanvas($("#d2Canvas"));
    if (!canvas) return;
    setText("#d2OrderOut", order);
    setText("#d2WnOut", wn.toFixed(1));
    setText("#d2ZetaOut", zeta.toFixed(3));
    setText("#d2A3Out", a3.toFixed(2));
    setText("#d2B3Out", b3.toFixed(2));
    setText("#d2Bn", Number.isFinite(bn) ? bn.toFixed(2) : "invalid");
    setText("#d2Coeff", Number.isFinite(bn) ? (bn / wn).toFixed(3) : "--");

    clear(canvas.ctx, canvas.width, canvas.height, false);
    const pad = { l: 58, r: 22, t: 24, b: 48 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "f / Hz", "|H|, |E|", false);
    const maxF = Math.max(wn * 3, 20);
    const pointsH = [];
    const pointsE = [];
    const pointsArea = [];
    for (let i = 0; i <= 360; i += 1) {
      const f = maxF * i / 360;
      const omega = 2 * Math.PI * f;
      const h = hMag(order, omega, wn, zeta, a3, b3);
      pointsH.push({ x: f, y: h });
      pointsE.push({ x: f, y: clamp(Math.abs(1 - h), 0, 1.8) });
      pointsArea.push({ x: f, y: h * h });
    }
    plotSeries(
      canvas.ctx,
      [
        { data: pointsH, color: COLORS.teal, width: 2.6 },
        { data: pointsArea, color: COLORS.amber, width: 2.2 },
        { data: pointsE, color: COLORS.blue, width: 2 }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        minY: 0,
        maxY: 1.45,
        minX: 0,
        maxX: maxF,
        legend: [
          { label: "|H|", color: COLORS.teal },
          { label: "|H|^2", color: COLORS.amber },
          { label: "approx |E|", color: COLORS.blue }
        ]
      }
    );
  }

  function drawD3() {
    const order = Math.round(num("#d3Order"));
    const input = $("#d3Input") ? $("#d3Input").value : "freq";
    const wn = num("#d3Wn");
    const amp = num("#d3Amp");
    const canvas = setupCanvas($("#d3Canvas"));
    if (!canvas) return;
    const data = simulateLoop({ order: order, wn: wn, type: input, amp: amp, duration: 4.5, dt: 0.002 });
    const last = data[data.length - 1];
    const theory = theoreticalError(order, input, amp, wn);
    setText("#d3OrderOut", order);
    setText("#d3WnOut", wn.toFixed(1));
    setText("#d3AmpOut", amp.toFixed(1));
    setText("#d3Steady", last.err.toFixed(3));
    setText("#d3Theory", theory);

    clear(canvas.ctx, canvas.width, canvas.height, false);
    const pad = { l: 54, r: 22, t: 24, b: 44 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "t / s", "phase / rad", false);
    plotSeries(
      canvas.ctx,
      [
        { data: data.map((item) => ({ x: item.x, y: item.input })), color: COLORS.blue },
        { data: data.map((item) => ({ x: item.x, y: item.local })), color: COLORS.teal },
        { data: data.map((item) => ({ x: item.x, y: item.err })), color: COLORS.amber }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        legend: [
          { label: "theta_i", color: COLORS.blue },
          { label: "theta_l", color: COLORS.teal },
          { label: "error", color: COLORS.amber }
        ]
      }
    );
  }

  function drawD4() {
    const k = num("#d4K");
    const dw = num("#d4Dw");
    const alpha = num("#d4Alpha");
    const canvas = setupCanvas($("#d4Canvas"));
    if (!canvas) return;
    setText("#d4KOut", k.toFixed(1));
    setText("#d4DwOut", dw.toFixed(1));
    setText("#d4AlphaOut", alpha.toFixed(1));
    setText("#d4FreqErr", (dw / k).toFixed(2));
    setText("#d4Bn", (k / 4).toFixed(2));

    clear(canvas.ctx, canvas.width, canvas.height, false);
    const pad = { l: 58, r: 22, t: 24, b: 48 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "t / s", "error / rad", false);
    const freq = [];
    const ramp = [];
    let localF = 0;
    let localR = 0;
    const dt = 0.003;
    for (let t = 0; t <= 5; t += dt) {
      const inputF = dw * t;
      const errF = inputF - localF;
      localF += k * errF * dt;
      const inputR = 0.5 * alpha * t * t;
      const errR = inputR - localR;
      localR += k * errR * dt;
      if (Math.round(t / dt) % 5 === 0) {
        freq.push({ x: t, y: errF });
        ramp.push({ x: t, y: errR });
      }
    }
    plotSeries(
      canvas.ctx,
      [
        { data: freq, color: COLORS.teal },
        { data: ramp, color: COLORS.red }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        legend: [
          { label: "freq step", color: COLORS.teal },
          { label: "freq ramp", color: COLORS.red }
        ]
      }
    );

    const err = dw / k;
    const allY = freq.concat(ramp).map((point) => point.y);
    const minY = Math.min(...allY, 0);
    const maxY = Math.max(...allY, err, 1);
    const y = pad.t + (1 - (err - minY) / (maxY - minY)) * (canvas.height - pad.t - pad.b);
    canvas.ctx.strokeStyle = COLORS.amber;
    canvas.ctx.setLineDash([6, 5]);
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(pad.l, y);
    canvas.ctx.lineTo(canvas.width - pad.r, y);
    canvas.ctx.stroke();
    canvas.ctx.setLineDash([]);
  }

  function drawD5() {
    const wn = num("#d5Wn");
    const zeta = num("#d5Zeta");
    const alpha = num("#d5Alpha");
    const bn = bandwidth(2, wn, zeta, 1.1, 2.4);
    const rampErr = alpha / (wn * wn);
    const canvasA = setupCanvas($("#d5CanvasA"));
    const canvasB = setupCanvas($("#d5CanvasB"));
    if (!canvasA || !canvasB) return;
    setText("#d5WnOut", wn.toFixed(1));
    setText("#d5ZetaOut", zeta.toFixed(3));
    setText("#d5AlphaOut", alpha.toFixed(1));
    setText("#d5Bn", bn.toFixed(2));
    setText("#d5RampErr", rampErr.toFixed(3));

    const a2 = 2 * zeta;
    const stepData = simulateLoop({ order: 2, wn: wn, zeta: zeta, type: "phase", amp: 1, duration: 4, dt: 0.0015 });
    const rampData = simulateLoop({ order: 2, wn: wn, zeta: zeta, type: "ramp", amp: alpha, duration: 4, dt: 0.002 });

    clear(canvasA.ctx, canvasA.width, canvasA.height, false);
    const padA = { l: 48, r: 18, t: 24, b: 42 };
    drawFrame(canvasA.ctx, padA, canvasA.width, canvasA.height, "t / s", "step response", false);
    plotSeries(
      canvasA.ctx,
      [
        { data: stepData.map((item) => ({ x: item.x, y: item.input })), color: COLORS.blue },
        { data: stepData.map((item) => ({ x: item.x, y: item.local })), color: COLORS.teal }
      ],
      padA,
      canvasA.width,
      canvasA.height,
      {
        minY: -0.1,
        maxY: 1.5,
        legend: [
          { label: "theta_i", color: COLORS.blue },
          { label: "theta_l", color: COLORS.teal }
        ]
      }
    );
    canvasA.ctx.fillStyle = COLORS.soft;
    canvasA.ctx.font = "12px sans-serif";
    canvasA.ctx.fillText(`a2 = 2 zeta = ${a2.toFixed(3)}`, padA.l + 6, canvasA.height - 16);

    clear(canvasB.ctx, canvasB.width, canvasB.height, false);
    const padB = { l: 48, r: 18, t: 24, b: 42 };
    drawFrame(canvasB.ctx, padB, canvasB.width, canvasB.height, "t / s", "ramp error", false);
    plotSeries(
      canvasB.ctx,
      [{ data: rampData.map((item) => ({ x: item.x, y: item.err })), color: COLORS.amber }],
      padB,
      canvasB.width,
      canvasB.height,
      { legend: [{ label: "error", color: COLORS.amber }] }
    );
    canvasB.ctx.fillStyle = COLORS.soft;
    canvasB.ctx.font = "12px sans-serif";
    canvasB.ctx.fillText(`theory alpha / wn^2 = ${rampErr.toFixed(3)}`, padB.l + 6, canvasB.height - 16);
  }

  function drawD6() {
    const wn = num("#d6Wn");
    const a3 = num("#d6A3");
    const b3 = num("#d6B3");
    const alpha = num("#d6Alpha");
    const stable = a3 > 0 && b3 > 0 && a3 * b3 > 1;
    const bn = bandwidth(3, wn, 0.707, a3, b3);
    const canvas = setupCanvas($("#d6Canvas"));
    if (!canvas) return;
    setText("#d6WnOut", wn.toFixed(1));
    setText("#d6A3Out", a3.toFixed(2));
    setText("#d6B3Out", b3.toFixed(2));
    setText("#d6AlphaOut", alpha.toFixed(1));
    setText("#d6Bn", Number.isFinite(bn) && stable ? bn.toFixed(2) : "invalid");
    setText("#d6Stable", stable ? "stable" : "unstable");
    const stableNode = $("#d6Stable");
    if (stableNode) stableNode.className = stable ? "status-ok" : "status-warn";

    clear(canvas.ctx, canvas.width, canvas.height, false);
    const pad = { l: 56, r: 24, t: 24, b: 48 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "t / s", "phase / rad", false);
    const data = stable
      ? simulateLoop({ order: 3, wn: wn, a3: a3, b3: b3, type: "ramp", amp: alpha, duration: 3.8, dt: 0.0015 })
      : simulateLoop({ order: 3, wn: wn, a3: a3, b3: b3, type: "ramp", amp: alpha, duration: 1.8, dt: 0.0015 });
    plotSeries(
      canvas.ctx,
      [
        { data: data.map((item) => ({ x: item.x, y: item.input })), color: COLORS.blue },
        { data: data.map((item) => ({ x: item.x, y: item.local })), color: stable ? COLORS.teal : COLORS.red },
        { data: data.map((item) => ({ x: item.x, y: item.err })), color: COLORS.amber }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        legend: [
          { label: "theta_i", color: COLORS.blue },
          { label: "theta_l", color: stable ? COLORS.teal : COLORS.red },
          { label: "error", color: COLORS.amber }
        ]
      }
    );
    canvas.ctx.fillStyle = COLORS.soft;
    canvas.ctx.font = "12px sans-serif";
    canvas.ctx.textAlign = "left";
    canvas.ctx.fillText(`criterion a3 * b3 > 1, current ${(a3 * b3).toFixed(2)}`, pad.l + 8, canvas.height - 18);
  }

  function drawD7() {
    const n = Math.round(num("#d7N"));
    const wn = num("#d7Wn");
    const stress = num("#d7Stress");
    const coeff = n === 1 ? 0.25 : n === 2 ? 0.53 : n === 3 ? 0.7845 : 0.7845 + 0.22 * (n - 3);
    const err = stress / Math.pow(wn, n);
    const bn = coeff * wn;
    const canvas = setupCanvas($("#d7Canvas"));
    if (!canvas) return;
    setText("#d7NOut", n);
    setText("#d7WnOut", wn.toFixed(1));
    setText("#d7StressOut", stress.toFixed(1));
    setText("#d7Err", err.toExponential(2));
    setText("#d7Bn", bn.toFixed(2));

    clear(canvas.ctx, canvas.width, canvas.height, false);
    const pad = { l: 58, r: 24, t: 24, b: 48 };
    drawFrame(canvas.ctx, pad, canvas.width, canvas.height, "wn", "normalized", false);
    const errData = [];
    const bnData = [];
    for (let x = 1; x <= 30; x += 0.1) {
      errData.push({ x: x, y: stress / Math.pow(x, n) });
      bnData.push({ x: x, y: coeff * x / 10 });
    }
    const maxErr = Math.max(...errData.map((point) => point.y), bn / 10, 1);
    plotSeries(
      canvas.ctx,
      [
        { data: errData, color: COLORS.red, width: 2.6 },
        { data: bnData, color: COLORS.teal, width: 2.6 }
      ],
      pad,
      canvas.width,
      canvas.height,
      {
        minX: 1,
        maxX: 30,
        minY: 0,
        maxY: Math.min(maxErr, 12),
        legend: [
          { label: "stress / wn^N", color: COLORS.red },
          { label: "Bn / 10", color: COLORS.teal }
        ]
      }
    );
    const plotWidth = canvas.width - pad.l - pad.r;
    const xPos = pad.l + ((wn - 1) / 29) * plotWidth;
    canvas.ctx.strokeStyle = COLORS.amber;
    canvas.ctx.setLineDash([6, 5]);
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(xPos, pad.t);
    canvas.ctx.lineTo(xPos, canvas.height - pad.b);
    canvas.ctx.stroke();
    canvas.ctx.setLineDash([]);
  }

  function updateAll() {
    drawHero();
    drawD1();
    drawD2();
    drawD3();
    drawD4();
    drawD5();
    drawD6();
    drawD7();
  }

  function initControls() {
    const ids = [
      "#heroOrder", "#heroWn", "#heroAccel",
      "#d1Gain", "#d1Freq", "#d1Step",
      "#d2Order", "#d2Wn", "#d2Zeta", "#d2A3", "#d2B3",
      "#d3Order", "#d3Input", "#d3Wn", "#d3Amp",
      "#d4K", "#d4Dw", "#d4Alpha",
      "#d5Wn", "#d5Zeta", "#d5Alpha",
      "#d6Wn", "#d6A3", "#d6B3", "#d6Alpha",
      "#d7N", "#d7Wn", "#d7Stress"
    ];

    ids.forEach((id) => {
      const node = $(id);
      if (!node) return;
      node.addEventListener("input", updateAll);
      node.addEventListener("change", updateAll);
    });

    window.addEventListener("resize", updateAll);
  }

  function initToc() {
    const toc = $("#noteToc");
    const tocShell = $("#noteTocShell");
    if (!toc) return;

    const notePairs = Array.from(document.querySelectorAll(".note-prose h2, .note-prose h3"))
      .map((heading) => {
        const section = heading.closest("section[id]");
        if (!section) return null;
        return { section: section, title: heading.textContent, level: heading.tagName.toLowerCase() };
      })
      .filter(Boolean);

    const interactivePairs = Array.from(document.querySelectorAll(".pll-lecture > section[id]"))
      .map((section) => {
        const heading = section.querySelector("h2, h3");
        if (!heading) return null;
        return { section: section, title: heading.textContent, level: "h3" };
      })
      .filter(Boolean);

    const pairs = notePairs.concat(interactivePairs);
    if (!pairs.length) return;

    pairs.forEach((item) => {
      const link = document.createElement("a");
      link.href = `#${item.section.id}`;
      link.textContent = item.title;
      link.className = item.level === "h3" ? "level-3" : "level-2";
      toc.appendChild(link);
    });

    const syncTocShell = () => {
      if (!tocShell) return;
      if (window.innerWidth <= 760) tocShell.removeAttribute("open");
      else tocShell.setAttribute("open", "");
    };

    const links = Array.from(toc.querySelectorAll("a"));
    const updateActive = () => {
      let activeId = pairs[0].section.id;
      pairs.forEach((item) => {
        if (item.section.getBoundingClientRect().top <= 160) activeId = item.section.id;
      });
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
      });
    };

    syncTocShell();
    window.addEventListener("resize", syncTocShell);
    document.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initControls();
    initToc();
    updateAll();
  });
}());
