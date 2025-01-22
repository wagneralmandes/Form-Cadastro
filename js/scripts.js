class Validator {
  constructor() {
    this.validate = [];
  }
  //   Iniciar a validadação de todos os campos
  validate(form) {
    // pegar os inputs
    let inputs = form.getElementsByTagName("input");

    console.log(inputs);

    let inputsArray = [...inputs];

    console.log(inputsArray);
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener("click", function (e) {
  e.preventDefault();

  validator.validate(form);
});
