class ChillyVector {
    constructor(x, y, z) {

        if (!z) {
            z = 0;
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }


    heading() {
        const h = Math.atan2(this.y, this.x);
        return h;
    }

    setHeading(theta) {
        const m = this.mag();
        this.x = m * Math.cos(theta);
        this.y = m * Math.sin(theta);
        return this;
    };

    magSq() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        return x * x + y * y + z * z;
    }

    mag() {
        return Math.sqrt(this.magSq());
    }

    setMag(m) {
        return this.normalize().mult(m);
    }

    normalize() {
        const len = this.mag();
        if (len !== 0) {
            this.mult(1 / len);
        }
        return this;
    }

    copy() {
        return new ChillyVector(this.x, this.y, this.z);
    }

    dist(v) {
        return v.copy().sub(this).mag();
    };




    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;

    }

    static add(a, b) {
        const x = a.x + b.x;
        const y = a.y + b.y;
        return new ChillyVector(x, y);
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    static sub(a, b) {
        const x = a.x - b.x;
        const y = a.y - b.y;
        return new ChillyVector(x, y);
    }

    static lerp(v1, v2, amt) {
        let target = v1.copy();
        target.lerp(v2, amt);
        return target;
    };

    lerp(v, amount) {
        this.x += (v.x - this.x) * amount || 0;
        this.y += (v.y - this.y) * amount || 0;
        this.z += (v.z - this.z) * amount || 0;
        return this;
    };



    mult(v) {
        if (typeof v === 'number') {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        } else {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        }
        return this;
    }

    div(v) {
        if (typeof v === 'number') {
            this.x /= v;
            this.y /= v;
            this.z /= v;
        } else {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
        }
        return this;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        if (z !== null && z !== undefined) {
            this.z = z;
        }
        return this;

    }


    limit(max) {

        const mSq = this.magSq();
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)).mult(max);
        }
        return this;

    }



}





class Chillax {


    constructor(id) {
        this.canvas = document.getElementById(id);
        this.w = this.canvas.clientWidth;
        this.h = this.canvas.clientHeight;
        this.frameRate = 24;



    }


    init() {
        setup();
        setInterval(() => loop(), 1000 / this.frameRate);
    }

    setFrameRate(fr) {
        this.frameRate = fr;
    }

    fullScreen() {
        this.makeCanvasFullScreen();
        window.addEventListener('resize', (e) => {
            this.makeCanvasFullScreen();
        });
    }

    makeCanvasFullScreen() {
        this.styleEntity(this.canvas, { width: window.innerWidth, height: window.innerHeight })
    }


    createEntity(classname) {
        const el = document.createElement('DIV');
        el.classList.add(classname);
        this.canvas.appendChild(el);
        return el;
    }


    styleCanvas(opts) {
        this.styleEntity(this.canvas, opts);
    }


    styleEntity(element, opts) {
        // opts: { background, x,y,rotate,scale, opacity}
        if (opts) {
            let t = '';

            if (opts.x && opts.y) {
                let x = opts.x;
                let y = opts.y;

                if (opts.center) {
                    x -= (element.clientWidth / 2);
                    y -= (element.clientHeight / 2);
                }
                t = `${t} translate(${x}px,${y}px )`;
            }

            if (opts.rotate) {
                let theta = opts.rotate;
                t = `${t} rotate(${theta}deg)`;
            }
            if (opts.scale) {
                let scale = opts.scale;
                t = `${t} scale(${scale})`;
            }
            if (t != '') {
                element.style.transform = t;

            }

            if (opts.opacity) {
                element.style.opacity = opts.opacity;
            }
            if (opts.width) {
                element.style.width = opts.width + 'px';
            }
            if (opts.height) {
                element.style.height = opts.height + 'px';
            }
            if (opts.background) {
                element.style.background = opts.background;
            }
        }


    }



    map(n, start1, stop1, start2, stop2) {
        let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    };

    constrain(n, low, high) {
        return Math.max(Math.min(n, high), low);
    };

    createVector(x, y, z) {
        return new ChillyVector(x, y, z);
    }



}