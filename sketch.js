
// ==== 物理パラメータ ====
let m = 1;
let k = 1;
let v0 = 1;
let L = 150;  // バネ自然長（px）

// ==== シミュレーション用 ==
let t = 0;
let dt = 0.02;

// ==== グラフ描画用 ====
let graph = [];
let graphMaxLength = 800;

// ==== 質点の運動 x1(t), x2(t) ====
function x1(t){
    let A = 0.5 * v0 * Math.sqrt(m/(2*k));
    let w = Math.sqrt(2*k/m);
    return 200 + A * Math.sin(w*t) + 0.5*v0*t*50;
}

function x2(t){
    let A = 0.5 * v0 * Math.sqrt(m/(2*k));
    let w = Math.sqrt(2*k/m);
    return 200 + L + (-A * Math.sin(w*t) + 0.5*v0*t*50);
}


// ===============================
// p5.js メイン
// ================================
function setup(){
    createCanvas(800, 600);  // 上：アニメ、 下：グラフ
}

function draw(){
    background(250);

    // 現在の位置
    let p1 = x1(t);
    let p2 = x2(t);

    // グラフデータ保存
    graph.push({x1: p1, x2: p2});
    if(graph.length > graphMaxLength) graph.shift();

    // --- 上半分：バネと質点の描画 ---
    translate(0, 100);
    drawSimulation(p1, p2);

    // --- 下半分：グラフ ---
    translate(0, 250);
    drawGraph();

    t += dt;
}



// ===============================
// バネと質点の描画
// ===============================
function drawSimulation(p1, p2){
    stroke(0);
    strokeWeight(2);

    // 地面の水平線（基準軸）
    line(0, 50, width, 50);

    // バネ
    line(p1, 50, p2, 50);

    // 質点1
    fill(80, 80, 255);
    circle(p1, 50, 20);
    textSize(16);
    fill(0);
    text("x₁", p1 - 5, 75);

    // 質点2
    fill(255, 80, 80);
    circle(p2, 50, 20);
    fill(0);
    text("x₂", p2 - 5, 75);
}



// ===============================
// グラフ描画
// ===============================
function drawGraph(){
    stroke(0);
    strokeWeight(1);
    line(0, 0, width, 0);    // x 軸

    // グラフの範囲を調整
    let minY = 150;
    let maxY = 450;

    noFill();

    // x1(t) の線
    stroke(0, 0, 255);
    beginShape();
    for(let i=0;i<graph.length;i++){
        let y = map(graph[i].x1, 100, 500, maxY, minY);
        vertex(i, y);
    }
    endShape();

    // x2(t) の線
    stroke(255, 0, 0);
    beginShape();
    for(let i=0;i<graph.length;i++){
        let y = map(graph[i].x2, 100, 500, maxY, minY);
        vertex(i, y);
    }
    endShape();

    // 凡例
    fill(0,0,255); noStroke();
    text("x₁(t)", 10, -20);

    fill(255,0,0);
    text("x₂(t)", 60, -20);
}
