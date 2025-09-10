const function_declaration_rules = {
  function_declaration: $ => prec.right(seq(
    repeat($.function_modifier),
    'func',
    $.identifier,
    optional($.type_parameters),
    $.function_parameters,
    optional(seq(':', $.type)),
    optional($.generic_constraints),
    optional($.block)
  )),

  function_parameters: $ => seq(
    '(',
    optional(seq($.function_parameter, repeat(seq(',', $.function_parameter)))),
    ')'
  ),

  function_parameter: $ => seq(
    choice($.identifier, '_'),
    ':',
    optional('!'),
    $.type,
    optional(seq('=', $.expression))
  ),
}

module.exports = function_declaration_rules;
