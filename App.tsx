import * as React from 'react';
import 'typeface-open-sans';
import 'typeface-anton';
import 'typeface-calligraffitti';
import './App.css';
import Header from './Header.tsx';
import { initShaderProgram } from './shader.js';

export default function App() {
  React.useEffect(() => {
    /*const script = document.createElement('script');

    script.src = 'canvas.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };*/

    const vsSource = `
    precision mediump float;
    attribute vec4 aVertexPosition;

    varying vec3 vFragPos;

    void main() {
      vFragPos = aVertexPosition.xyz;
      gl_Position = aVertexPosition;
    }
  `;

    const fsSource = `
    precision mediump float;
    varying vec3 vFragPos;

  void main() {
    gl_FragColor = vec4(1.0, 0.5, 1.0, 0.5) * -vFragPos.xzyz * 0.5 + vec4(1.0, 0.5, 1.0, 0.5) * -vFragPos.zyxz * 0.5;
  }
`;

    const canvas = document.querySelector('#glCanvas');
    const gl = canvas.getContext('webgl');
    if (gl === null) {
      alert(
        'Unable to initialize WebGL. Your browser or machine may not support it.'
      );
      return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const numComponents = 2; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(0, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(0);

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  return (
    <div className="App">
      <canvas id="glCanvas"></canvas>
      <Header />
      <div className="Page">
        <img
          width={500}
          src="https://cdn.images.express.co.uk/img/dynamic/11/590x/secondary/high-blood-pressure-treatment-diet-cocoa-live-longer-4326188.jpg?r=1665074973328"
        ></img>
        <div className="Bread">
          <h2>Kakaoterapi</h2>
          <p>Kakao innehåller bla bla bla.</p>
        </div>
      </div>
    </div>
  );
}
