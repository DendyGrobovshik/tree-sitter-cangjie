const variable_declaration_rules = {
  variable_declaration: $ => seq(
    repeat($.variable_modifier),
    choice('let', 'var', 'const'),
    $.patterns_maybe_irrefutable,
    choice(
      seq(
        optional(seq(':', $.type)),
        '=',
        $.expression,
      ),
      seq(':', $.type, '\n'),
    )
  ),
}

module.exports = variable_declaration_rules;
