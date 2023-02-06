const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("Mandatory fields are required", async () => {
  const { $ } = await loader;
  // const form = document.querySelector("form");
  // form.addEventListener("submit", (event) => event.preventDefault());

  required($, "name");
  required($, "email");
  required($, "message");
});

function required($, id) {
  const input = $("#" + id);
  const label = $(`[for="${id}"]`);

  assert.match(
    label.textContent,
    /(\*|required)/,
    `label for #${id} field should contain '*' or 'required', but got:
  
    ${label.outerHTML}
`
  );

  const valid = input.checkValidity();
  assert.equal(
    valid,
    false,
    `#${input.id} field should not be valid when empty`
  );
}
