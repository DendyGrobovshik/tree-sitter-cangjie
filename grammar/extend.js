const extend_rules = {
  extend_declaration: $ => seq(
    'extend',
    optional($.type_parameters),
    $.type, optional(seq('<:', $.supertypes)),
    optional($.generic_constraints),
    $.extend_body
  ),

  extend_body: $ => seq('{', repeat($.extend_member), '}'),

  extend_member: $ => choice(
    $.function_declaration,
    // $.macro_expression, // TODO: uncomment
    $.property_declaration,
  )
}

module.exports = extend_rules;
