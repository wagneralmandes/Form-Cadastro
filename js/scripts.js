class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = {
      email: {
        element: this.form.querySelector("#email"),
        validation: (value) => /\S+@\S+\.\S+/.test(value),
        errorMessage: "Por favor, insira um e-mail válido.",
      },
      name: {
        element: this.form.querySelector("#name"),
        validation: (value) => value.trim() !== "",
        errorMessage: "O nome é obrigatório.",
      },
      lastname: {
        element: this.form.querySelector("#lastname"),
        validation: (value) => value.trim() !== "",
        errorMessage: "O sobrenome é obrigatório.",
      },
      password: {
        element: this.form.querySelector("#password"),
        validation: (value) => value.length >= 6,
        errorMessage: "A senha deve ter no mínimo 6 caracteres.",
      },
      passconfirmation: {
        element: this.form.querySelector("#passconfirmation"),
        validation: (value) =>
          value === this.form.querySelector("#password").value,
        errorMessage: "As senhas não conferem.",
      },
      agreement: {
        element: this.form.querySelector("#agreement"),
        validation: (value) => value,
        errorMessage: "Você deve concordar com os termos de uso.",
      },
    };
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value =
      field.element.type === "checkbox"
        ? field.element.checked
        : field.element.value;

    if (!field.validation(value)) {
      this.showError(fieldName, field.errorMessage);
      return false;
    }
    this.clearError(fieldName);
    return true;
  }

  validateForm() {
    let isFormValid = true;

    Object.keys(this.fields).forEach((fieldName) => {
      const isFieldValid = this.validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showError(fieldName, message) {
    const field = this.fields[fieldName];
    const errorElement = document.createElement("p");
    errorElement.className = "error-message";
    errorElement.textContent = message;

    // Remove any previous error messages
    this.clearError(fieldName);

    // Add new error message
    field.element.parentElement.appendChild(errorElement);
  }

  clearError(fieldName) {
    const field = this.fields[fieldName];
    const errorElement =
      field.element.parentElement.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#register-form");
  const formValidator = new FormValidator(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formValidator.validateForm()) {
      alert("Formulário enviado com sucesso!");
      form.reset();
    } else {
      alert("Por favor, corrija os erros antes de enviar.");
    }
  });

  // Optional: Add live validation on input blur
  Object.keys(formValidator.fields).forEach((fieldName) => {
    const field = formValidator.fields[fieldName].element;
    field.addEventListener("blur", () =>
      formValidator.validateField(fieldName)
    );
  });
});
