varying vec2 vUv;

uniform sampler2D uMap;
uniform sampler2D uMask;
uniform sampler2D uGradient;
uniform float uProgress;
uniform vec2 spriteSheetSize;   // In px
uniform vec2 spriteSize;        // In px
uniform float uAlpha;

// vec4 LinearTosRGB(vec4 value) {
// 	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
// }

void main() {
  //map les uv de la texture sur le mesh
  vec4 texel = texture2D(uMap, vUv);

  float w = spriteSheetSize.x;
  float h = spriteSheetSize.y;
  // Normalize sprite size (0.0-1.0)
  float dx = spriteSize.x / w;
  float dy = spriteSize.y / h;
  // Figure out number of tile cols of sprite sheet
  float cols = w / spriteSize.x;
  // From linear index to row/col pair
  float col = mod(uProgress, cols);
  float row = floor(0.0 / cols);

  vec2 uv = vec2(dx * vUv.x + col * dx, 1.0 - dy - row * dy + dy * vUv.y);

  //sampler dans la texture juste une valeur pour l'alpha
  float noiseTexture = texture2D(uMask, uv).r;

  float contour = step(noiseTexture, 0.6) - step(noiseTexture, 0.4);
  noiseTexture = step(0.1, noiseTexture);

  texel.rgb = mix(texel.rgb, vec3(46.0/255.0, 41.0/255.0, 34.0/255.0), contour);
  texel.a *= noiseTexture;

  texel.a *= mix(0.0, texel.a, uAlpha);

  gl_FragColor = texel;
}
