# Setter in Schema Field

_When we need to SET field values using a call back function, use the set
property_

**Update the field property as below**

```
const reviewSchema = mongoose.Schema({
	...

	ratings:{
		type : Number,
		set: val=>Math.round(val * 10)/10
	}
	...

	})

```
