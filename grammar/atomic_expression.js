const atomic_expression_rules = {
  atomic_expression: $ => choice(
    $.identifier,
    $.literal_constant,
    $.collection_literal,
    $.tuple_literal,
    // seq($.identifier, optional($.type_arguments), // TODO: check
    $.if_expression,
    $.match_expression,
    $.loop_expression,
    $.try_expression,
    $.jump_expression,
    // $.numeric_type_conversion_expression, // TODO: removed due to similarity to constructor call
    $.this_super_expression,
    $.spawn_expression,
    $.synchronized_expression,
    $.parenthesized_expression,
    $.lambda_expression,
    $.quote_expression,
    // $.macro_expression,
    $.unsafe_expression,
  ),

  deconstruct: $ => seq('let', $.deconstruct_pattern, '<-'),

  if_expression: $ => seq(
    'if',
    '(',
    optional($.deconstruct), $.expression,
    ')',
    $.block,
    optional(seq('else', choice($.if_expression, $.block))),
    ')'
  ),

  // TODO: recheck(+match_case)
  match_expression: $ => seq(
    'match',
    choice(
      seq('(', $.expression, ')', '{', repeat1($.match_case), '}'),
      seq('{', 
        'case', choice($.expression, '_'),
        '=>', 
        $.expression_or_declaration, repeat1(seq('\n', optional($.expression_or_declaration))),
        '}'),
    )
  ),

  match_case: $ => seq(
    'case',
    $.pattern,
    optional($.pattern_guard),
    '=>',
    $.expression_or_declaration, repeat(seq('\n', optional($.expression_or_declaration))),
  ),

  loop_expression: $ => choice(
    $.for_in_expression,
    $.while_expression,
    $.do_while_expression,
  ),

  for_in_expression: $ => seq(
    'for',
    '(',
    $.patterns_maybe_irrefutable, 'in', $.expression, optional($.pattern_guard),
    ')',
    $.block
  ),
  
  while_expression: $ => seq(
    'while',
    '(',
    optional($.deconstruct), $.expression,
    ')',
    $.block
  ),

  do_while_expression: $ => seq(
    'do',
    $.block,
    'while',
    '(',
    optional($.deconstruct), $.expression,
    ')',
  ),

  try_expression: $ => seq(
    'try',
    optional(seq('(', $.resource_specifications, ')')),
    $.block,
    repeat(seq('catch', '(', $.catch_pattern, ')', $.block)),
    optional(seq('finally', $.block))
  ),

  resource_specifications: $ => seq($.resource_specification, repeat(seq(',', $.resource_specification))),

  resource_specification: $ => seq(
    $.identifier,
    optional(seq(':', $.type)),
    '=',
    $.expression,
  ),

  jump_expression: $ => prec(100, choice(
    seq('throw', $.expression),
    prec.right(seq('return', optional($.expression))),
    'continue',
    'break',
  )),

  this_super_expression: $ => choice('this', 'super'),

  lambda_expression: $ => seq(
    '{',
    optional($.lambda_parameters),
    '=>',
    optional($.expression_or_declaration),
    '}'
  ),

  trailing_lambda_expression: $ => seq(
    '{',
    optional(seq($.lambda_parameters, '=>')),
    optional($.expression_or_declaration),
    '}'
  ),

  lambda_parameters: $ => seq($.lambda_parameter, repeat(seq(',', $.lambda_parameter))),

  lambda_parameter: $ => seq(
    choice('_', $.identifier),
    optional(seq(':', $.type))
  ),

  spawn_expression: $ => seq(
    'spawn',
    optional(seq('(', $.expression, ')')),
    $.trailing_lambda_expression
  ),

  synchronized_expression: $ => seq(
    'syncronyzed',
    '(', $.expression, ')',
    $.block
  ),

  parenthesized_expression: $ => seq('(', $.expression, ')'),

  quote_expression: $ => seq(
    'quote',
    '(', $.quote_parameters, ')'
  ),

  quote_parameters: $ => repeat1(choice(
    // $.quote_token, // TODO: uncomment
    $.quote_interpolation,
    // $.macro_expression, // TODO: uncomment
  )),

  quote_interpolation: $ => seq(
    '$',
    '{',
    $.expression,
    '}'
  ),

  unsafe_expression: $ => seq('unsafe', $.block),
}

module.exports = atomic_expression_rules;
