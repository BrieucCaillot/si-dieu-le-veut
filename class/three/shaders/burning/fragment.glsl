varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uNoise;
uniform sampler2D uGradient;
uniform float uDissolve;

void main() {
  vec4 texel = texture2D(uTexture, vUv);
  float noiseTexture = texture2D(uNoise, vUv).r;

  float alpha = smoothstep(uDissolve-0.1, uDissolve + 0.1, noiseTexture);
  
  vec3 gradientTexture = texture2D(uGradient, vec2(alpha, 0)).rgb;

  if(alpha == 0.0){
    discard;
  }

  texel.rgb *= gradientTexture;

  gl_FragColor = texel;
  // gl_FragColor = vec4(vec3(alpha), 1.0);
}
