var _Math;
(function (_Math) {
    var factorials = [1, 1];
    function factorial(n) {
        n = Math.abs(Math.round(n));
        if (factorials[n]) {
            return factorials[n];
        }
        return factorials[n] = factorial(n - 1) * n;
    }
    _Math.factorial = factorial;
})(_Math || (_Math = {}));
