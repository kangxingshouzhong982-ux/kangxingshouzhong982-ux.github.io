// --- パラメータ ---
let mSlider, kSlider, v0Slider, LSlider, tSlider;
let m=1, k=1, v0=1, L=1;
let autoPlay = true;

let t = 0;
let dt = 0.02;

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

function drawSpring(x_start, x_end, n=20, amp=15) {
  let xs = [], ys = [];
  for(let i=0;i<=n;i++){
    let xi = map(i,0,n,x_start,x_end);
    let yi = 0;
    if(i!=0 && i!=n) yi = amp*((i%2)*2-1);
    xs.push(xi); ys.push(yi);
  }
  noFill(); beginShape();
  for(let i=0;i<xs.length;i++) vertex(xs[i],ys[i]);
  endShape();
}

function setup() {
  createCanvas(1400,500);
  textSize(14);

  // パラメータスライダー
  mSlider = createSlider(0.1,5,1,0.1); mSlider.position(20,20);
  kSlider = createSlider(0.1,5,1,0.1); kSlider.position(20,50);
  v0Slider = createSlider(0,5,1,0.1); v0Slider.position(20,80);
  LSlider = createSlider(0,5,1,0.1); LSlider.position(20,110);

  // 時刻スライダー（手動で確認用）
  tSlider = createSlider(0,50,0,0.01); tSlider.position(20, 140);
}

function draw() {
  background(255);

  // スライダー取得
  m = mSlider.value();
  k = kSlider.value();
  v0 = v0Slider.value();
  L = LSlider.value();

  // パラメータ表示
  fill(0); noStroke();
  text("質量 m="+m,160,35);
  text("バネ定数 k="+k,160,65);
  text("初速度 v0="+v0,160,95);
  text("初間隔 L="+L,160,125);
  text("時刻 t="+t.toFixed(2),160,155);

  // --- 自動再生 ---
  if(autoPlay){
    t += dt;
    tSlider.value(t); // スライダーに同期
  } else {
    t = tSlider.value();
  }

  let scale = 100;

  // --- 上段: バネ＋小球 ---
  push();
  translate(50,150);
  let p1 = x1(t,v0,k,m)*scale;
  let p2 = x2(t,v0,k,m,L)*scale;

  fill(255,0,0); ellipse(p1,0,20,20);
  fill(0,0,255); ellipse(p2,0,20,20);

  fill(0); textAlign(CENTER);
  text("x1",p1,-20); text("x2",p2,-20);

  stroke(0); strokeWeight(2);
  drawSpring(p1,p2);
  pop();

  // --- 下段: グラフ ---
  let graphX = 50;
  let graphY = 350;
  let graphW = width - 2*graphX;
  let graphH = 180;   // 高さを長く
  let maxT = 50;      // グラフ最大表示時間
  let yScale = scale; // 縦スケール

  // 保存
  x1_list.push(x1(t,v0,k,m));
  x2_list.push(x2(t,v0,k,m,L));
  t_list.push(t);

  // 軸
  push();
  translate(graphX, graphY);
  stroke(0); strokeWeight(1);
  line(0,0,graphW,0);      // X軸
  line(0,0,0,-graphH);     // Y軸
  fill(0); textAlign(RIGHT); text("0", -5, 5);

  // X軸目盛（細かく）
  let xStep = 5;
  for(let i=1;i<=maxT;i+=xStep){
    let x = map(i,0,maxT,0,graphW);
    line(x,0,x,5); text(i,x,15);
  }

  // Y軸目盛（細かく）
  let yMax = 4;  // 最大表示値
  let yStep = 0.5;
  for(let i=yStep;i<=yMax;i+=yStep){
    let y = map(i,0,yMax,0,graphH);
    line(-5,-y,0,-y); text(i.toFixed(1), -10,-y);
  }

  // x1(t) グラフ
  stroke(255,0,0); noFill();
  beginShape();
  for(let i=0;i<t_list.length;i++){
    if(t_list[i]>maxT) continue;
    let gx = map(t_list[i],0,maxT,0,graphW);
    let gy = -x1_list[i]*yScale;
    vertex(gx,gy);
  }
  endShape();

  // x2(t) グラフ
  stroke(0,0,255); noFill();
  beginShape();
  for(let i=0;i<t_list.length;i++){
    if(t_list[i]>maxT) continue;
    let gx = map(t_list[i],0,maxT,0,graphW);
    let gy = -x2_list[i]*yScale;
    vertex(gx,gy);
  }
  endShape();
  pop();
}
