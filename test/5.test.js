const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("Fields toggle `aria-invalid` attribute when valid/invalid/edited", async () => {
  const { $, window } = await loader;
  const field = $("#name");

  assert.equal(
    field.getAttribute("aria-invalid"),
    "false",
    `#name field should have \`aria-invalid="false"\` before validation`
  );

  field.setCustomValidity("test error");
  field.checkValidity();
  assert.equal(
    field.getAttribute("aria-invalid"),
    "true",
    `#name field should have \`aria-invalid="true"\` after failing validation`
  );

  const event = new window.Event("input");
  field.dispatchEvent(event);
  assert.equal(
    field.getAttribute("aria-invalid"),
    "false",
    `#name field should have \`aria-invalid="false"\` after being edited`
  );
});
