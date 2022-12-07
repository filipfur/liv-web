export class ShaderProgram {
  internal: any;
  locations: any;

  constructor(vsSource, fsSource) {
    console.log(gl);
    this.internal = initShaderProgram(vsSource, fsSource);
    this.locations = {};
  }

  use() {
    gl.useProgram(this.internal);
  }

  loadLocation(name) {
    if (name in this.locations == false) {
      this.locations[name] = gl.getUniformLocation(this.internal, name);
    }
  }

  setUniform1f(name, value) {
    this.loadLocation(name);
    gl.uniform1f(this.locations[name], value);
  }

  setUniform2f(name, value) {
    this.loadLocation(name);
    gl.uniform2f(this.locations[name], value);
  }

  setUniform3f(name, value) {
    this.loadLocation(name);
    gl.uniform3f(this.locations[name], value);
  }

  setUniform4f(name, value) {
    this.loadLocation(name);
    gl.uniform4f(this.locations[name], value);
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
export function initShaderProgram(vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
