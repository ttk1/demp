window.onload = () => {
    const container = document.getElementById('container');
    if (!container) {
        throw new Error('containerの取得失敗');
    }

    const width = 500;
    const height = 500;
    const canvas = createCanvas(container, width, height);
    const gl = getGLContext(canvas);

    // オフスクリーンレンダリングした結果をテクスチャに出力
    const sp1 = getShaderProgram(gl, 1);
    gl.useProgram(sp1);
    setAttributes(gl, sp1);
    const fb = createFrameBuffer(gl);
    const tx = createTexture(gl, width, height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tx, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // 上で作成したテクスチャを描画
    const sp2 = getShaderProgram(gl, 2);
    gl.useProgram(sp2);
    setAttributes(gl, sp2);
    gl.bindTexture(gl.TEXTURE_2D, tx);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function createCanvas(parentElem: HTMLElement | null, width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
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

function getShaderProgram(gl: WebGL2RenderingContext, programId: number): WebGLProgram {
    const sp = gl.createProgram();
    if (!sp) {
        throw new Error('ShaderProgram作成失敗');
    }
    gl.attachShader(sp, getShaderObject(gl, gl.VERTEX_SHADER, require(`./glsl/${programId}/vert.glsl`).default));
    gl.attachShader(sp, getShaderObject(gl, gl.FRAGMENT_SHADER, require(`./glsl/${programId}/frag.glsl`).default));
    gl.linkProgram(sp);
    if (!gl.getProgramParameter(sp, gl.LINK_STATUS)) {
        throw new Error('リンク失敗');
    }
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
        1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,
    ];

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(idx, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function createFrameBuffer(gl: WebGLRenderingContext): WebGLFramebuffer {
    const fb = gl.createFramebuffer();
    if (!fb) {
        throw new Error('FrameBuffer作成失敗');
    }
    return fb;
}

function createTexture(gl: WebGLRenderingContext, width: number, height: number): WebGLTexture {
    const tx = gl.createTexture();
    if (!tx) {
        throw new Error('Texture作成失敗');
    }
    gl.bindTexture(gl.TEXTURE_2D, tx);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tx;
}
