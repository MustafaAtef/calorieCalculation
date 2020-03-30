
class CalorieCalculator {
    constructor(gender, age, weight, height, fat = null, activity) {
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.fat = fat;
        this.activityObj = {
            '1': 1.2,
            '2': 1.375,
            '3': 1.55,
            '4': 1.725,
            '5': 1.9,
        }
        this.activity = this.activityObj[activity];
    }

    calcCalorie(type) {
        if (type == 'milfen') {
            this.milfinCalorie();
        } else if (type == 'haris') {
            this.harbsCalorie();
        } else if (type == 'katch') {
            this.katchCalorie();
        }
    }

    milfinCalorie() {
        if (this.gender == 'male') {
            this.bmr = (10*this.weight) + (6.25 * this.height) - (5*this.age) +5;
        } else {
            this.bmr = (10*this.weight) + (6.25 * this.height) - (5*this.age) - 161;
        }
    }

    harbsCalorie() {
        if (this.gender == 'male') {
            this.bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
        } else {
            this.bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
        }
    }

    katchCalorie() {
        this.bmr = 370 + (21.6 * (this.weight * (100 - this.fat) / 100));
    }

    calcTdee() {
        this.tdee = this.bmr * this.activity;
    }

}

//let obj = new CalorieCalculator('male', 16, 64, 167, null, '3');


let DOM = {
    'genderRadio': '.radio-container input',
    'age': 'age',
    'weight': 'weight',
    'height': 'height',
    'fxRadio': '.fx-container',
    'activity': 'activity',
    'showResult': '.show-result',
    'bmrVal': '.bmr-result .bmr-value',
    'tdeeVal': '.tdee-result .tdee-value',
    'calorieResult': '.calorie-result',
    'form': 'form',
    'fat': '#fat',
    'fxType': '.fx-type'

}


let validate = (form) => {
    if (form.get('fx') == 'katch') {
        if (
            form.get('gender') &&
            form.get('age') &&
            form.get('weight') &&
            form.get('height') &&
            form.get('fat') &&
            form.get('activity')
        ) {
            return true;
        } else {
            return false;
        }
    } else if(form.get('fx')) {
        if (
            form.get('gender') &&
            form.get('age') &&
            form.get('weight') &&
            form.get('height') &&
            form.get('activity')
        ) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false;
    }
}

let showResult = (bmr, tdee) => {
    document.querySelector(DOM.bmrVal).textContent = parseFloat(bmr.toFixed(2));
    document.querySelector(DOM.tdeeVal).textContent = parseFloat(tdee.toFixed(2));
    document.querySelector(DOM.calorieResult).classList.remove('hidden');
}

let calculation = (e) => {
    e.preventDefault();
    let form = new FormData(document.querySelector(DOM.form));
    if (validate(form)) {
        let calorieObj = new CalorieCalculator(
            form.get('gender'),
            form.get('age'),
            form.get('weight'),
            form.get('height'),
            form.get('fat'),
            form.get('activity')
        );

        calorieObj.calcCalorie(form.get('fx'));
        calorieObj.calcTdee();

        console.log(calorieObj.bmr, calorieObj.tdee);

        showResult(calorieObj.bmr, calorieObj.tdee);

    }
};


let radioInputs = Array.from(document.querySelectorAll(DOM.fxType));

radioInputs.forEach(e => {
    e.addEventListener('change', function(e) {
        if(e.target.classList.contains('has-fat')) {
            document.querySelector(DOM.fat).removeAttribute('disabled');
        } else {
            document.querySelector(DOM.fat).setAttribute('disabled', 'disabled');
        }
    });
});




document.querySelector(DOM.form).addEventListener('submit', calculation);







