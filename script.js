// query canvas element
let canvas = document.getElementById("Canvas");
let context = canvas.getContext('2d'); // get context

// các thuộc tính của canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'black';

// resize event
window.addEventListener("resize",function (){
    // đặt lại canvas width và height mỗi khi window resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// thuộc tính của con trỏ chuột
let mouse = {
    x: undefined,
    y: undefined
}

// Số hình tròn tạo ra cùng 1 lúc
let circleNum = 2;

// Chỉ số màu sắc hue
let hue = 0;

// hàm vẽ hình tròn 
function drawCircle(x,y,r) {
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,true);
    context.fill();
    context.closePath();
}

//class Circle tạo nên các hình tròn
class Circle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.r = Math.random()*30;
        this.speed = 2;
        this.speedX = Math.random()*this.speed-this.speed/2;
        this.speedY = Math.random()*this.speed-this.speed/2;
        this.shrinkSpeed = Math.random()*0.05+0.05;
        this.color = /*"hsl("+hue+",100%, 50%)"; */ "hsl(178, 98%, 80%)"
    }

    // Hàm draw vẽ bản thân hình tròn
    draw(){
        context.fillStyle = this.color;
        drawCircle(this.x,this.y,this.r);
    }

    //Cập nhật x, y, r và màu của hình tròn
    // hình tròn sẽ thay đổi x,y ngẫu nhiên và nhỏ lại
    update(){
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        this.r -= this.shrinkSpeed;
    }
}

//Mảng chửa các object Circle
let CircleArray = [];

//Hàm tạo ra cùng lúc n số hình tròn tại 1 điểm và đẩy vào mảng các hình tròn
function init(n) {
    for (let i = 0; i < n; i++) {
        CircleArray.push(new Circle());
    }
}

//For testing
// CircleArray.push(new Circle(300,200));
// CircleArray.push(new Circle(550,450));

// event click chuột sẽ tạo ra một hình tròn
canvas.addEventListener("click",function (event){
    // cập nhật thuộc tính x,y của mouse
    mouse.x = event.x;
    mouse.y = event.y;
    // tạo ra n hình tròn bằng hàm init
    init(circleNum);
})

// event di chuyển chuột sẽ tạo ra nhiều hình tròn theo đường chuột đi
canvas.addEventListener("mousemove",function (event){
    // cập nhật thuộc tính x,y của mouse
    mouse.x = event.x;
    mouse.y = event.y;
    // tạo ra n hình tròn bằng hàm init
    init(circleNum);
})

//Hàm Loop qua mảng các hình tròn, vẽ và cập nhật từng hình tròn
// Hình tròn nào có bán kính < mức đặt ra thì loại bỏ
function handleCircle() {
    for (let i = 0; i < CircleArray.length; i++) {
        CircleArray[i].draw();
        CircleArray[i].update();
        
        // So sánh hình tròn hiện tại vói các hình tròn khác
        //Tạo ra các đường thẳng giữa các hình tròn
        for (let j = i; j < CircleArray.length; j++) {
            let dx = CircleArray[i].x - CircleArray[j].x; // chênh lệch toạ độ x
            let dy = CircleArray[i].y - CircleArray[j].y; // chệnh lệch toạ độ y
            let distance = Math.sqrt(dx * dx + dy * dy); // khoảng cách
            //nếu khoảng cách bé hơn thì vẽ đường thằng giữa 2 hình tròn
            if (distance < 300) {
                // context.beginPath();
                // context.strokeStyle = CircleArray[i].color;
                // context.strokeWidth = CircleArray[i].r*2;
                // context.moveTo(CircleArray[i].x, CircleArray[i].y);
                // context.lineTo(CircleArray[j].x, CircleArray[j].y);
                // context.stroke();
                // context.closePath();

                // upgrade thành tia điện
                let lightningPointNum = Math.random()*2+1;
                let lightningAmplitude = 75;
                let lightningPointArray = [];
                let DVector = new Vector(dx,dy);
                let perpendicularDVector = new Vector(-dy,dx);
                for (let t = 0; t < lightningPointNum; t++) {
                    let lightningPoint = DVector.multi(Math.random());
                    lightningPoint = lightningPoint.add(perpendicularDVector.normalize().multi(Math.random()*lightningAmplitude-lightningAmplitude/2));
                    lightningPointArray.push({projection: 0, lightningPoint: lightningPoint});
                }
                for (let t = 0; t < lightningPointNum; t++) {
                    let cosinBetweenLightningPointAndDVector = (lightningPointArray[t].lightningPoint.dot(DVector))/(lightningPointArray[t].lightningPoint.length()*DVector.length());
                    lightningPointProjectionOnDVector = lightningPointArray[t].lightningPoint.length()*cosinBetweenLightningPointAndDVector;
                    lightningPointArray[t].projection = lightningPointProjectionOnDVector;
                }

                lightningPointArray.sort((a,b)=>a.projection-b.projection);

                for (let t = 0; t < lightningPointNum; t++) {
                    lightningPointArray[t].lightningPoint = lightningPointArray[t].lightningPoint.add(new Vector(CircleArray[j].x,CircleArray[j].y));
                }


                context.beginPath();
                context.strokeStyle = CircleArray[i].color;
                context.lineWidth = 0.5;
                context.moveTo(CircleArray[j].x, CircleArray[j].y);
                for (let t = 0; t < lightningPointNum; t++) { 
                    context.lineTo(lightningPointArray[t].lightningPoint.x, lightningPointArray[t].lightningPoint.y);
                    context.moveTo(lightningPointArray[t].lightningPoint.x, lightningPointArray[t].lightningPoint.y);
                    // context.stroke();
                    // context.closePath();
                }
                context.lineTo(CircleArray[i].x, CircleArray[i].y);
                context.stroke();
                context.closePath();
            }
        }

        // nếu kích thước bé hơn thì loại bỏ
        if(CircleArray[i].r < 0.3){
            CircleArray.splice(i,1);
            i--;
        }
    }
}

// hàm animate sẽ vẽ ra các hình tròn dựa trên toạ dộ chuột được
// cập nhật mỗi khi event click và mousemove xảy ra
function animate() {
    //Xoá frame trước đó
    context.fillStyle = "rgba(0,0,0,0.1)"; // Đè lên một khung có màu đen sáng để làm mờ màu, tạo ra mouse trail
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

    // Gọi hàm handleCircle để vẽ và update các hình tròn
    handleCircle();

    // Tăng chỉ số màu sắc hue lên 1
    hue++;

    requestAnimationFrame(animate); // gọi hàm animate ngay khi vẽ xong 1 frame
}

animate(); // gọi hàm animate lần đầu