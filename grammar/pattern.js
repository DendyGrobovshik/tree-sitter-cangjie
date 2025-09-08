const pattern_rules = {
  pattern: $ => choice(
    $.constant_pattern,
    $.wildcard_pattern,
    $.var_binding_pattern,
    $.tuple_pattern,
    $.enum_pattern,
    $.type_pattern,
  ),

  patterns_maybe_irrefutable: $ => choice(
    $.wildcard_pattern,
    $.var_binding_pattern,
    $.tuple_pattern,
    $.enum_pattern,
  ),

  constant_pattern: $ => $.literal_constant,

  wildcard_pattern: _ => '_',

  // NOTE: precedence solve ambiguity:
  // let EnumConstructor = 
  var_binding_pattern: $ => prec(1, $.identifier),

  tuple_pattern: $ => seq(
    '(',
    $.pattern,
    repeat1(seq(',', $.pattern)),
    ')'
  ),

  enum_pattern: $ => seq(
    $.enum_pattern_constructor,
    repeat(seq('|', $.enum_pattern_constructor))
  ),

  enum_pattern_constructor: $ => seq(
    optional(seq($.composite_type, '.')),
    $.identifier,
    optional($.enum_pattern_parameters),
  ),

  enum_pattern_parameters: $ => seq(
    '(',
    $.pattern,
    repeat(seq(',', $.pattern)),
    ')'
  ),

  type_pattern: $ => seq(
    choice(
      $.wildcard_pattern,
      $.identifier,
    ),
    ':',
    $.type,
  )
}

module.exports = pattern_rules;
