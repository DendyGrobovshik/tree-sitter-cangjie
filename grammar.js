/**
 * @file Cangjie grammar for tree-sitter
 * @author DendyGrobovshik <idenis.gradoboev@yandex.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const common_rules = require("./grammar/common.js")
const preamble_rules = require("./grammar/preamble.js")
const literal_rules = require("./grammar/literals.js")
const modifiers_rules = require("./grammar/modifiers.js")
const declaration_rules = require("./grammar/declaration.js")
const function_declaration_rules = require("./grammar/function_declaration.js")
const variable_declaration_rules = require("./grammar/variable_declaration.js")
const type_rules = require("./grammar/type.js")
const expression_rules = require("./grammar/expression.js")
const atomic_expression_rules = require("./grammar/atomic_expression.js")
const pattern_rules = require("./grammar/pattern.js")
const extend_rules = require("./grammar/extend.js")
const property_rules = require("./grammar/property.js")
const nominative_rules = require("./grammar/nominative.js")
const annotation_rules = require("./grammar/annotation.js")

// TODO: support annotation for required declarations
module.exports = grammar({
  name: "cangjie",

  extras: $ => [
    /\s/,
    $.line_comment,
    $.multiline_comment,
  ],

  inline: $ => [
    $._declaration_access_modifier,
  ],

  conflicts: $ => [
    [$.variable_modifier, $.class_modifier, $.interface_modifier, $.enum_modifier, $.function_modifier],
    [$.class_modifier, $.interface_modifier, $.function_modifier],
    [$.variable_modifier, $.function_modifier, $.property_modifier],
    [$.function_modifier, $.property_modifier],
    [$.function_modifier, $.variable_modifier],
    [$.function_modifier, $.class_modifier],
    [$.unit_literal, $.parameter_type],
  ],

  rules: {
    source_file: $ => seq(
      preamble_rules.preamble($),
      optional(repeat($.top_level_declaration)),
    ),

    ...common_rules,
    ...preamble_rules,
    ...literal_rules,
    ...modifiers_rules,
    ...declaration_rules,
    ...function_declaration_rules,
    ...variable_declaration_rules,
    ...type_rules,
    ...expression_rules,
    ...atomic_expression_rules,
    ...pattern_rules,
    ...extend_rules,
    ...property_rules,
    ...nominative_rules,
    ...annotation_rules,
  },
});
