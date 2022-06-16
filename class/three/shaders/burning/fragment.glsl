varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uNoise;
uniform sampler2D uGradient;
uniform float uDissolve;

void main() {
  vec4 texel = texture2D(uTexture, vUv);
  float noiseTexture = texture2D(uNoise, vUv).r;

  float alpha = smoothstep(uDissolve - 0.1, uDissolve + 0.1, noiseTexture);

  vec3 gradientTexture = texture2D(uGradient, vec2(alpha, 0)).rgb;

  if(texel.a < 0.5 || alpha == 0.0) {
    discard;
  }

  texel.rgb *= gradientTexture;

  gl_FragColor = texel;
}
