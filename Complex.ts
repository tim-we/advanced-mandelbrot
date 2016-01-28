/// <reference path="_Math.ts" />

/*var _Math = {
	
	factorials: [1,1],
	
	factorial: function(n: number): number {
		n = Math.abs(Math.round(n));
		
		if(_Math.factorials[n]) { return _Math.factorials[n]; }
		
		return _Math.factorials[n] = _Math.factorial(n - 1) * n;
	}
};*/

class Complex {
	
	private static EXP_SUM_LIMIT: number = 25;
	private _real: number = 0;
	private _img: number = 0;
	
	public static E1: Complex = new Complex(1, 0);
	public static E2: Complex = new Complex(0, 1);
	
	public get real(): number {
		return this._real;
	}
	
	public get img(): number {
		return this._img;
	}
	
	public get length(): number {
		//avoid sqrt if possible:
		if(this._real == 0 && this._img == 0) { return 0; }		
		if(this._real == 0 || this._img == 0) { return Math.abs( this._real!=0 ? this._real : this._img ); }
		
		return Math.sqrt(this._real * this._real + this._img * this._img);
	}
	
	public abs(): number {
		return this.length;
	}
	
	public get angle(): number {
		if(this._real == 0 && this._img == 0) { return 0; }
		
		if(this._real == 0 && this._img < 0) { return (-1) * Math.PI/2; }
		if(this._real == 0 && this._img > 0) { return Math.PI/2; }
		
		if(this._real > 0) { return Math.atan(this._img / this._real); }
		
		//real < 0
		
		if(this._img < 0) { return Math.atan(this._img / this._real) - Math.PI; }
		
		//img >= 0
		
		return Math.atan(this._img / this._real) + Math.PI;
	}
	
	public inverse(): Complex {
		if(this._real==0 && this._img==0) { return null; }
		
		let denominator: number = (this._real * this._real) + (this._img * this._img);
		
		return new Complex(this._real / denominator, this._img / denominator);
	}
	
	public clone(): Complex {
		return new Complex(this._real, this._img);
	}
	
	public isNull(): boolean {
		return this.real==0 && this.img==0;
	}
	
	public scale(factor: number): Complex {
		return new Complex(factor * this._real, factor * this._img);
	}
	
	public conjugate(): Complex {
		return new Complex(this._real, this._img * (-1));
	}
	
	public get conj(): Complex {
		return this.conjugate();
	}
	
	public pow_n(n: number): Complex {
		
		if(n == 0) { return Complex.E1; }
		if(this.isNull()) { return new Complex(); }
		if(this._img == 0) { return new Complex(Math.pow(this._real , n), 0); }
		
		let product: Complex = this.clone();
		
		for(let i=1; i<n; i++) { product = Complex.multiply(product, this); }
		
		return product;
	}
	
	public pow(x: Complex): Complex {
		if(x.isNull()) { return Complex.E1; }
		if(this.isNull()) { return new Complex(); }
		
		if(x.img == 0 && x.real == Math.round(x.real)) { return this.pow_n(x.real); }
		
		let ln: number = 0.5 * Math.log((this._real * this._real) + (this._img * this._img)); //0.5x same as sqrt
		let phi: number = this.angle;
		
		let p: Complex = new Complex( (ln * x.real) - (x.img * phi), (ln * x.img) + (x.real*phi) );
		
		return Complex.exp(p);
	}
	
	public toString(polarform: boolean = false): string {
		if(polarform) {
			return this.length + " * e^(i * " + this.angle + ")";
		} else {
			return this._real + (this._img < 0 ? " " : " + ") + this._img + "i";
		}
	}

	constructor(data1: number = 0, data2: number = 0, polarform: boolean = false) {
		if(polarform) {
			this._real = data1 * Math.cos(data2);
			this._img = data1 * Math.sin(data2);
		} else {
			this._real = data1;
			this._img = data2;
		}
	}
	
	public static add(a: Complex, b: Complex): Complex {
		return new Complex(a.real + b.real, a.img + b.img);
	}
	
	public static multiply(a: Complex, b: Complex): Complex {
		return new Complex(
				(a.real * b.real) - (a.img * b.img), 
				(a.real * b.img) + (a.img * b.real)
			);
	}
	
	public static divide(a: Complex, b: Complex) {
		let z: Complex = b.inverse();
		
		return z==null ? null : Complex.multiply(a,z);
	}
	
	public static equals(a: Complex, b: Complex) {
		return a.real==b.real && a.img==b.img;
	}
	
	public static exp(z: Complex): Complex {
		if(z.img == 0) { return new Complex(Math.pow(Math.E , z.real), 0); }
		
		return new Complex(Math.pow(Math.E, z.real), z.img, true);
		
		/*//old code:
		var sum: Complex = new Complex(1, 0);
		
		for(let n=1; n<Complex.EXP_SUM_LIMIT; n++) {
			let a: Complex = z.pow_n(n).scale( 1/_Math.factorial(n) );
			
			if(a.real == 0 && a.img == 0) { break; }
				
			sum = Complex.add(sum, a);
		}
		
		return sum;*/
	}
	
}