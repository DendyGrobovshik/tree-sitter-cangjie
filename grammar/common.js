const common_rules = {
  fq_identifier: $ => prec.right(seq(
    $.identifier, repeat(seq('.', $.identifier)))
  ),

  identifier: _ => /[A-Za-z][A-Za-z0-9_]*/,

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

}

module.exports = common_rules;
