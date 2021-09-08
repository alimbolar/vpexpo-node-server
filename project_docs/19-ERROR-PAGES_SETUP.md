# Error Pages

In the viewController, on the functions where we need to display the error add
condition as below

```

if(!result){
  return next(new AppError("Message to be displaye",404));
}

```

The errors display on the client side are primarily divided into Development and
Production. And this is controlled in the errorController.js where sendErrorDev
and sendErrorDev.

Within this it's divided into errors for API urls and Frontend Urls, which is
handled by the condition if(req.originalUrl.startsWith('/api'));

In the Errors Displayed to Production there's a secondary division between
Operational Errors against Unforeseen/Programattic errors which is handled by
the condition if(process.env.NODE_ENV === 'production' || 'development')

```



```

A template for errors has to be created and rendered in the response and the
err.message has be displayed.
