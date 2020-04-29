import RPNCompiler from "./compiler/rpnCompiler.js";
import { vector } from "./vector.js";
import { matrix } from "./matrix.js";


export class FunctionExpression
{
    constructor(expression,variableNames)
    {
        this.variableNames = variableNames;
        let variables = {};
        variableNames.forEach((element,index)=> {
            variables[element] = index;
        },this);
        let compiler = new RPNCompiler();
        this.function = compiler.compile(expression,variables);
    }
    f(args)
    {
        return this.function.exec(args);
    }
    print()
    {
        return this.function.print(this.variableNames);
    }
}
export class LeastSquaresExpression
{
    constructor(expression,variableNames,epsilon=0.01)
    {
        //compute derivatives and hessian
        //compile rpn
        this.parameters = [];
        this.variableNames = variableNames;
        let variables = {};
        variableNames.forEach((element,index)=> {
            variables[element] = index;
            if(element!="x")
                this.parameters.push(element);
        },this);
        let compiler = new RPNCompiler();
        this.function = compiler.compile(expression,variables);
        this.hessian = [];
        this.derivatives = this.parameters.map(element=>{
            let derivativeExpression = expression.differentiate(element,epsilon).simplify();
            this.parameters.forEach(parameter=>
                {
                    let der = derivativeExpression.differentiate(parameter,epsilon).simplify();
                    this.hessian.push(compiler.compile(der,variables));
                })
            return compiler.compile(derivativeExpression,variables);
        });
        this.size = this.parameters.length;
    }
    print()
    {
        let result = "function: \n";
        result+= this.function.print(this.variableNames);
        result+= "\nderivative: \n"
        this.derivatives.forEach((der,index)=>
        {
            result+= `df/d${this.parameters[index]}: ${der.print(this.variableNames)}\n`;
        });
        this.hessian.forEach((der,index)=>{
            let y = Math.floor(index/this.size);
            let x = index%this.size;
            result+= `df/d${this.parameters[y]}d${this.parameters[x]}: ${der.print(this.variableNames)}\n`;
        });
        return result;
    }
    f(x,p)//f(x,p)
    {
        let args = [].concat(x,p);
        return this.function.exec(args);
    }
    dfdp(x,p)//vector of df/dp_i(x,p)
    {
        let args = [].concat(x,p);
        let result = new vector(this.size);
        this.derivatives.forEach((der,index)=>{
            result.set(index,der.exec(args));
        });
        return result;
    }
    dfdpdp(x,p)//matrix of df/(dp_i dp_j)(x,p)
    {
        let args = [].concat(x,p);
        let result = new matrix(this.size,this.size);
        this.hessian.forEach((der,index)=>{
            result.set(index%this.size,Math.floor(index/this.size),der.exec(args));
        });
        return result;
    }
}