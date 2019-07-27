window.onload = () => {
    const container = document.getElementById('container');
    if (!container) {
        throw new Error('containerの取得失敗');
    }

    const canvas = createCanvas(container);
    canvas.height = 500;
    canvas.width = 500;

    const gl = getGLContext(canvas);
    const sp = getShaderProgram(gl);
    setAttributes(gl, sp);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function createCanvas(parentElem: HTMLElement | null): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    if (parentElem) {
        parentElem.appendChild(canvas);
    }
    return canvas;
}

function getGLContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (!gl) {
        throw new Error('GLContextの取得失敗');
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return gl;
}

function getShaderProgram(gl: WebGL2RenderingContext): WebGLProgram {
    const sp = gl.createProgram();
    if (!sp) {
        throw new Error('ShaderProgram作成失敗');
    }
    gl.attachShader(sp, getShaderObject(gl, gl.VERTEX_SHADER, require('./glsl/vert.glsl').default));
    gl.attachShader(sp, getShaderObject(gl, gl.FRAGMENT_SHADER, require('./glsl/frag.glsl').default));
    gl.linkProgram(sp);
    if (!gl.getProgramParameter(sp, gl.LINK_STATUS)) {
        throw new Error('リンク失敗');
    }
    gl.useProgram(sp);
    return sp;
}

function getShaderObject(gl: WebGLRenderingContext, type: number, shaderSource: string): WebGLShader {
    const so = gl.createShader(type);
    if (!so) {
        throw new Error('ShaderObject作成失敗');
    }
    gl.shaderSource(so, shaderSource);

    gl.compileShader(so);
    if (!gl.getShaderParameter(so, gl.COMPILE_STATUS)) {
        throw new Error('コンパイル失敗: ' + gl.getShaderInfoLog(so));
    }

    return so;
}

function setAttributes(gl: WebGLRenderingContext, sp: WebGLProgram) {
    const idx = gl.getAttribLocation(sp, 'pos');
    gl.enableVertexAttribArray(idx);

    const vertices = [
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0,
    ];

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(idx, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}
