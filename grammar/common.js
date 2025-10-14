const common_rules = {
  fq_identifier: $ => prec.right(seq(
    $.identifier, repeat(seq('.', $.identifier)))
  ),

  identifier: $ => choice(
    field("lowercase", token(/[a-z][A-Za-z0-9_]*/)),
    $.capital,
  ),

  capital: _ => token(/[A-Z][A-Za-z0-9_]*/),

  line_comment: _ => seq(
    '//',
    /[^\r\n]*/
  ),

  multiline_comment: $ => seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),

  expressions_or_declarations: $ => repeat1($._expression_or_declaration),

  _expression_or_declaration: $ => choice(
    $.function_declaration,
    $.variable_declaration,
    $.expression,
  ),

  block: $ => seq('{', optional($.expressions_or_declarations), '}'),

  foreign_declaration: $ => seq(
    'foreign',
    choice(
      $.foreign_body,
      $.foreign_member,
    ),
  ),

  foreign_body: $ => seq(
    '{',
    repeat1($.foreign_member),
    '}'
  ),

  foreign_member: $ => choice(
    $.class_declaration,
    $.interface_declaration,
    $.function_declaration,
    // $.macro_expression,
    $.variable_declaration,
  ),
}

module.exports = common_rules;
