var Complex = (function () {
    function Complex(datatype, data1, data2) {
        this._real = 0;
        this._img = 0;
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
    Complex.add = function (a, b) {
        return new Complex(false, a.real + b.real, a.img + b.img);
    };
    Complex.multiply = function (a, b) {
        return new Complex(false, (a.real * b.real) - (a.img * b.img), (a.real * b.img) + (a.img * b.real));
    };
    return Complex;
})();
