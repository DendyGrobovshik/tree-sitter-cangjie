const declaration_rules = {
  top_level_declaration: $ => choice(
    $.function_declaration,
    $.variable_declaration,
    $.class_declaration,
    $.interface_declaration,
    // $.struct_declaration,
    $.enum_declaration,
    $.type_alias_declaration,
    $.extend_declaration,
    // $.foreign_declaration,
    // $.macro_declaration,
    // $.macro_expression,
  ),

  type_alias_declaration: $ => seq(
    optional($.type_modifier),
    'type',
    $.identifier,
    optional($.type_parameters),
    '=',
    $.type
  )
}

module.exports = declaration_rules;
