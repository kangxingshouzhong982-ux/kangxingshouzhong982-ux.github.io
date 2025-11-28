// --- 物理パラメータ ---
let m = 1.0;
let k = 1.0;
let v0 = 1.0;
let L = 1.0;

let omega = Math.sqrt(2 * k / m);

let t = 0;
let dt = 0.05;

let x1_list = [];
let x2_list = [];
let t_list = [];

function x1(t) {
  return 0.5 * v0 * Math.sqrt(m/(2*k)) * Math.sin(omega*t) + 0.5*v0*t;
}

function x2(t) {
  return -0.5 * v0 * Math.sqrt(m/(2*k)) * Math.sin(omega*t) + 0.5*v0*t + L;
}

// --- バネをジグザグで描く ---
function drawSpring(x_start, x_end, n=20, amp=15) {
  let xs = [];
  let ys = [];
  for (let i = 0; i <= n; i++) {
    let xi = map(i, 0, n, x_start, x_end);
    let yi = 0;
    if (i != 0 && i != n) {
      yi = amp * ((i % 2) * 2 - 1);
    }
    xs.push(xi);
    ys.push(yi);
  }
  noFill();
  beginShape();
  for (let i = 0; i < xs.length; i++) {
    vertex(xs[i], ys[i]);
  }
  endShape();
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255);
  
  // 上段：バネ＋小球
  push();
  translate(50, 150);
  let p1 = x1(t);
  let p2 = x2(t);
  
  // 小球
  fill(255,0,0);
  ellipse(p1*50, 0, 20, 20);
  fill(0,0,255);
  ellipse(p2*50, 0, 20, 20);
  
  // ラベル
  fill(0);
  textAlign(CENTER);
  text("x1", p1*50, -20);
  text("x2", p2*50, -20);
  
  // バネ
  stroke(0);
  strokeWeight(2);
  drawSpring(p1*50, p2*50);
  pop();
  
  // 下段：x1(t), x2(t) のグラフ
  push();
  translate(50, 300);
  stroke(255,0,0);
  noFill();
  beginShape();
  x1_list.push(p1);
  t_list.push(t);
  for (let i=0; i<x1_list.length; i++){
    vertex(i*5, -x1_list[i]*50);
  }
  endShape();
  
  stroke(0,0,255);
  noFill();
  beginShape();
  x2_list.push(p2);
  for (let i=0; i<x2_list.length; i++){
    vertex(i*5, -x2_list[i]*50);
  }
  endShape();
  pop();
  
  t += dt;
}
