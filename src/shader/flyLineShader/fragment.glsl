varying float vSize;
uniform vec3 uColor;

void main() {
    // gl_PointCoord是一个从0到1的值，所以获得的该距离最大值为0.5
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5,0.5));
    // 当strenght为1时说明像素点到圆心的距离为0，所以亮度要最高
    float strenght = 1.0 - (distanceToCenter * 2.0);
    if(vSize <= 0.0 ) {
    gl_FragColor= vec4(1.0,0.0,0.0,0.0);
    } else {
    gl_FragColor= vec4(uColor,strenght);
    }
}