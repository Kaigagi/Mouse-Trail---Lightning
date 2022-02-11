class Vector {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    //tổng 2 vector
    add(vector){
        return new Vector(vector.x+this.x,vector.y+this.y);
    }

    // tích 2 vector
    dot(vector){
        return vector.x*this.x + vector.y*this.y;
    }

    // độ dài vector
    length(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    // tích với 1 số 
    multi(n){
        return new Vector(this.x*n,this.y*n);
    }

    // Góc giữa 2 vector
    consinOfAngleBetween(vector){
        return (this.dot(vector))/(this.length()*vector.length());
    }

    // Chuẩn hoá vector
    normalize(){
        return new Vector(this.x/this.length(),this.y/this.length());
    }
}