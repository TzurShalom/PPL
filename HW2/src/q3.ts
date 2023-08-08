import { Exp, Program, CExp, CondExp, makeCondExp, IfExp} from "./L31-ast";
import { isAppExp, isAtomicExp, isCExp, isDefineExp, isExp, isIfExp, isLitExp, isProcExp, isProgram, isCondExp }  from "./L31-ast";
import { makeAppExp, makeDefineExp, makeIfExp, makeProcExp, makeProgram } from "./L31-ast"
import { Result, makeFailure, makeOk } from "../shared/result";
import { first, rest } from "../shared/list";
import { map } from "ramda";

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    makeOk(rewriteAllCond(exp));

const rewriteCond = (e: CondExp): IfExp =>
{
    if (e.condclauses.length === 2) {return makeIfExp(e.condclauses[0].test, e.condclauses[0].then, e.condclauses[1].then);}
    else {return makeIfExp(e.condclauses[0].test, e.condclauses[0].then, makeCondExp(rest(e.condclauses)));}
}

export const rewriteAllCond = (exp: Program | Exp): Program | Exp =>
    isExp(exp) ? rewriteAllCondExp(exp) :
    isProgram(exp) ? makeProgram(map(rewriteAllCondExp, exp.exps)) :
    exp;

const rewriteAllCondExp = (exp: Exp): Exp =>
    isCExp(exp) ? rewriteAllCondsCExp(exp) :
    isDefineExp(exp) ? makeDefineExp(exp.var, rewriteAllCondsCExp(exp.val)) :
    exp;

const rewriteAllCondsCExp = (exp: CExp): CExp =>
    isAtomicExp(exp) ? exp :
    isLitExp(exp) ? exp :
    isIfExp(exp) ? makeIfExp(rewriteAllCondsCExp(exp.test), rewriteAllCondsCExp(exp.then), rewriteAllCondsCExp(exp.alt)) :
    isAppExp(exp) ? makeAppExp(rewriteAllCondsCExp(exp.rator), map(rewriteAllCondsCExp, exp.rands)) :
    isProcExp(exp) ? makeProcExp(exp.args, map(rewriteAllCondsCExp, exp.body)) :
    isCondExp(exp) ? rewriteAllCondsCExp(rewriteCond(exp)) :
    exp;
