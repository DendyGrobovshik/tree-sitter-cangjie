const variable_declaration_rules = {
  variable_declaration: $ => seq(
    repeat($.variable_modifier),
    choice('let', 'var'),
    $.patterns_maybe_irrefutable,
    choice(
      seq(
        optional(seq(':', $.type)),
        '=',
        $.expression,
      ),
      seq(':', $.type),
    )
  ),
}

module.exports = variable_declaration_rules;
