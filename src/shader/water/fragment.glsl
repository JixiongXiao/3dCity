precision lowp float;
varying float vElevation;
uniform vec3 uHighColor;
uniform vec3 uLowColor;
uniform float uOpacity;

void main() {
    float opacity = (vElevation + 1.0) / 2.0; 
    vec3 mixColor = mix(uLowColor, uHighColor, opacity);
          gl_FragColor = vec4(mixColor, uOpacity);
      }