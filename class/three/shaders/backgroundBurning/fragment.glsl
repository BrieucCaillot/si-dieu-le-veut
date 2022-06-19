varying vec2 vUv;

uniform sampler2D uNoise;
uniform sampler2D uGradient;
uniform vec3 uColor;
uniform float uDissolve;

void main() {
  float noiseTexture = texture2D(uNoise, vUv).r;

  float alpha = smoothstep(uDissolve - 0.1, uDissolve + 0.1, noiseTexture);

  vec3 gradientTexture = texture2D(uGradient, vec2(alpha, 0)).rgb;

  vec3 newColor = uColor;
  newColor.rgb *= gradientTexture;

  gl_FragColor = vec4(newColor, alpha);
}
