module _Math {
    var factorials: number[] = [1,1];
	
    export function factorial(n: number): number {
		n = Math.abs(Math.round(n));
		
		if(factorials[n]) { return factorials[n]; }
		
		return factorials[n] = factorial(n - 1) * n;
	}
}