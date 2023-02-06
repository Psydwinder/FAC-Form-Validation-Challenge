const fields = document.querySelectorAll("input, textarea");

fields.forEach((field) => {
  field.setAttribute("aria-invalid", "false");

  const feedback = document.createElement("p");
  const id = field.id + "Error";
  feedback.setAttribute("id", id);

  // don't overwrite any existing aria-describedby
  const prevIds = field.getAttribute("aria-describedBy");
  const describedBy = prevIds ? prevIds + " " + id : id;
  field.setAttribute("aria-describedBy", describedBy);

  field.after(feedback);

  field.addEventListener("invalid", () => {
    field.setAttribute("aria-invalid", "true");

    feedback.textContent = field.validationMessage;
  });

  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", "false");

    feedback.textContent = "";
  });
});

const form = document.querySelector("form");
form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  const allValid = event.target.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
});
