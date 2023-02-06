const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("email field type is enforced", async () => {
  const { $ } = await loader;
  const field = $("#email");
  field.value = "not an email";
  assert.equal(
    field.checkValidity(),
    false,
    `#email field should not be valid with value '${field.value}'`
  );
  field.value = "valid@example.com";
  assert.equal(
    field.checkValidity(),
    true,
    `#email field should be valid with value '${field.value}'`
  );
});

test("url field type is enforced", async () => {
  const { $ } = await loader;
  const field = $("#website");
  field.value = "not a URL";
  assert.equal(
    field.checkValidity(),
    false,
    `#website field should not be valid with value '${field.value}'`
  );
  field.value = "https://example.com";
  assert.equal(
    field.checkValidity(),
    true,
    `#website field should be valid with value '${field.value}'`
  );
});
