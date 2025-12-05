const { annotations } = require("./annotation");

const declaration_rules = {
  top_level_declaration: $ => seq(
    optional($.annotations),
    choice(
      $.function_declaration,
      $.variable_declaration,
      $.class_declaration,
      $.interface_declaration,
      $.struct_declaration,
      $.enum_declaration,
      $.type_alias_declaration,
      $.extend_declaration,
      $.foreign_declaration,
      $.main_declaration,
      // $.macro_declaration,
      // $.macro_expression,
    )),

  type_alias_declaration: $ => seq(
    optional($.type_modifier),
    'type',
    $.identifier,
    optional($.type_parameters),
    '=',
    $.type
  ),

  main_declaration: $ => seq(
    'main',
    $.function_parameters,
    optional(seq(':', $.type)),
    $.block,
  ),
}

module.exports = declaration_rules;
