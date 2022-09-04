varying vec2 vUv;
void main() {
    float toCenter = 1.0 - step(0.5,distance(vUv,vec2(0.5,0.5)));
    float strength = atan(vUv.x - 0.5, vUv.y -0.5);
    strength = (strength + 3.14) / 6.28;
    gl_FragColor = vec4(1.0,0.0,0.0,toCenter * strength);
}