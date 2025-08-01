// GodRaysShader.js
// From three.js examples/jsm/shaders/GodRaysShader.js
// https://github.com/mrdoob/three.js/blob/master/examples/jsm/shaders/GodRaysShader.js

export const GodRaysShader = {
    uniforms: {
        tInput: { value: null },
        fStepSize: { value: 1.0 },
        vLightPositionScreenSpace: { value: null },
        fIntensity: { value: 0.9 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tInput;
        uniform float fStepSize;
        uniform vec3 vLightPositionScreenSpace;
        uniform float fIntensity;
        void main() {
            // sample screen space light rays
            vec2 delta = vUv - vLightPositionScreenSpace.xy;
            float dist = length(delta);
            vec2 stepv = fStepSize * delta / dist;
            float iters = dist / fStepSize;
            vec2 uv = vUv;
            float col = 0.0;
            for (float i = 0.0; i < 60.0; i += 1.0) {
                if (i > iters) break;
                uv -= stepv;
                col += texture2D(tInput, uv).r;
            }
            col *= fIntensity / 60.0;
            gl_FragColor = vec4(vec3(col), 1.0);
        }
    `
};

