var SuperMath = Object.create(Math);
SuperMath.factorials = [1, 1];
SuperMath.factorial = function (n) {
    n = Math.abs(Math.round(n));
    if (SuperMath.factorials[n]) {
        return SuperMath.factorials[n];
    }
    return SuperMath.factorials[n] = SuperMath.factorial(n - 1) * n;
};
var Complex = (function () {
    function Complex(polarform, data1, data2) {
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
        return new Complex(false, this._real / denominator, this._img / denominator);
    };
    Complex.prototype.clone = function () {
        return new Complex(false, this._real, this._img);
    };
    Complex.prototype.scale = function (factor) {
        return new Complex(false, factor * this._real, factor * this._img);
    };
    Complex.prototype.pow_n = function (n) {
        n = Math.abs(Math.round(n));
        if (n == 0) {
            return new Complex(false, 1, 0);
        }
        if (this._real == 0 && this._img == 0) {
            return new Complex(false, 0, 0);
        }
        var product = this.clone();
        for (var i = 1; i < n; i++) {
            product = Complex.multiply(product, this);
        }
        return product;
    };
    Complex.add = function (a, b) {
        return new Complex(false, a.real + b.real, a.img + b.img);
    };
    Complex.multiply = function (a, b) {
        return new Complex(false, (a.real * b.real) - (a.img * b.img), (a.real * b.img) + (a.img * b.real));
    };
    Complex.divide = function (a, b) {
        var z = b.inverse();
        return z == null ? null : Complex.multiply(a, z);
    };
    Complex.exp = function (z) {
        var sum = z.clone();
        for (var n = 1; n < Complex.EXP_SUM_LIMIT; n++) {
            var a = z.pow_n(n).scale(1 / SuperMath.factorial(n));
            if (a.real == 0 && a.img == 0) {
                break;
            }
            sum = Complex.add(sum, a);
        }
        return sum;
    };
    Complex.EXP_SUM_LIMIT = 42;
    return Complex;
})();
