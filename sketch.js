let m = 1;
let k = 1;
let v0 = 1;
let L = 2; // 物理単位（見た目用にスケールで調整）
let A, omega;
let t = 0;

function setup() {
  createCanvas(windowWidth, 200);
  A = 0.5 * v0 * Math.sqrt(m / (2 * k));
  omega = Math.sqrt(2 * k / m);
}

function draw() {
  background(240);
  t += 0.02;

  // 物理的座標（必要ならスケールを掛けて見やすく）
  let scale = 60;
  let x1 = A * Math.sin(omega * t) + 0.5 * v0 * t;
  let x2 = L + 0.5 * v0 * t - A * Math.sin(omega * t);

  let X1 = 50 + x1 * scale;
  let X2 = 50 + x2 * scale;

  // 壁
  stroke(0);
  line(50, 50, 50, 150);

  // 質点
  fill(0);
  circle(X1, 100, 20);
  circle(X2, 100, 20);

  // バネ（ジグザグ）
  drawSpring(X1, X2, 12);
}

function drawSpring(a, b, n) {
  let y = 100;
  let dx = (b - a) / n;
  let dir = 1;
  noFill();
  beginShape();
  for (let i = 0; i <= n; i++) {
    let x = a + dx * i;
    let yy = y + (i == 0 || i == n ? 0 : dir * 15);
    vertex(x, yy);
    dir *= -1;
  }
  endShape();
}
