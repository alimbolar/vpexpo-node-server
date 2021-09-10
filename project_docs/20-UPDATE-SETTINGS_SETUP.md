# Update Data and Password

### NO API METHOD

Updating data can be done with the traditional method (without API) by adding an
action and method attribute to the form.

```
<form action="/submit-user-data" method="POST">

```

This normally requires the urlencoded middleware to be added

```
app.use(express.urlencoded({extended:true}));

```

A route needs to be created for this method and subsequently a function to
update the data

```
router.get('/submit-user-data', viewController.updateData)

```

```

export updateData = catchAsync(async function(req,res,next){
  const updatedUser = await User.findByIdAndUpdate(req.user.id,{name:req.body.name, email:req.body.email},{new:true, runValidators:true})

  res.status(200).render('account',{
    title:"My Account",
    user : updatedUser
  })
})

```

### API METHOD

The form does not need any action or method attribute. Instead the form is
provided an EventListener method

```
form.addEventListener('submit', async function(e){
  e.preventDefault();

  document.querySelector('.update-password').textContent = "Updating...";

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  await updateSettings({passwordCurrent,password,passwordConfirm},'password');
  document.querySelector('.update-password').textContent = "Save Password");

  document.getElementById('password-current').value = " ";
  document.getElementById('password').value = " ";
  document.getElementById('password-confirm').value = " ";

})

```

The updateSetting function would be as below

```
export updateSettings = async function(data,type){

  try{

    const url = type==="password"?'http:/127.0.0.1:3000/api/v1/users/updateMyPassword':'http:/127.0.0.1:3000/api/v1/users/updateMe'

    const res = await axios({
      method : "PATCH",
      url,
      data
    })

    if(res.status===="success"){
      alert(`${type.toUpperCase()} Updated`);
    }

  } catch(err){
    alert(err.response.data.message);
  }

}

```
