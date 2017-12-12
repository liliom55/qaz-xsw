(function () {
    console.log("metaformacompatibility: " + metaformaSupport.checkBrowserCompatibility())
})();

//logistik variable needs to be available to metaforma
//avatar contains the following methods:
//setProfile(profile)
//setMeasurements(measurements)
//applyClothing(product)
//removeClothing(product)

//PUBLIC:
var logistik = {
    //logistik.onAvatarReady will be called by metaforma
    onAvatarReady: function (avatar) {
        logistikBlackBox.avatar = avatar;
    }
}
//this variable is a mock of your javascript code and should private.
//In other words metaforma does not need to know about the following code

//PRIVATE:
var logistikBlackBox = {
    profile: {
        sex: 'male'
    },
    measurements: [
        {
            name: 'height',
            value: 68.38,
        },
        {
            name: 'weight',
            value: 189.06,
        },
        {
            name: 'neck_size',
            value: 16.87,
        },
        {
            name: 'chest_size',
            value: 42.96,
        },
        {
            name: 'waist_width',
            value: 37.70,
        },
        {
            name: 'hip_size',
            value: 42.46,
        },
        {
            name: 'sleeve_length',
            value: 32.31,
        }
    ],
    products: [
        { "bodyPart": "bottom", "layer": 1, "sku": "8405-21-899-0001", "hasMultipleStates": false },
        { "bodyPart": "top", "layer": 0, "sku": "8405-20-001-4479", "hasMultipleStates": true },
        { "bodyPart": "top", "layer": 2, "sku": "8405-21-899-0237", "hasMultipleStates": false },
        { "bodyPart": "top", "layer": 1, "sku": "ada-men-top", "hasMultipleStates": false },
        { "bodyPart": "bottom", "layer": 0, "sku": "ada-men-bottom", "hasMultipleStates": false },
        { "bodyPart": "bottom", "layer": 1, "sku": "8405-21-899-0002", "hasMultipleStates": false },
        { "bodyPart": "top", "layer": 0, "sku": "8405-20-001-4480", "hasMultipleStates": false },
        { "bodyPart": "top", "layer": 2, "sku": "8405-21-899-0238", "hasMultipleStates": false },
        { "bodyPart": "top", "layer": 0, "sku": "8405-20-001-4479-1800", "hasMultipleStates": false },
    ],
    avatar: {},
    toggleClothing: function (checkbox, product) {
        if (checkbox.checked)
            logistikBlackBox.avatar.applyClothing(product);
        else
            logistikBlackBox.avatar.removeClothing(product);
    },
    setProfile: function(profile){
        logistikBlackBox.avatar.setProfile(profile);
    },
    setMeasurements: function (measurements) {
        var dataArr = document.getElementsByClassName('measurements');
        for (var i = 0; i < dataArr.length; i++) {
            var num = parseInt(dataArr[i].value);
            
            if(!isNaN(num)){
                measurements[i].value = dataArr[i].value;
            } 
        }

        for (var i = 0; i < dataArr.length; i++) {
            console.log(measurements[i].value);
        }

        var labelArr = document.getElementsByClassName('label_box');
        for (var i = 0; i < labelArr.length; i++) {
            if(labelArr[i].checked == true){
                labelArr[i].checked = false;
            }
        }

        
        logistikBlackBox.avatar.setMeasurements(measurements);
    },
    setSex: function(sex){
        logistikBlackBox.profile.sex = sex;
        this.setProfile(logistikBlackBox.profile);
    }
    
}










