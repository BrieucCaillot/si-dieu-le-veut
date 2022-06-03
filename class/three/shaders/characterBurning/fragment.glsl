varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uNoise;
uniform sampler2D uGradient;
uniform float uDissolve;

void main() {
  vec4 texel = texture2D(uTexture, vUv);
  float noiseTexture = texture2D(uNoise, vUv).r;

  // float r = 1.0/236.0;
  // float g = 1.0/223.0;
  // float b = 1.0/203.0;

  float alpha = smoothstep(uDissolve-0.1, uDissolve + 0.1, noiseTexture);
  
  // vec3 gradientTexture = texture2D(uGradient, vec2(alpha, 0)).rgb;

  if(texel.a < 0.01 ){
    discard;
  }

  // texel.rgb *= gradientTexture;

  // gl_FragColor = texel;
  gl_FragColor = vec4(vec3(texel.rgb), texel.a);
}
