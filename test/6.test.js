const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("Fields show feedback in the DOM when they fail validation", async () => {
  const { $, window } = await loader;
  const field = $("#message");

  const describedBy = field.getAttribute("aria-describedby");
  assert.ok(describedBy, "#message field should have `aria-describedby` set");

  const ids = describedBy?.split(" ");
  assert.equal(
    ids.length,
    2,
    "#message field should have two IDs in `aria-describedby`"
  );
  const feedback = $("#" + ids[1]);
  assert.ok(
    feedback instanceof window.HTMLElement,
    "#message field's `aria-describedby` should contain ID of an element in the DOM"
  );

  const err = "test error";
  field.setCustomValidity(err);
  field.checkValidity();
  assert.equal(
    feedback.textContent,
    err,
    `#message feedback element should contain "${err}", but got:
    
    ${feedback.outerHTML}
`
  );

  const event = new window.Event("input");
  field.dispatchEvent(event);
  assert.equal(
    feedback.textContent,
    "",
    `#message feedback element should be empty after field is edited, but got:
    
    ${feedback.outerHTML}
`
  );
});
