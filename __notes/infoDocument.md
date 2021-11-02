# GUIDELINES AND DEVELOPMENT.
## 1. Scability, Architecture and folder/files naming.
It has been followed Angular guidelines for development of architecture. However, we have repited the structure at pages level. So the application is easy to escalate as well as to remove redundant sections.<br/>
The pattern repited:<br/>

app-routing.module.ts
app-module.ts
app.component.scss
app.component.html
app.component.ts
--/ shared<br/>
--/ services<br/>
--/ pages<br/>
    pages-routing.modules.ts<br/>
    pages.module.ts<br/>
    --/ child<br/>
        child.component.ts<br/>
        child.component.html<br/>
        child.component.scss<br/>
    --/ child2<br/>
        child.component2.ts<br/>
        child.component2.html<br/>
        child.component2.scss<br/>

## 2. Gestion de datos by session.
Using window.session for the gestion of session.
Session storage is a popular choice when it comes to storing data on a browser. It enables developers to save and retrieve different values. Session storage only keeps data for a particular session. The data is cleared (in our case the JWT token) when the user closes the browser window / tab in the brower.

## 3. Memory cache and http response.
For this app we are using subscribe. 
If a subscription is not closed the function callback attached to it will be continuously called.

## 4. Validation and error gestion.
We have two reactive-forms forms on the app login & registration. 
Both have a custom model and validation. There is in the utils folder with more info about validation ( regex and error strings )

## 5. MaterialUI * SCSS Personalization and Responsive.
The app has a custom layout and it is responsive.
There is a scss file with mixers for the breakpoints in the application.
The share folder includes controlers for the Login / Register form. They are custom.
MaterialUI table for ( Users list ).
Reusable Notification Service using MaterialUI/SnackBar.

## 6. MaterialUI * Table
Table with action delete.
Improvement make the Table reusable and Sort the table by Id ( for Example )

## 7. MaterialUI * Pagination.
It has not be possible to have a proper pagination when we do a request. We do not have BE url for pagination. Example of it could be as bellow.
If we could have had a pagination on the BE - We would be able to make a request to BE everytime we make a page request.

The implementation on the service could have been something like this:

```
    getUsersTablePagBatch(currentPage: number, pageSize: number): Observable<any> {
        return this.http.get<fromUser.User[]>(
        environment.apiUrl + `/api/v1/users?currentPageNumber=${currentPage}&pagesize=${pageSize}`,
        this.httpOptions
        ).pipe(
        retry(1),
        catchError(this.handleError)
        )
    }
```

## 10. Authorization.
I had created a simple Authorization. After login on the application checks if we have jwt token in our Sessions and show/hide page header or redirect the page accordingly.
An improvement of it will be the use of Guard but because we do not have user roles, I thought it was over killed and no need it.
Improvement: Guards.

## 11. Improvement.
If the application was bigger add state management with Ngrx will be appropiate.
