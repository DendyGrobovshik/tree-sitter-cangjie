const function_declaration_rules = {
  function_declaration: $ => prec.right(seq(
    repeat($.function_modifier),
    choice(
      seq('func', $.identifier),
      seq('operator', 'func', $.overloaded_operators),
    ),
    optional($.type_parameters),
    $.function_parameters,
    optional(seq(':', $.type)),
    optional($.generic_constraints),
    optional($.block)
  )),

  function_parameters: $ => prec.right(seq(
    '(',
    optional(seq($.function_parameter, repeat(seq(',', $.function_parameter)))),
    ')'
  )),

  function_parameter: $ => seq(
    choice($.identifier, '_'),
    optional('!'),
    ':',
    $.type,
    optional(seq('=', $.expression))
  ),

  overloaded_operators: $ => choice(
    seq('(', ')'),
    '!',
    '+',
    '-',
    '**',
    '*',
    '/',
    '%',
    '<<',
    '>>',
    '<',
    '>',
    '<=',
    '>=',
    '==',
    '!=',
    '&',
    '|',
    '^',
    '[]',
  )
}

module.exports = function_declaration_rules;
