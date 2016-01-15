var SuperMath = {
	
	factorials: [1,1],
	
	factorial: function(n: number): number {
		n = Math.abs(Math.round(n));
		
		if(SuperMath.factorials[n]) { return SuperMath.factorials[n]; }
		
		return SuperMath.factorials[n] = SuperMath.factorial(n - 1) * n;
	}
};

class Complex {
	
	private static EXP_SUM_LIMIT: number = 42;
	private _real: number = 0;
	private _img: number = 0;
	
	public static E1: Complex = new Complex(false, 1, 0);
	public static E2: Complex = new Complex(false, 0, 1);
	
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
		
		return new Complex(false, this._real / denominator, this._img / denominator);
	}
	
	public clone(): Complex {
		return new Complex(false, this._real, this._img);
	}
	
	public scale(factor: number): Complex {
		return new Complex(false, factor * this._real, factor * this._img);
	}
	
	public pow(x: number): Complex {
		if(this._real == 0 && this._img == 0) { return new Complex(false, 0, 0); }
		if(x == Math.round(x)) { return this.pow_n(x); }
		
		let cexp = Complex.exp(new Complex(false, 0, this.angle));
		
		return cexp.scale( Math.pow(Math.E, x * Math.log(this.abs())) );
	}
	
	public pow_n(n: number): Complex {
		//n = Math.abs(Math.round(n));
		
		if(n == 0) { return new Complex(false, 1, 0); }
		if(this._real == 0 && this._img == 0) { return new Complex(false, 0, 0); }
		if(this._img == 0) { return new Complex(false, Math.pow(this._real , n), 0); }
		
		let product: Complex = this.clone();
		
		for(let i=1; i<n; i++) { product = Complex.multiply(product, this); }
		
		return product;
	}
	
	public toString(polarform: boolean = false): string {
		if(polarform) {
			return this.length + " * e^(i * " + this.angle + ")";
		} else {
			return this._real + (this._img < 0 ? " " : " + ") + this._img + "i";
		}
	}

	constructor(polarform: boolean = false, data1: number = 0, data2: number = 0) {
		if(polarform) {
			this._real = data1 * Math.cos(data2);
			this._img = data1 * Math.sin(data2);
		} else {
			this._real = data1;
			this._img = data2;
		}
	}
	
	public static add(a: Complex, b: Complex): Complex {
		return new Complex(false, a.real + b.real, a.img + b.img);
	}
	
	public static multiply(a: Complex, b: Complex): Complex {
		return new Complex(
				false, 
				(a.real * b.real) - (a.img * b.img), 
				(a.real * b.img) + (a.img * b.real)
			);
	}
	
	public static divide(a: Complex, b: Complex) {
		let z: Complex = b.inverse();
		
		return z==null ? null : Complex.multiply(a,z);
	}
	
	public static exp(z: Complex): Complex {
		if(z.img == 0) { return new Complex(false, Math.pow(Math.E , z.real), 0); }
		
		var sum: Complex = z.clone();
		
		for(let n=1; n<Complex.EXP_SUM_LIMIT; n++) {
			let a: Complex = z.pow_n(n).scale( 1/SuperMath.factorial(n) );
			
			if(a.real == 0 && a.img == 0) { break; }
						
			sum = Complex.add(sum, a);
		}
		
		return sum;
	}
	
}