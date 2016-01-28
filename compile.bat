@echo off

echo Compiling typescript to javascript ES5

@echo on

@REM tsc --target ES5 --removeComments --out Complex.js Complex.ts _Math.ts
tsc --target ES5 --removeComments Complex.ts _Math.ts