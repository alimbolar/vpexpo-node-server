# Factory Functions

_Most CRUD methods follow a similar syntax with and it normally leads to a lot of duplication of code. Factory functions are a great way to standardise and basically create a form of template for each CRUD method. The concept owes its ability to Closures in Javascript which allows the inner function to have access to the values of the outer function even after the outer function has already returned_


**deleteOne**

```
exports.deleteOne = Model = catchAsync(async function(){

	const doc = findByIdAndDelete(req.params.id);

	res.status(200).json({
		status : "message",
		data : doc,
		})


	})


```

**createOne**

**updateOne**

**getOne**

**getAll**


**/me is good option to have as a route for the user's own detail**

_The option is to create a middleware that passes the id as a req.params.id to the getUser(getOne)_

```

exports.getMe = function(req,res,next){

	req.params.id=req.user.id;
	next();

}


```
