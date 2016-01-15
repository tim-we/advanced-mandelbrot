class Complex {
	
	private _real: number = 0;
	private _img: number = 0;
	
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
	
	constructor(datatype: boolean, data1: number, data2: number) {
		
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
}