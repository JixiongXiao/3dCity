attribute float aSize;
varying float vSize;
uniform float uTime;
uniform vec3 uColor;
uniform float uLength;

void main() {
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position,1.0);
    gl_Position = projectionMatrix * viewPosition;
    // vSize设置时最大值为1000，-500之后说明当前vSize是从-500到500,
    // 在片元着色器中已经设定vsize小于0时不显示，所以当前线条只会显示后半段
    vSize = aSize - uTime;
    if(vSize < 0.0) {
        vSize = vSize + uLength;
    }
    vSize = (vSize - 500.0) * 0.1;
    gl_PointSize = -vSize / viewPosition.z;
}