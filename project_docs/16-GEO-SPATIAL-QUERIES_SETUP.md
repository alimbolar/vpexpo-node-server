# Geo Spatial Queries

_Geospatial queries are similar to regular queries but just have their own syntax that one has to use to query_

https://docs.mongodb.com/manual/tutorial/geospatial-tutorial/



**It's important to index the field which is to be queried (where the co-ordinates are stored)**

```

tourSchema.index({startLocation:{$geoWithin:'2dsphere'}});

```

**The code to query the Model needs to use the $geoWithin object to filter startLocation**

```

exports.getToursWithin = async function(req,res,next){

	const {distance,latlng,unit} = req.params;

	const [lat,lng]=latlng.split(',');

	const radius = unit === 'mi' ? distance/3963.2 : distance/6378.1;
	
	if(!lat || !lng) {next(new AppError('Please provide latitude and longitude in lat,lng format',400));}

	const tours = Tour.find({startLocation : {$geoWithin : [[lng,lat],radius]}})

	res.status(200).json({
		status:"success",
		result : tours.length,
		data : tours
		})

}

```

# Geospatial Aggregation

_One can use the aggregate method on Models to get the data related to distance etc_
_The format is the same as regular aggregate but one needs to ensure $geoNear is the first filter applied_


```
const getAllDistances = async function(req,res,next){

	const {latlng,unit} = req.params;
	const [lat,lng] = latlng.split(',');

	const multiplier = unit==='mi'? 0.000621371 : 0.001;

	if(!lat || !lng) {next(new AppError('Please provide latitude and longitude in lat,lng format',400));}

	const distance = Tour.aggregate([

		$geoNear : {

			near : {
				type : Point,
				coordinates : [lng*1,lat*1],
			},
			distanceField : 'distance',
			distanceMultiplier : multiplier


		}


		])




}

```

