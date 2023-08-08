import { Exp, Program, isProgram, isBoolExp, isNumExp, isVarRef, isPrimOp, isProcExp, isIfExp, isAppExp, isDefineExp, PrimOp, CExp, isStrExp } from '../imp/L3-ast';
import { Result, makeFailure, makeOk, bind, mapResult } from '../shared/result';
import { map } from 'ramda';

/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [Parsed | Error] => Result<string>
*/
export const l2ToPython = (exp: Exp | Program): Result<string>  => 
    isProgram(exp) ? bind(mapResult(l2ToPython, exp.exps), exps => makeOk(exps.join("\n"))) :
    isDefineExp(exp) ? bind(l2ToPython(exp.val), val => makeOk(`${exp.var.var} = ${val}`)) :
    isNumExp(exp) ? makeOk(exp.val.toString()) :
    isBoolExp(exp) ? makeOk(exp.val ? 'True' : 'False') :
    isStrExp(exp) ? makeOk(exp.val) :
    isPrimOp(exp) ? makeOk(convertPrimOpToPython(exp.op)) :
    isVarRef(exp) ? makeOk(exp.var) :
    isAppExp(exp) ?  
            (isPrimOp(exp.rator) ?
            exp.rator.op === "not" ? bind(l2ToPython(exp.rands[0]), (rand : string) => makeOk("(not " + rand + ")")) :
            exp.rator.op === "number?" ? bind(l2ToPython(exp.rands[0]), (rand : string) => makeOk(`${convertPrimOpToPython("number?")}(${exp.rands[0]})`)) :
            exp.rator.op === "boolean?" ? bind(l2ToPython(exp.rands[0]), (rand : string) => makeOk(`${convertPrimOpToPython("boolean?")}(${exp.rands[0]})`)) :
            convertPrimOpToPython_AppExp(exp.rator, exp.rands) :
            bind(l2ToPython(exp.rator), (rator: string) => bind(mapResult(l2ToPython, exp.rands), (rands: string[]) => makeOk(`${rator}(${rands.join(",")})`)))) :
    isIfExp(exp) ? bind(l2ToPython(exp.test), (test: string) => bind(l2ToPython(exp.then), (then: string) => bind(l2ToPython(exp.alt), (alt: string) => makeOk(`(${then} if ${test} else ${alt})`)))) :
    isProcExp(exp) ? bind(l2ToPython(exp.body[exp.body.length-1]), body => makeOk("(" + "lambda " +  map((p) => p.var, exp.args).join(",") + " : " + body + ")")) :
    makeFailure("Never");

const convertPrimOpToPython = (op : string) : string =>
    op === "=" || op === "eq?" ? "==" :
    op === "boolean?" ? "(lambda x : type(x) == bool)" :
    op === "number?" ? "(lambda x : type(x) == int or type (x) == float)" :
    op;

const convertPrimOpToPython_AppExp = (rator : PrimOp, rands : CExp[]) : Result<string> => 
    bind(mapResult(l2ToPython,rands), (rands) => makeOk("(" + rands.join(" " + convertPrimOpToPython(rator.op) + " ") + ")"));
