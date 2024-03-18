import { defineMiddleware } from "astro:middleware"
import moment from "moment"
import { PUBLIC_URL, makeToken} from "./constant"
import db from "./utils/db"
import { account, session } from "./models/schema"
import { eq, lt, gte, ne } from 'drizzle-orm';

export const onRequest = defineMiddleware(async (context, next) => {
    console.log(context.url.pathname)
    if(context.url.pathname == "/writed-content"){
        console.log(await context.request.formData())
        return new Response(null, {
            status: 200
        })
    }

    if(PUBLIC_URL.includes(context.url.pathname)){
        if(context.url.pathname == "/login" && context.request.method == "GET"){
            const findSession = await db.select().from(session).where(eq(session.sessionId, context.cookies.get("token")?.value))
            if(findSession.length != 0){
                return context.redirect("/beranda", 302)
                //return next()
            }else{
                return next()
            }
        }
        if(context.url.pathname == "/login" && context.request.method == "POST"){
            const data = await context.request.formData()
            const findUser = await db.select().from(account).where(eq(account.username, data.get("username")))
            //verify user
            if(findUser.length == 0){
                //user not found
                return next()
            }else{
                if(findUser[0].password == data.get("password")){
                    //console.log("user login");
                }else{
                    return next()
                }
            }
            const userSession = await db.select().from(session).where(eq(session.usernameId, findUser[0].id))

            //create init token
            if(userSession.length == 0){
                const token = makeToken(12)
                const expired = moment(new Date().now).add(5, 'm').toDate();
                context.cookies.set("user", findUser[0].username)
                context.cookies.set("token", token)
                await db.insert(session).values({
                    id: 1,
                    usernameId: findUser[0].id,
                    sessionId: token,
                    expiredDate: String(expired)
                })
                return context.redirect("/beranda", 302)
            }
            //if already have token
            else if(userSession.length != 0 && context.cookies.get("token")?.value == userSession[0].sessionId){
                return context.redirect("/beranda", 302)
            }
            //if not have token
            else if(userSession.length != 0 && context.cookies.get("token")?.value != userSession[0].sessionId){
                await db.delete(session).where(eq(session.usernameId, findUser[0].id))
                return context.redirect("/login", 302)
            }
            //if login failed
            else{
                return new Response(null, {
                    status: 401,
                });
            }
        }else{
            //console.log("kenapaa")
            return next()
        }
    }else{
        const tokens = context.cookies.get("token")?.value ?? null
        if(tokens == null){
            return context.redirect("/login", 302)
        }
        //console.log("enter auth areaa ...")
        if(context.url.pathname == "/testing"){
            const expired = await db.select().from(session).where(eq(session.sessionId, context.cookies.get("token")?.value))
            if(Date.parse(expired[0].expiredDate) < Date.now()){
                console.log("date expired")
            }
            return next()
        }
        if(context.url.pathname == "/logout"){
            await db.delete(session).where(eq(session.sessionId, context.cookies.get("token")?.value))
            context.cookies.delete("token")
            context.cookies.delete("user")
            console.log(context.cookies)
            return new Response(null, {
                status: 200,
            });
        }
        //check user
        const userCookie = await context.cookies.get("user")
        const tokenCookie = await context.cookies.get("token")
        const findUser = await db.select().from(account).where(eq(account.username, userCookie?.value))
        console.log(userCookie)
        console.log(tokenCookie)
        if(findUser.length == 0){
            return context.redirect("/login", 302)
        }else{
            const findSession = await db.select().from(session).where(eq(session.usernameId, findUser[0].id))
            if(findSession.length == 0){
                return context.redirect("/login", 302)
            }
            if(context.cookies.get("token").value == findSession[0].sessionId){
                //check token expired
                if(Date.parse(findSession[0].expiredDate) < Date.now()){
                    await db.delete(session).where(eq(session.sessionId, context.cookies.get("token")?.value))
                    context.cookies.delete("token")
                    context.cookies.delete("user")
                    return context.redirect("/login", 302)
                }
                const expired = moment(new Date().now).add(5, 'm').toDate();
                await db.update(session).set({expiredDate: String(expired)}).where(eq(session.usernameId, findUser[0].id))
                return next()
            }else{
                return context.redirect("/login", 302)
            }
        }
    }
})