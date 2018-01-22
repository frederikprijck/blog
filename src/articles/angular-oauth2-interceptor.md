---
title: "Angular OAuth2 Interceptor"
date: 2018-01-21
blurb: Angular OAuth2 Interceptor
author: Frederik Prijck
tags:
  - angular
  - authentication
  - jwt
---

When using OAuth2, you'll probably make use of `access tokens` and `refresh tokens`.
With this post, we will be building an Angular **interceptor** to add the access token to the `Authorization` header and automatically request a new access_token once it is expired.

> Note: This post assumes you're familiar with OAuth2, if not make sure to read more about it [here](https://oauth.net/2/). Most of the OAuth2 stuff has been mocked, so you do need to understand how all of that works.

# Creating the initial project
To create our initial Angular application we'll make use of `Angular CLI`, if you're not familiar with the CLI, have a look at the [documentation](https://cli.angular.io/).

```bash
ng new angular-oauth-interceptor
cd angular-oauth-interceptor
```

This gives us a boilerplate to start developing an Angular application, to test it in your favorite browser, run `yarn start` (or `npm start` if you're using npm).

## Creating an HTTP endpoint

Before moving on to the interceptor, let's create an HTTP call to which we want to add the `Authorization` header. For this post, I'll be using [mocky.io](https://www.mocky.io/), but feel free to use your own backend.

Creating a fake URL with mocky is as easy as adding a message to the body and click **Generate my HTTP Response**.

For this request, I've added a very simple JSON to the body (but it doesn't really matter)

```json
{
    "message": "hello world"
}
```

Pressing the **Generate** button gives you an URL you can use to request the body you've provided.

> Tip: You can use the endpoint mentioned above, you don't necessarily need to create your own post.

<!-- read-more -->

## Add the HTTP call to Angular
For the sake of simplicity, we'll be adding the HTTP call directly inside `app.component.ts`

```typescript
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get('http://www.mocky.io/v2/5a6257c6310000b134de7f9b')
      .subscribe(console.log);    
  }
}
```

Don't forget to import `HttpClientModule` in your `AppModule`.

> Note: In a real-world application, you don't want to use manual subscriptions such as the one I've used above, if you do **please** make sure to clean up the subscriptions in `ngOnDestroy` (either using the `takeUntil` operator or by calling `unsubscribe` on the subscription).


## Creating the interceptor

As the CLI, currently, [doesn't support generating an interceptor yet](https://github.com/angular/angular-cli/issues/6937) we'll need to create it manually.

Add a new file to the `app` directory and name it `token.interceptor.ts` (you're free to name it the way you want, but I'll assume you named it `token.interceptor.ts`).

```typescript
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        let newRequest = request;
        
        if (token) {
            newRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.token}`
                }
            });
        }

        return next.handle(newRequest);
    }
}
```

As you can see, the interceptor is making use of a service called `TokenService`, which we don't have yet. Let's create that as well. You can either use the CLI or create it manually, just ensure the service get's added to the `AppModule`'s providers so that Angular can resolve it when injected into the Interceptor. Add a file named `token.service.ts` inside the `app` directory:

```typescript
@Injectable()
export class TokenService {
    getToken() {
        return JSON.parse(localStorage.getItem('access_token'));
    }
}
```

> Note: I'm using the localStorage to store and retrieve the access token, you can use whatever you like. Just ensure the code is synchronous (we'll make it asynchronous in a few steps).

Before the Interceptor kicks in, it needs to be added to the providers array of your module (in this case `AppModule`).

```typescript
{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
```

If you start the application using `yarn start` (or `npm start`), you should see the header being added to the mocky (or your own) request, which is being made in the `AppComponent.ngOnInit` method. To verify, inspect the HTTP call using `Chrome Dev Tools`:

[TODO: ADD SCREENSHOT]

## Refreshing the token

With OAuth2, an access token should have a short lifetime, so it's recommended to use a `refresh token` to request a new `access token` when it's expired (or even better, when it's about to expire).

This is something the interceptor can handle for us, instead of adding the token to the header, it'll first check whether the token is expired. If it isn't we should add that token to the header, however, if the token is expired we need to request a new one and use that new access token as the header for the request we're intercepting.

### Async token retrieval
Before we're able to integrate the token refresh process, we'll need to make the token retrieval compatible with an asynchronous API.
This is as easy as wrapping the token with `Observable.of` and returning the `Observable` instead of the plain text value.

```typescript
@Injectable()
export class TokenService {
    getToken() {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        return Observable.of(accessToken);
    }
}
```

In order for our interceptor to work with this asynchronous API, we'll need to adapt it accordingly:

```typescript
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return this.tokenService.getToken()
            .mergeMap(token => {
                let newRequest = request;
        
                if (token) {
                    newRequest = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token.token}`
                        }
                    })
                }
                return next.handle(newRequest);
            });
  }
}
```

Not a lot has changed, we just return an observable instead of a string so we need to mergeMap it in order to return the correct Observable type (an HttpInterceptor needs to return `Observable<HttpEvent<any>>`).

Running the application shouldn't make any difference with the synchronous token retrieval, but by using the async API approach we've made our API a lot more flexible (which you'll most likely see in a few steps).

### Refreshing the token when expired

Currently, our interceptor isn't really something we can use in a real-world application because your access token is likely to expire after a certain amount of time.

> Note: If your access token has a long lifetime, you probably want to revise your security.

When using OAuth2, requesting a new `access token` is as easy as doing an HTTP call to a certain endpoint, providing a `refresh token` (and certain other things such as `grant_type` and `client_id`). However, how refresh tokens work is out of scope of this blog post so I assume you're familiar with how they work and I'll mock out most of that functionality using `mocky.io` for the sake of simplicity. The fake Http call for requesting a new access token is going to return the following JSON:

```json
{
  "token": "test",
  "expiresInSeconds": 10
}
```

I'm going to extend the `TokenService` to include a method to request a new access token.

```typescript
private refreshToken() {
    return (new Observable(observer => {
      const tokenEndpoint = 'http://www.mocky.io/v2/5a6347942e0000e90711d883';
      const http = new XMLHttpRequest();

      http.open('POST', tokenEndpoint, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
          const token = JSON.parse(http.responseText);
          token.exp = this.calculateExpiration(token);
          localStorage.setItem('access_token', JSON.stringify(token));
          observer.next(token);
          observer.complete();
        } else if (http.readyState === 4 && http.status !== 200) {
          observer.error(http.responseText);
        }
      };
      http.send();
    }));
}

private calculateExpiration(token: { expiresInSeconds: number }) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + token.expiresInSeconds)
    return date.getTime() / 1000;
}
```

As the `mocky.io` call doesn't really return an expiration date, I need to calculate the expiration date based on the `expiresInSeconds` property. When using a real JWT, this is not necessary.

> Note: As you see I'm using an XMLHttpRequest instead of Angular's HttpClient. This is because we can't make use of an HttpClient inside an Interceptor as that would lead to a cyclic dependency.

There are several points where we can integrate the refresh token method, I'll add it to the `TokenService.getToken` method in such a way that our interceptor doesn't have to be modified.

```typescript
getToken() {
    const accessToken = JSON.parse(localStorage.getItem('access_token'));
    return accessToken && this.isTokenValid(accessToken) ? 
        Observable.of(accessToken) :
        this.refreshToken();
}

private isTokenValid(token: { exp: number }, offset: number = 0) {
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(token.exp);
    
    return (expirationDate.valueOf() > (new Date().valueOf() + (offset * 1000)));
}
```

Running the application now should result in an HTTP call to refresh the token, prior to calling the endpoint we're intercepting.

[TODO: SCREENSHOT HERE]

When doing a second HTTP call after 7 seconds, the token isn't expired and there shouldn't be a call to the endpoint to request a new access token. If a call is done after 10 seconds, the token is expired and a new access token should be requested.

```typescript
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get('http://www.mocky.io/v2/5a6257c6310000b134de7f9b')
      .subscribe(console.log);

    setTimeout(() => {
      this.httpClient
        .get('http://www.mocky.io/v2/5a6257c6310000b134de7f9b')
        .subscribe(console.log);
    }, 7000);
    
    setTimeout(() => {
      this.httpClient
        .get('http://www.mocky.io/v2/5a6257c6310000b134de7f9b')
        .subscribe(console.log);
    }, 12000);
    
  }
}
```

[SCREENSHOT HERE].

Alright, everything looks fine. Doesn't it?

We're almost there but we have an edge-case we haven't covered yet.

Let's take the following `AppComponent`:

```typescript
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get('http://www.mocky.io/v2/5a6257c6310000b134de7f9b')
      .subscribe(console.log);
      
	this.httpClient
      .get('http://www.mocky.io/v2/5a6257c6310000b134de7f9b')
      .subscribe(console.log);
  }
}
```

At first sight, this might look fine. You might expect the first call to result in a request for a new access token and the second call to make use of that same access token.
However, this is not what's happening. Instead, both calls will result in a request for a new access token, which isn't necessary for the second call. This is a concurrency issue.

### Fixing the concurrency issue

Before trying to fix it, let's describe the behavior we want to achieve:

Whenever an Http call results in a request for a new access token, we want to queue all new calls until the previous request for a new access token is finished. Once the previous request for a new access token is finished, we want the queued calls to make use of the same returned token.

Even though this sounds extremely complicated, this can be fixed **very** easily thanks to `rxjs`:

```typescript
refreshTokenShared$ = this.refreshToken()
    .share();

getToken() {
    const accessToken = JSON.parse(localStorage.getItem('access_token'));
    return accessToken && this.isTokenValid(accessToken) ? 
        Observable.of(accessToken) :
        this.refreshTokenShared$;
}
```

[TODO: EXPLAIN MULTICAST FIX]
