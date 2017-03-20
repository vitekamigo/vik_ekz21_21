$(document).ready(function() {
	toastr.success("All right!");
});

	$(document).ready(function() {
    $('#prise__table').DataTable( {
        "ajax": {
            "url": "/data.json",
            "dataSrc": ""
        },
        "columns": [
            { "data": "Brand" },
            { "data": "Product name" },
            { "data": "ID products" },
            { "data": "Prise" }
        ]
    } );
} );

//tostr

// submitHandler: function () {
//       toastr.success('We got your order');
//       $('#loginform').get(0).reset();
//       return false;
//     }


 //  validate

    $(document).ready(function(){

    $("#loginform").validate({

       rules:{

            name:{
                required: true,
                minlength: 4,
                maxlength: 16,
            },

            email:{
                required: true,
                
            },

            mobile:{
                required: true,
                number:   true,
                minlength: 12,
                digits:   true,

            },

            address:{
                required: true,
                minlength: 10,
                
            },

            city:{
                required: true,
                minlength: 3,
                
            },

            state:{
                required: true,
                minlength: 5,
            },

            country:{
                required: true,
                minlength: 3,
                
            },

            pincode:{
                required: true,
                number:   true,
                minlength: 5,
                digits:   true,
                
            },
       },

       messages:{

            name:{
                required: "This field is required",
                minlength: "Login must be at least 4 characters",
                maxlength: "The maximum number of characters is 16",
            },

            email:{
                required: "This field is required",
                
            },

            mobile:{
                required: "This field is required",
                digits: "Please enter only numbers",
            },

            address:{
                required: "This field is required",
                
            },

            city:{
                required: "This field is required",
                
            },

            state:{
                required: "This field is required",
                
            },

            country:{
                required: "This field is required",
                
            },

            pincode:{
                required: "This field is required",
                digits: "Please enter only numbers",
            }

       },

       submitHandler: function () {
      toastr.success('We got your order');
      $('#loginform').get(0).reset();
      return false;
    }



    });

});




