Simple tool for nonlinear least squares with arithmetic expressions and symbolic differentiation.



| Curve fitting | Fourier series | Linear piecewise approximation | Genetic curve fitting |
|---|---|---|---|
|![Curve fitting](/images/curve-fitting.jpg)|![Fourier series](/images/fourier-series.jpg)|![Linear piecewise approximation](/images/linear-piecewise.jpg)|![Genetic curve fitting](/images/genetic-curve-fitting.jpg)

[Theory](https://musseffect.github.io/en/notes/least-squares)


Symbol "x" is reserved for independent variable, every other identifier will be treated as an unknown parameter.

You can assign initial value for parameter with curly brackets, i. e. "p1{3.25}".

List of supported mathematical functions:
* sin(x)
* cos(x)
* tan(x)
* cot(x)
* sinc(x)
* sinh(x)
* cosh(x)
* tanh(x)
* coth(x)
* asinh(x)
* acosh(x)
* atanh(x)
* acoth(x)
* atan(x)
* asin(x)
* acos(x)
* acot(x)
* erf(x)
* exp(x)
* pow(x,power)
* pi()
* e()
* smoothstep(x)
* step(x)
* sign(x)
* sqrt(x)
* ln(x)
* lg(x)
* log(base,x)
* min(a,b)*
* max(a,b)*
* abs(a,b)*

\* - uses numerical differentiation, because they are not continuous  


#### TODO

* Web workers
* Parameters for genetic curve fitting
* Add optimization methods