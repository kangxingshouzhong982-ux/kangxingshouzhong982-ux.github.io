// --- パラメーター ---
let mSlider, kSlider, v0Slider, LSlider;
let m = 1.0, k = 1.0, v0 = 1.0, L = 1.0;

let omega;
let t = 0;
let dt = 0.02;  // 小さくして速度を遅く

let x1_list = [];
let x2_list = [];
let t_list = [];

function x1(t, v0, k, m) {
  let omega = Math.sqrt(2*k/m);
  return 0.5 * v0 * Math.sqrt(m/(2*k)) * Math.sin(omega*t) + 0.5*v0*t;
}

function x2(t, v0, k, m, L) {
  let omega = Math.sqrt(2*k/m);
  return -0.5 * v0 * Math.sqrt(m/(2*k)) * Math.sin(omega*t) + 0.5*v0*t + L;
}

// バネをジグザグで描く
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
  createCanvas(1200, 500); // 横長に拡大
  textSize(14);
  
  // スライダー作成
  mSlider = createSlider(0.1, 5, 1, 0.1);
  mSlider.position(20, 20);
  kSlider = createSlider(0.1, 5, 1, 0.1);
  kSlider.position(20, 50);
  v0Slider = createSlider(0, 5, 1, 0.1);
  v0Slider.position(20, 80);
  LSlider = createSlider(0, 5, 1, 0.1);
  LSlider.position(20, 110);
}

function draw() {
  background(255);
  
  // スライダーから値取得
  m = mSlider.value();
  k = kSlider.value();
  v0 = v0Slider.value();
  L = LSlider.value();
  
  // パラメータ表示
  fill(0);
  noStroke();
  text("質量 m = " + m, 160, 35);
  text("バネ定数 k = " + k, 160, 65);
  text("初速度 v0 = " + v0, 160, 95);
  text("初期間隔 L = " + L, 160, 125);
  
  let scale = 100; // 横スケールを大きく
  
  // 上段：バネ＋小球
  push();
  translate(50, 150);
  let p1 = x1(t, v0, k, m) * scale;
  let p2 = x2(t, v0, k, m, L) * scale;
  
  // 小球
  fill(255,0,0);
  ellipse(p1, 0, 20, 20);
  fill(0,0,255);
  ellipse(p2, 0, 20, 20);
  
  // ラベル
  fill(0);
  textAlign(CENTER);
  text("x1", p1, -20);
  text("x2", p2, -20);
  
  // バネ
  stroke(0);
  strokeWeight(2);
  drawSpring(p1, p2);
  pop();
  
  // 下段：x1(t), x2(t) のグラフ
  push();
  translate(50, 350);
  stroke(255,0,0);
  noFill();
  beginShape();
  x1_list.push(p1/scale);  // グラフはスケール無し
  t_list.push(t);
  for (let i=0; i<x1_list.length; i++){
    vertex(i*5, -x1_list[i]*scale);
  }
  endShape();
  
  stroke(0,0,255);
  noFill();
  beginShape();
  x2_list.push(p2/scale);
  for (let i=0; i<x2_list.length; i++){
    vertex(i*5, -x2_list[i]*scale);
  }
  endShape();
  pop();
  
  t += dt;
}
