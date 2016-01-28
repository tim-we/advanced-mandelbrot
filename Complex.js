var Complex = (function () {
    function Complex(data1, data2, polarform) {
        if (data1 === void 0) { data1 = 0; }
        if (data2 === void 0) { data2 = 0; }
        if (polarform === void 0) { polarform = false; }
        this._real = 0;
        this._img = 0;
        if (polarform) {
            this._real = data1 * Math.cos(data2);
            this._img = data1 * Math.sin(data2);
        }
        else {
            this._real = data1;
            this._img = data2;
        }
    }
    Object.defineProperty(Complex.prototype, "real", {
        get: function () {
            return this._real;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Complex.prototype, "img", {
        get: function () {
            return this._img;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Complex.prototype, "length", {
        get: function () {
            if (this._real == 0 && this._img == 0) {
                return 0;
            }
            if (this._real == 0 || this._img == 0) {
                return Math.abs(this._real != 0 ? this._real : this._img);
            }
            return Math.sqrt(this._real * this._real + this._img * this._img);
        },
        enumerable: true,
        configurable: true
    });
    Complex.prototype.abs = function () {
        return this.length;
    };
    Object.defineProperty(Complex.prototype, "angle", {
        get: function () {
            if (this._real == 0 && this._img == 0) {
                return 0;
            }
            if (this._real == 0 && this._img < 0) {
                return (-1) * Math.PI / 2;
            }
            if (this._real == 0 && this._img > 0) {
                return Math.PI / 2;
            }
            if (this._real > 0) {
                return Math.atan(this._img / this._real);
            }
            if (this._img < 0) {
                return Math.atan(this._img / this._real) - Math.PI;
            }
            return Math.atan(this._img / this._real) + Math.PI;
        },
        enumerable: true,
        configurable: true
    });
    Complex.prototype.inverse = function () {
        if (this._real == 0 && this._img == 0) {
            return null;
        }
        var denominator = (this._real * this._real) + (this._img * this._img);
        return new Complex(this._real / denominator, this._img / denominator);
    };
    Complex.prototype.clone = function () {
        return new Complex(this._real, this._img);
    };
    Complex.prototype.isNull = function () {
        return this.real == 0 && this.img == 0;
    };
    Complex.prototype.scale = function (factor) {
        return new Complex(factor * this._real, factor * this._img);
    };
    Complex.prototype.conjugate = function () {
        return new Complex(this._real, this._img * (-1));
    };
    Object.defineProperty(Complex.prototype, "conj", {
        get: function () {
            return this.conjugate();
        },
        enumerable: true,
        configurable: true
    });
    Complex.prototype.pow_n = function (n) {
        if (n == 0) {
            return Complex.E1;
        }
        if (this.isNull()) {
            return new Complex();
        }
        if (this._img == 0) {
            return new Complex(Math.pow(this._real, n), 0);
        }
        var product = this.clone();
        for (var i = 1; i < n; i++) {
            product = Complex.multiply(product, this);
        }
        return product;
    };
    Complex.prototype.pow = function (x) {
        if (x.isNull()) {
            return Complex.E1;
        }
        if (this.isNull()) {
            return new Complex();
        }
        if (x.img == 0 && x.real == Math.round(x.real)) {
            return this.pow_n(x.real);
        }
        var ln = 0.5 * Math.log((this._real * this._real) + (this._img * this._img));
        var phi = this.angle;
        var p = new Complex((ln * x.real) - (x.img * phi), (ln * x.img) + (x.real * phi));
        return Complex.exp(p);
    };
    Complex.prototype.toString = function (polarform) {
        if (polarform === void 0) { polarform = false; }
        if (polarform) {
            return this.length + " * e^(i * " + this.angle + ")";
        }
        else {
            return this._real + (this._img < 0 ? " " : " + ") + this._img + "i";
        }
    };
    Complex.add = function (a, b) {
        return new Complex(a.real + b.real, a.img + b.img);
    };
    Complex.multiply = function (a, b) {
        return new Complex((a.real * b.real) - (a.img * b.img), (a.real * b.img) + (a.img * b.real));
    };
    Complex.divide = function (a, b) {
        var z = b.inverse();
        return z == null ? null : Complex.multiply(a, z);
    };
    Complex.equals = function (a, b) {
        return a.real == b.real && a.img == b.img;
    };
    Complex.exp = function (z) {
        if (z.img == 0) {
            return new Complex(Math.pow(Math.E, z.real), 0);
        }
        return new Complex(Math.pow(Math.E, z.real), z.img, true);
    };
    Complex.EXP_SUM_LIMIT = 25;
    Complex.E1 = new Complex(1, 0);
    Complex.E2 = new Complex(0, 1);
    return Complex;
}());
