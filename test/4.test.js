const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("Subject allows only lowercase alphanumeric", async () => {
  const { $ } = await loader;
  const field = $("#subject");
  field.value = "I AM COMPLAINING";
  const valid = field.checkValidity();
  assert.equal(
    valid,
    false,
    `#subject should be invalid when '${field.value}' is entered`
  );
  field.value = "i am very calm";
  const valid2 = field.checkValidity();
  assert.equal(
    valid2,
    true,
    `#subject should be valid when '${field.value}' is entered`
  );
});
