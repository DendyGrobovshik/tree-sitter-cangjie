const property_rules = {
  property_declaration: $ => seq(
    repeat($.property_modifier),
    'prop',
    $.identifier,
    ':',
    $.type,
    optional($.property_body)
  ),

  property_body: $ => seq('{', repeat1($.property_body_member), '}'),

  property_body_member: $ => choice(
    seq('get', '(', ')', $.block),
    seq('set', '(', choice($.identifier, '-'), ')', $.block),
  )
}


module.exports = property_rules;
