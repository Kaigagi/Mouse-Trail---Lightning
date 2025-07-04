This is a small experiment on advanced mouse trails that spawns "lightning balls" on its way. The amount of "balls" is customizable (through code). Beware that spawning too much "balls" might cause overload for your system.
# How to use
- Clone the repo
- Open the "index.html" file"
- Enjoy

# Twisting the properties
To play around with the mouse trails. Changing these properties can achieve different results which sound fun!
lightningAmplitude in handleCircle function decide the amplitude of the lightning (the length of the perpendicular line with the distance between 2 balls)
```
let lightningAmplitude = 60;
```
Speed, color and size can be adjusted within Circle class
```
this.r = Math.random()*30;
this.speed = 2;
this.speedX = Math.random()*this.speed-this.speed/2;
this.speedY = Math.random()*this.speed-this.speed/2;
this.shrinkSpeed = Math.random()*0.05+0.05;
this.color = /*"hsl("+hue+",100%, 50%)"; */ "#7DF9FF"
```
