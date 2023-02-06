const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("Field length is enforced", async () => {
  const { $ } = await loader;
  const field = $("#message");

  const pattern = field.getAttribute("pattern");
  assert.equal(
    pattern,
    null,
    `The \`pattern\` attribute is not supported on <textarea>`
  );

  const maxlength = field.getAttribute("maxlength");
  assert.equal(
    maxlength,
    "140",
    `#message field should have \`maxlength\` attribute of "140", but got:
  
    ${field.outerHTML}
    `
  );
  const describedBy = field.getAttribute("aria-describedby");
  assert.ok(
    describedBy,
    `#message field should have an \`aria-describedby\` attribute`
  );
  const ids = describedBy.split(" ");
  const has_help = ids.some((id) => {
    const el = $("#" + id);
    return el?.textContent.includes("140");
  });
  assert.ok(
    has_help,
    `#message field should have help text linked via \`aria-describedby\` telling the user the character limit is '140'`
  );
});
